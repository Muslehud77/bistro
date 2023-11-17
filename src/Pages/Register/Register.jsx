
import { useContext, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useForm } from "react-hook-form";
import HelmetProvider from "../../Shared/Helmet/Helmet";
import { AuthContext } from './../../Provider/AuthProvider';
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import logo from '../../assets/logo/logo-colored.png'
import useAxiosPublic from "../../Hooks/useAxiosPublic";




const Register = () => {

  const axiosPublic = useAxiosPublic()

const navigate = useNavigate()


const { state } = useLocation();


const [show,setShow] = useState(false)

const {createUser} = useContext(AuthContext)

const [err, setErr] = useState(null);
const {
  register,
  handleSubmit,
  
  formState: { errors },
} = useForm();


  
 const onSubmit = (data) => {
  const {displayName,email,password,photoURL} = data
  createUser(email, password)
    .then((res) => {
      updateProfile(res.user, {
        displayName,
        photoURL,
      });
      navigate(state ? state : "/");

      const userInfo = {
        name: displayName, email,
      }

      axiosPublic.post('/user', userInfo).then((res) => {
        if(res.data.insertedId){
          Swal.fire({
        title: `Welcome! ${displayName}`,
        text: "Modal with a custom image.",
        imageUrl: logo,
        imageWidth: 400,
        imageHeight: 200,
        timer: 1500,
        showConfirmButton: false,
        imageAlt: "Custom image",
      });
        };
      })

      
    })
    .catch((err) => setErr(err.message));
 

  
 }
  

  return (
    <section className="relative bg-black  bg-opacity-60 py-20">
      <HelmetProvider title={"Register"}></HelmetProvider>
      <div>
        <div className="max-w-md relative z-10  py-10 px-12 mx-auto space-y-8  bg-black text-white bg-opacity-50 backdrop-blur-md rounded-md">
          <h2 className="font-semibold text-3xl">Register Account</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="font-semibold">Your Name</p>
            <input
              {...register("displayName")}
              required
              type="text"
              name="displayName"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Your Photo</p>
            <input
              type="url"
              {...register("photoUrl")}
              name="photoURL"
              placeholder="Your photo url"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Your Email</p>
            <input
              required
              type="email"
              name="email"
              {...register("email")}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-100 text-black"
            />
            <p className="font-semibold">Set Password</p>
            <div className="relative">
              <input
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{6,}$/,
                })}
                required
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="Password must be at-least 6 characters"
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
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must me at least 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must include 1 number 1 uppercase 1 lowercase 1 special
                characters
              </span>
            )}
            {err && (
              <div className="text-red-500 rounded-lg p-2 bg-white font-serif font-light">
                <p>{err}</p>
              </div>
            )}

            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <input
                  required
                  type="checkbox"
                  className="checkbox checkbox-sm bg-white"
                  name=""
                  id=""
                />
                <label>
                  Accept{" "}
                  <a className="hover:underline" href="">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              <input
                type="submit"
                value="Register"
                className="btn btn-neutral outline outline-white bg-black text-white w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};


export default Register;
