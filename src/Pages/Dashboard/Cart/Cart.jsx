import Swal from "sweetalert2/dist/sweetalert2.js";
import useCart from "../../../Hooks/useCart";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { IoTrashBin } from "react-icons/io5";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="">
      <SectionHeader
        mini={"---My Cart---"}
        heading={"WANNA ADD MORE?"}
      ></SectionHeader>
      <div className="flex justify-between">
        <h2 className="text-3xl mt-2">Total Orders : {cart.length}</h2>
        <h2 className="text-3xl mt-2">Total Price : {totalPrice.toFixed(2)}</h2>
        <button className="btn bg-[#D1A054] text-white">Pay</button>
      </div>

      <div>
        <div className="overflow-x-auto rounded-xl mt-5">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className="bg-[#D1A054]">
                <th className="py-5">#</th>
                <th className="py-5">Image</th>
                <th className="py-5">Name</th>
                <th className="py-5">Price</th>
                <th className="py-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={item._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h4 className="text-lg">{item.name}</h4>
                  </td>
                  <td>${item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn text-white text-xl bg-red-500"
                    >
                      <IoTrashBin />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
