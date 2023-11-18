
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {

  const axiosPublic = useAxiosPublic()
   

    const {data:menus=[],isFetching:loading,refetch} = useQuery({
      queryKey: 'menus',
      queryFn: async()=>{
        const res = await axiosPublic.get('/menu')
        console.log(res.data);
        return res.data
      }
    })
    
   
   return [menus, loading,refetch];
};

export default useMenu;