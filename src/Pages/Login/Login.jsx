import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/others/authentication1.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useForm } from "react-hook-form";
import HelmetProvider from "../../Shared/Helmet/Helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const {login,googleLogin} = useContext(AuthContext)

  const {state} = useLocation()

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
   const {email,password} = data
   login(email, password).then((res)=>{
    navigate(state? state : '/')
    Swal.fire({
      position: "center",
      icon: "success",
      title: `welcome ${res.user.displayName}`,
      showConfirmButton: false,
      timer: 1500,
    });
   }).catch(err=>{
    console.log(err);
    setErr('Email or password is incorrect please try again')
   })
  }
   




  const validateCapt = (e) => {
    const value = e.target.value;

    if (validateCaptcha(value, false) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const socialLogin = (social)=>{
    social().then((data) =>{
      const userInfo = {
        name: data.user.displayName,
        email: data.user.email
      };
      axiosPublic.post('/user', userInfo).then(res=>{
       if(res.data.isExist){
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Welcome Back! ${data.user.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
       
        
       }else{
         Swal.fire({
           position: "center",
           icon: "success",
           title: `Welcome ${data.user.displayName}`,
           showConfirmButton: false,
           timer: 1500,
         });
        
       }
      })
        navigate(state ? state : "/");
        })
  }

  return (
    <div className="relative bg-white mt-20">
        <HelmetProvider title={'Login'}></HelmetProvider>
      <section className="w-full container  mx-auto px-8 py-20   items-center gap-8 ">
        <div className="bg-white w-5/6 shadow-2xl mx-auto gap-10 md:flex justify-center items-center px-12">
          <img src={img} className="w-5/12 h-4/6" alt="" />
          <div className="relative  z-10 py-8 md:py-10 px-5 space-y-8">
            <h2 className="font-semibold text-3xl">Login</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="font-semibold">Your Email</p>
              <input
                {...register("email")}
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-100"
              />
              <p className="font-semibold">Password</p>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  required
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  placeholder="Password "
                  className="input input-bordered w-full bg-gray-100 text-black"
                />
                <div
                  className="hover:cursor-pointer absolute right-3 bottom-3 text-black text-xl"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {!show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <LoadCanvasTemplate />
                <input
                  onChange={validateCapt}
                 
                  type="text"
                  name="captcha"
                  placeholder="Enter captcha"
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                {err && (
                  <p className="capitalize text-red-500 font-serif  rounded-xl">
                    {err}
                  </p>
                )}
                <input
                  disabled={disabled}
                  type="submit"
                  value="login"
                  className="btn btn-neutral w-full"
                />
              </div>
            </form>
            <div>
              <span>
                Don't Have An Account ?{" "}
                <Link
                state={state}
                  className="hover:font-semibold text-blue-700"
                  to="/register"
                >
                  Register
                </Link>
              </span>
              <div className="mt-3">
                <div className="flex justify-center gap-5 items-center mb-2">
                  <div className="w-16 h-[1px] bg-black"></div>
                  <h2 className="text-xl font-bold ">or</h2>
                  <div className="w-16 h-[1px] bg-black"></div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => socialLogin(googleLogin)}
                    className="btn w-full btn-outline"
                  >
                    <FcGoogle className="text-2xl" /> continue with Google
                  </button>
                  <button
                    // onClick={() => socialLogin(facebookSignIn)}
                    className="btn w-full btn-outline"
                  >
                    {" "}
                    <BsFacebook className="text-2xl" /> continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
