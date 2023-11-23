import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextInfo from "./useContextInfo";


const useStats = () => {
    const {enableFetch} = useContextInfo()
    const axiosSecure = useAxiosSecure()

    const {data:stats={},refetch} = useQuery({
        queryKey:['stats'],
        enabled:enableFetch,
        queryFn: async ()=>{
            const res = await axiosSecure.get("/admin-stats");
            return res.data
        }
    })

    const {data:itemsSold=[]}= useQuery({
        queryKey:['itemsSold'],
        enabled:enableFetch,
        queryFn: async ()=>{
            const res = await axiosSecure.get("/items-sold")
            const soldItems = res.data.map(item => ({...item,revenue:item.revenue.toFixed(2)}));
     
            return res.data;
        }
    })

    

    return {stats,itemsSold,refetch}
};

export default useStats;