
import SectionHeader from './../../../Shared/SectionHeader/SectionHeader';
import { useForm } from "react-hook-form";
import { ImSpoonKnife } from 'react-icons/im';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2';







const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_API;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;


const AddItem = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
 const { register, handleSubmit ,reset} = useForm();
 const onSubmit = async(data) => {
    const imageFile = {image: data.image[0]}
    console.log(imageFile);
    const res = await axiosPublic.post(imageHostingApi,imageFile,{
      headers: { 'Content-Type': 'multipart/form-data'}
    })
    if(res.data.success) {
      const item = {name: data.name,recipe:data.recipe,category:data.category,price:parseFloat(data.price),image: res.data.data.display_url}
      const response = await axiosSecure.post("/menu/add",item);
     if(response.data.insertedId){
      reset()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} has been added!`,
        showConfirmButton: false,
        timer: 1500,
      });
     }
    }
   
 }

    return (
      <div>
        <SectionHeader
          mini={"---What's new?---"}
          heading={"ADD AN ITEM"}
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
                placeholder="Recipe name"
                className="input mt-2 input-bordered w-full"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label>Category*</label> <br />
              <select
                placeholder="Category"
                defaultValue="selected"
                className="select w-full mt-2 select-bordered"
                {...register("category", { required: true })}
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
                type="number"
                placeholder="Price"
                className="input mt-2 input-bordered w-full"
                {...register("price", { required: true })}
              />
            </div>
            <div className="col-span-2">
              <label>Recipe Details*</label> <br />
              <textarea
                placeholder="Recipe Details"
                className="textarea textarea-bordered mt-2 w-full "
                {...register("recipe", { required: true })}
                rows="5"
              ></textarea>
            </div>
            <div>
              <input
                {...register("image", { required: true })}
                accept="image/*"
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />{" "}
              <br />
              <button className="btn mt-5 bg-gradient-to-tr from-[#835D23] to-[#B58130] text-white rounded-md">
                Add Item <ImSpoonKnife />
              </button>
            </div>
          </form>
        </div>
     
      </div>
    );
};

export default AddItem;