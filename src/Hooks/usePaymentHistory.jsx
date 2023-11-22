
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useContextInfo from './useContextInfo';

const usePaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContextInfo();
    const { data: paymentHistory = [] } = useQuery({
      queryKey: ["paymentHistory"],
      enabled: user ? !loading : false,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/paymentHistory/?email=${user.email}`
        );
        return res.data;
      },
    });
    return [paymentHistory];
};

export default usePaymentHistory;