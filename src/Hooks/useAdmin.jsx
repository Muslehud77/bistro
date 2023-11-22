import { useQuery } from "@tanstack/react-query";
import useContextInfo from "./useContextInfo";

import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user,enableFetch} = useContextInfo()
    const axiosSecure = useAxiosSecure()
 
   const { data: isAdmin, isPending: isAdminLoading } = useQuery({
     queryKey: [user?.email, "isAdmin"],
     enabled: enableFetch,

     queryFn: async () => {
       const res = await axiosSecure.get(`/user/admin/${user?.email}`);

       return res.data?.admin;
     },
   });
  
   return [isAdmin,  isAdminLoading]; 
};

export default useAdmin;