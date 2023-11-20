import SectionHeader from "./../../../Shared/SectionHeader/SectionHeader";
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
0;

import { useState } from "react";
import { useEffect } from "react";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_API;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const EditItem = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [item, setItem] = useState([]);

  useEffect(() => {
    axiosSecure.get(`menu/${id}`).then((res) => {
      setItem(res.data);
    });
  }, []);

  console.log(item);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.image[0]) {
      const imageFile = { image: data.image[0] };
      console.log(imageFile);
      const res = await axiosPublic.post(imageHostingApi, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data.data);
      if (res?.data?.success || item.image) {
        const editedItem = {
          name: data.name || item.name,
          recipe: data.recipe || item.recipe,
          category: data.category,
          price: parseFloat(data.price) || item.price,
          image: res?.data?.data?.display_url || item.image,
        };
        const response = await axiosSecure.patch(
          `/menu/edit/${id}`,
          editedItem
        );
        if (response.data.modifiedCount) {
          navigate("/dashboard/manage-items");
          return Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} has been Edited!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      const editedItem = {
        name: data.name || item.name,
        recipe: data.recipe || item.recipe,
        category: data.category,
        price: parseFloat(data.price) || item.price,
        image: item.image,
      };
      console.log(editedItem);
      const response = await axiosSecure.patch(`/menu/edit/${id}`, editedItem);
      console.log(response.data);
      if (response.data.modifiedCount) {
        navigate("/dashboard/manage-items");
        return Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} has been Edited!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionHeader
        mini={"---What's new?---"}
        heading={"update AN ITEM"}
      ></SectionHeader>
      <div className="p-10 bg-[#F3F3F3]">
        <form
          className="md:grid gap-5 grid-cols-2
          "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <label>Recipe name*</label> <br />
            <input
              defaultValue={item?.name}
              placeholder="Recipe name"
              className="input mt-2 input-bordered w-full"
              {...register("name")}
            />
          </div>
          <div>
            <label>Category*</label> <br />
            <select
              placeholder="Category"
              defaultValue={item?.category}
              className="select w-full mt-2 select-bordered"
              {...register("category")}
            >
              <option value="selected" disabled hidden>
                Please Choose...
              </option>
              <option className="capitalize" value="soup">
                soup
              </option>
              <option className="capitalize" value="salad">
                salad
              </option>
              <option className="capitalize" value="pizza">
                pizza
              </option>
              <option className="capitalize" value="dessert">
                dessert
              </option>
              <option className="capitalize" value="drinks">
                drinks
              </option>
            </select>
          </div>
          <div>
            <label>Price*</label> <br />
            <input
              defaultValue={item?.price}
              placeholder="Price"
              className="input mt-2 input-bordered w-full"
              {...register(
                "price",

                {
                  pattern: {
                    value: /^([0-9]+(?:\.[0-9]+)?)$/,
                    message: "Please enter a number",
                  },
                }
              )}
            />
            {errors.price && <p role="alert">{errors.price.message}</p>}
          </div>
          <div className="col-span-2">
            <label>Recipe Details*</label> <br />
            <textarea
              defaultValue={item?.recipe}
              placeholder="Recipe Details"
              className="textarea textarea-bordered mt-2 w-full "
              {...register("recipe")}
              rows="5"
            ></textarea>
          </div>
          <div>
            <input
              {...register("image")}
              accept="image/*"
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />{" "}
            <br />
            <button className="btn mt-5 bg-gradient-to-tr from-[#835D23] to-[#B58130] text-white rounded-md">
              update <ImSpoonKnife />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
