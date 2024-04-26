import React, { useEffect } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmail } from "../Redux/apiCalls/AuthApiCalls";

const VerifyEmailCom = () => {
  const { userId, token } = useParams();
  const dispatch = useDispatch();

  const { emailIsVerified } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(VerifyEmail(userId, token));
  }, [token, userId]);

  return (
    <div className="pageHeight w-full flex justify-center items-center bg-white dark:bg-black">
      {emailIsVerified ? (
        <div className="w-[700px] h-[500px] flex flex-col gap-[70px] justify-center items-center bg-gray text-gray-dark dark:text-gray rounded-xl dark:bg-gray-dark">
          <MdVerifiedUser className="text-[100px] text-green" />
          <h1 className="text-[40px] font-bold text-green">
            Your Email is verified successfully
          </h1>
          <Link
            className="border-2 border-blue px-[20px] py-[5px] rounded-lg text-blue font-bold hover:scale-105 duration-1000"
            to="/login"
          >
            Go to Login Page
          </Link>
        </div>
      ) : (
        <div className="w-[700px] h-[500px] flex flex-col gap-[70px] justify-center items-center bg-gray text-gray-dark dark:text-gray rounded-xl dark:bg-gray-dark">
          <MdVerifiedUser className="text-[100px] text-red" />
          <h1 className="text-[40px] font-bold text-red">
            Your Email is not verified 
          </h1>
          <Link
            className="border-2 border-blue px-[20px] py-[5px] rounded-lg text-blue font-bold hover:scale-105 duration-1000"
            to="/register"
          >
            try to register with another and valid Email
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailCom;
