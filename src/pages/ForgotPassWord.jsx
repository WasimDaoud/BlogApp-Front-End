import React from "react";

import { toast } from "react-toastify";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { ResetPasswordApiReq } from "../Redux/apiCalls/AuthApiCalls";

const ForgotPassWord = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const emptyFieldss = [];

  const Submitting = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email field is required");
    }
    dispatch(ResetPasswordApiReq(email));
    toast.success(
      "Please check your email to complete your reset password process "
    );
    setEmail(" ");
  };

  return (
    <div className="w-full pageHeight bg-gray dark:bg-black">
      <div className="max-w-[1380px] mx-auto">
        <div className="pt-[87px] pb-[84px] lg:w-[60%] md:w-[75%] w-[90%] px-[20px] mx-auto ">
          <form className="dark:border-2 px-[50px] dark:border-blue flex flex-col rounded-xl pb-[50px] bg-white dark:bg-gray-dark">
            <h2 className="mx-auto font-bold text-[35px] my-[20px] text-blue">
              Forgot PassWord
            </h2>
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="md:text-[20px] my-[10px] dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="enter the email here"
                className={
                  emptyFieldss.includes("email")
                    ? "mb-[15px] border-2 border-red outline-none px-[15px] py-[5px] bg-gray rounded-xl dark:bg-gray-dark-bg dark:text-white"
                    : "mb-[15px] outline-none px-[15px] py-[5px] bg-gray rounded-xl dark:bg-gray-dark-bg dark:text-white"
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Login Button */}
            <div className="text-center">
              <button
                type="submit"
                onClick={Submitting}
                className="my-[20px] md:text-[20px] bg-transparent border-2 border-blue rounded-xl py-[5px] px-[10px] text-blue hover:scale-105 duration-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassWord;
