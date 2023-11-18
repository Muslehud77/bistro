import { useQuery } from "@tanstack/react-query";
import useContextInfo from "./useContextInfo";

import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user,} = useContextInfo()
    const axiosSecure = useAxiosSecure()
   const {data:isAdmin,refetch,isPending:isAdminLoading} = useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/user/admin/${user?.email}`)
        console.log(res.data);
        return res.data?.admin
    }

   })
   return [isAdmin, refetch, isAdminLoading]; 
};

export default useAdmin;