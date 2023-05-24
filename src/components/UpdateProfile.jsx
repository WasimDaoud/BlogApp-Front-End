import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { UpdateProfileCall } from "../Redux/apiCalls/ProfileApiCalls";

const UpdateProfile = ({ setUpdateProfileModal }) => {
  const state = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(state.user.user.userName);
  const [bio, setBio] = useState(state.user.user.bio);
  const [passWord, setPassWord] = useState(state.user.user.passWord);
  const [email, setEmail] = useState(state.user.user.email);

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    // validation
    if (
      userName === state.user.user.userName &&
      bio === state.user.user.bio &&
      email === state.user.user.email &&
      passWord === state.user.user.passWord
    ) {
      return toast.warning(" You didn't update any field ");
    }
    // Updated data
    const Profile = {
      userName,
      passWord,
      email,
      bio,
    };

    dispatch(UpdateProfileCall(state?.user.user._id, Profile));

    setUserName("");
    setBio("");
    setEmail("");
    setPassWord("");
    toast.success("Profile updated successfully");
    setUpdateProfileModal(false);
  };

  return (
    <div className="w-full h-full p-[15px] bg-gray  dark: dark:bg-black">
      <form
        className="w-[90%] border-2 border-blue rounded-xl my-[30px] bg-white lg:w-[90%] mx-auto text-center dark:bg-gray-dark"
        onSubmit={UpdateProfileSubmitHandler}
      >
        <h1 className="text-center font-bold text-[27px] pt-[15px] mt-[11px] text-blue">
          Update Profile
        </h1>
        {/* user name */}
        <div className="flexBetween py-[15px]">
          <input
            className="input text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        {/* user bio */}
        <div className="flexBetween py-[15px]">
          <input
            className="input text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="User Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        {/* user Email */}
        <div className="flexBetween py-[15px]">
          <input
            value={email}
            className="input text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="User Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* user passWord */}
        <div className="flexBetween py-[15px]">
          <input
            type="password"
            className="input text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="User PassWord"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <button
          className="input mb-[13px] bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-blue dark:text-blue text-[25px] font-bold"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
