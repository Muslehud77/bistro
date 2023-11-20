import { IoTrashBin } from "react-icons/io5";
import useMenu from "../../../Hooks/useMenu";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import  Swal  from "sweetalert2/dist/sweetalert2";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const ManageItems = () => {

  const [menus,loading,refetch] = useMenu()

  const axiosSecure = useAxiosSecure()
  
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
        axiosSecure.delete(`/menu/${id}`).then((res) => {
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
           mini={"---Hurry Up!---"}
           heading={"MANAGE ALL ITEMS"}
         ></SectionHeader>
         <div className="flex justify-between">
           <h2 className="text-3xl mt-2">Total Items</h2>
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
                   <th className="py-5">Action</th>
                 </tr>
               </thead>
               <tbody>
                 {menus.map((item, i) => (
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
                       <Link
                        to={`/dashboard/edit/${item._id}`}
                         className="btn text-white text-xl bg-[#D1A054]"
                       > 
                         <CiEdit />
                       </Link>
                     </th>
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
              }
export default ManageItems;