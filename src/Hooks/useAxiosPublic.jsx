import axios from 'axios';




export const axiosPublic = axios.create({
  baseURL: "https://bistro-server-three.vercel.app",
});

 const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic