import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/apiCalls/AuthApiCalls";

import { toast } from "react-toastify";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [passWord, setpassWord] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector( (state) => state.auth );


  const Submitting = async (e) => {

    e.preventDefault();
    // validation
    if(!email){
      setSuccess(false)
      toast.error("Email Field is Required")
    }
    if(!passWord){
      setSuccess(false)
      toast.error("PassWord Field is Required")
    }

    dispatch(LoginUser({ email, passWord }));
    if( !state.error ){
      setSuccess(true);
    }
  };

  return (
    <div className="w-full bg-gray dark:bg-black">
      <div className="max-w-[1380px] mx-auto">
        <div className="pt-[87px] pb-[84px] lg:w-[60%] md:w-[75%] w-[90%] px-[20px] mx-auto ">
          <form className="dark:border-2 px-[50px] dark:border-blue flex flex-col rounded-xl bg-white dark:bg-gray-dark pt-[12px]">
            <h2 className="mx-auto font-bold text-[35px]  text-blue">
              Log In
            </h2>
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="md:text-[20px] mb-[10px] mt-[5px] dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="enter the email here"
                className={
                  state.error && !email
                    ? "mb-[15px] border-2 border-red outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                    : "mb-[15px] outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* PassWord */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="md:text-[20px] my-[10px] dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={passWord}
                placeholder="enter the Password here"
                className={
                  state.error && !passWord
                    ? "mb-[15px] border-2 border-red outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                    : "mb-[15px] outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                }
                onChange={(e) => setpassWord(e.target.value)}
              />
            </div>
            {/* Login Button */}
            <div className="text-center">
              <button
                type="submit"
                onClick={Submitting}
                className="my-[10px] md:text-[20px] bg-transparent border-2 border-blue rounded-md py-[5px] px-[10px] text-blue hover:scale-105 duration-500"
              >
                Log In
              </button>
            </div>
            {/* Forget PssWord Link */}
            <div className="flex justify-center gap-[10px]">
              <Link
                to="/forgot-password"
                className="text-blue font-bold hover:scale-110 duration-500 md:text-[20px]"
              >
                Forgot your PassWord ?
              </Link>
            </div>
            {/* error message */}
            <div
              className={
                state.error || success
                  ? "my-[10px] pt-[5px] h-[40px]  w-full rounded-md text-center"
                  : "my-[10px] pt-[5px] h-[40px]  w-full rounded-md text-center invisible"
              }
            >
              {state.error ? (
                <h1 className="w-full h-full text-red border-2 border-red rounded-md">
                  {state.error}
                </h1>
              ) : success && state.user?.user ?  (
                <h1 className="w-full h-full text-green border-2 border-green rounded-md">
                  Login successfully
                </h1>
              ) : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
