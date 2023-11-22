import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextInfo from "./useContextInfo";


const useStats = () => {
    const {user,enableFetch} = useContextInfo()
    const axiosSecure = useAxiosSecure()

    const {data:stats={},refetch} = useQuery({
        queryKey:['stats'],
        enabled:enableFetch,
        queryFn: async ()=>{
            const res = await axiosSecure("/admin-stats");
            return res.data
        }
    })
    return {stats,refetch}
};

export default useStats;