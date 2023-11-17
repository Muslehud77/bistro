import Swal from "sweetalert2";
import useContextInfo from "../../Hooks/useContextInfo";
import { useNavigate } from "react-router-dom";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";



const ItemCard = ({item}) => {
    const { name, image, price, recipe ,_id} = item
    const [disable,setDisable] = useState(false)
    const {user} = useContextInfo()
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
    const handleAddCart = ()=>{
     if(user){
      setDisable(true)
       const cart = {
        itemId: _id, userEmail : user.email,name,image,price
       }
       axiosSecure.post('/cart',cart).then(res=>{
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to you cart`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
          setDisable(false)
       })
     }else{
      Swal.fire({
        title: "You want to login?",
        text: "you need to be login first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
         navigate('/login',{state: '/order/All'})
        }
      });
     }
    }

    return (
      <div className="flex justify-center">
        <div className="card rounded-none w-96 bg-[#F3F3F3] shadow-xl">
          <figure>
            <img src={image} alt={name} />
          </figure>
          <p className='text-white bg-slate-900 py-1 px-2 absolute top-2 right-2'>${price}</p>
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center">{name}</h2>
            <p className="text-sm">{recipe}</p>
            <div className="card-actions justify-center mt-2">
              <button disabled={disable} onClick={handleAddCart} className="btn hover:bg-black bg-[#dbdada] text-[#C9A141]  border-b-2 border-b-[#C9A141] outline-none">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ItemCard;