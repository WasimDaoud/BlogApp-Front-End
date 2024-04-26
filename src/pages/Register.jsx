import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../Redux/apiCalls/AuthApiCalls";

import { authActions } from "../Redux/Slices.js/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);
  const { registerMessage } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);
  const [success, setSuccess] = useState(false);

  const empty = [];

  const Submitting = async (e) => {
    e.preventDefault();

    // validation
    if (!userName) {
      empty.push("userName");
      setSuccess(false);
      setEmptyFields(empty);
    }
    if (!passWord) {
      empty.push("passWord");
      setSuccess(false);
      setEmptyFields(empty);
    }
    if (!email) {
      empty.push("email");
      setSuccess(false);
      setEmptyFields(empty);
    }
    const user = {
      userName,
      passWord,
      email,
    };
    dispatch(RegisterUser(user));
    dispatch(authActions.error(null));
    setSuccess(true);
  };

  return (
    <div className="w-full bg-gray dark:bg-black">
      <div className="max-w-[1380px] mx-auto">
        <div className="lg:w-[60%] md:w-[75%] w-[90%] py-[34px] px-[20px] mx-auto ">
          <form
            className="dark:border-2 px-[50px] dark:border-blue flex flex-col rounded-md pb-[25px] bg-white dark:bg-gray-dark"
            onSubmit={Submitting}
            encType="multipart/form-data"
          >
            {/* Register title */}
            <h2 className="mx-auto font-bold text-[30px] my-[13px] text-blue">
              Register
            </h2>
            {/* userName */}
            <div className="flex flex-col">
              <label
                htmlFor="userName"
                className="md:text-[20px] my-[5px] dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                placeholder="Write Your Name here"
                className={
                  emptyFields.includes("userName") && !registerMessage
                    ? "mb-[15px] border-2 border-red outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                    : "mb-[15px] outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                }
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="md:text-[20px] my-[5px] dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="enter the email here"
                className={
                  emptyFields.includes("email") && !registerMessage
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
                className="md:text-[20px] my-[5px] dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={passWord}
                placeholder="enter the Password here"
                className={
                  emptyFields.includes("passWord") && !registerMessage
                    ? "mb-[15px] border-2 border-red outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                    : "mb-[15px] outline-none px-[15px] py-[5px] bg-gray rounded-md dark:bg-gray-dark-bg dark:text-white"
                }
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
            {/* Register Button */}
            <div className="text-center">
              <button
                type="submit"
                onClick={Submitting}
                className="my-[15px] md:text-[20px] bg-transparent border-2 border-blue rounded-xl py-[5px] px-[10px] text-blue hover:scale-105 duration-500"
              >
                Register
              </button>
            </div>
            {/* Login Link */}
            <div className="flex justify-center gap-[10px]">
              <h3 className="md:text-[20px] dark:text-white">
                already have an account ?{" "}
              </h3>
              <Link
                to="/login"
                className="text-blue font-bold hover:scale-110 duration-500 md:text-[20px]"
              >
                Login
              </Link>
            </div>
            {/* error message */}
            <div
              className={
                state.error || success
                  ? "mt-[5px] pt-[5px] h-[40px]  w-full rounded-md text-center"
                  : "mt-[5px] pt-[5px] h-[40px]  w-full rounded-md text-center invisible"
              }
            >
              {state.error ? (
                <h1 className="w-full h-full text-red border-2 border-red rounded-md">
                  {state.error}
                </h1>
              ) : success && state.error === null ? (
                <h1 className="w-full h-full text-green border-2 border-green rounded-md">
                  check your email to verify please
                </h1>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
