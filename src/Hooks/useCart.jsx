import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextInfo from "./useContextInfo";



const useCart = () => {
    const {user} = useContextInfo()
const axiosSecure = useAxiosSecure()
const {data:cart=[],refetch} = useQuery({
    queryKey: ['cart'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/carts/?email=${user.email}`)
        return res.data
    }
})
 const amount = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
 return [cart,refetch,amount]
};

export default useCart;