
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import { IoTrashBin } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });
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
          axiosSecure.delete(`/user/${id}`).then((res) => {
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
    const handleUser = (id)=>{
        Swal.fire({
          title: "Do you want to make this user admin?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            axiosSecure.patch(`/user/${id}`)
            .then(res=>{
                refetch();
                if(res.data.modifiedCount){
                     Swal.fire("Saved!", "", "success");
                }
            })

           
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
    }


    return (
      <div>
        <SectionHeader
          mini={"---Users---"}
          heading={"Manage Users"}
        ></SectionHeader>

        <h2 className="text-3xl mt-2 text-left">
          Total Users : {users.length}
        </h2>

        <div>
          <div className="overflow-x-auto rounded-xl mt-5">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="bg-[#D1A054]">
                  <th className="py-5">#</th>
                  <th className="py-5">Name</th>
                  <th className="py-5">Email</th>
                  <th className="py-5">Role</th>
                  <th className="py-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>
                      <h4>{user.name}</h4>
                    </td>
                    <td>
                      <h4 className="text-lg">{user.email}</h4>
                    </td>
                    <td>
                      {user.role ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleUser(user._id)}
                          className="btn text-white text-xl bg-[#D1A054]"
                        >
                          <FaUser />
                        </button>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleDelete(user._id)}
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

export default AllUsers;