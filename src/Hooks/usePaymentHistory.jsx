
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useContextInfo from './useContextInfo';

const usePaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContextInfo()
    const { data:paymentHistory=[] } = useQuery({
      queryKey: "paymentHistory",
      queryFn: async () => {
        if(!user) return []
        const res = await axiosSecure.get(`/paymentHistory/?email=${user.email}`)
        return res.data
      },
    });
    return [paymentHistory];
};

export default usePaymentHistory;