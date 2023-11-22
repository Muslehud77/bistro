import axios from "axios";
import useContextInfo from './useContextInfo';
import { useNavigate } from "react-router-dom";


export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const {logout,user} = useContextInfo()

    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
       config.headers.authorization = `Bearer ${token}`
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use((response) => {
        return response
    },
    (error) => {
        const response = error.response.status
        if (response === 401 || response === 403) {
          //  if(user){
          //    navigate("/login");
          //    logout();
          //  }
          
        }
        console.log('status err in the interceptor',response);
        return Promise.reject(error);
    }
    )
    
    return axiosSecure
};

export default useAxiosSecure;