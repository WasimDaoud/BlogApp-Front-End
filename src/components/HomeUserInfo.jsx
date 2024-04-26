import React, { useState } from "react";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { UploadProfilePhoto } from "../Redux/apiCalls/ProfileApiCalls";
// import { profileActions } from "../Redux/Slices.js/ProfileSlice";

import UpdateProfile from "../components/UpdateProfile";

import { FaRegWindowClose } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { BsFillCameraFill } from "react-icons/bs";

const HomeUserInfo = (props) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  // update profile image form-submit-handler
  const UploadPhoto = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warning("there is no photo selected");
    }
    const formData = new FormData();
    formData.append("image", file);
    dispatch(UploadProfilePhoto(formData));
  };

  return (
    <div className="w-full bg-gray dark:bg-gray-dark-bg pb-[15px] shadow-md">
      {/* profile-image */}
      <div className="flex justify-center items-center pt-[30px]">
        <div className="rounded-full w-[350px] lg:w-[400px] h-[350px] lg:h-[400px] relative">
          <img
            className="rounded-full w-full h-full"
            src={
              file ? URL.createObjectURL(file) : props.user?.profilePhoto.url
            }
            alt="userImage"
          />
          {/* Update profile picture Icon & Upload-btn */}
          <form className="flex gap-[10px] absolute bottom-[10px] left-[70%]">
            {/* camera icon input to select photo */}
            <div>
              <label htmlFor="file">
                <div className=" w-[60px] h-[60px] rounded-full bg-gray dark:bg-gray-dark-bg flex justify-center items-center">
                  <BsFillCameraFill className="cursor-pointer text-[45px] text-orange" />
                </div>
                <input
                  type="file"
                  id="file"
                  name="image"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            {/* upload button */}
            <button
              type="submit"
              onClick={UploadPhoto}
              className="text-[20px] font-bold text-orange"
            >
              Upload
            </button>
          </form>
          {/* update profile data modal */}
          {updateProfileModal ? (
            <div className="bgModal flex">
              <div className="Modal xl:w-[45%] lg:w-[60%] w-[75%] h-[72%] bg-white dark:bg-gray-dark">
                {/* close modal icon */}
                <FaRegWindowClose
                  onClick={() => {
                    setUpdateProfileModal(false);
                  }}
                  className="sticky text-red text-[35px] cursor-pointer  top-[10px] m-[10px]"
                />
                {/* update profile form modal */}
                <UpdateProfile setUpdateProfileModal={setUpdateProfileModal} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Person name */}
      <div className="top-[75px] text-center mt-[10px]">
        <h1 className="text-blue dark:text-blue font-bold text-[30px] md:text-[50px] lg:text-[30px]">
          {props.user?.userName}
        </h1>
      </div>
      {/* user bio */}
      <h3 className="text-center text-[20px] font-bold text-gray-dark dark:text-gray-dark-i">
        {props.user?.bio}
      </h3>

      {/* user Joined-Date */}
      <h3 className="text-center text-[20px] text-gray-dark dark:text-gray-dark-i md:text-[20px]  my-[15px]">
        {`I joined Blog App At `}
        <span className="font-bold text-green text-[20px]">
          {new Date(props.user?.createdAt).toDateString()}
        </span>
      </h3>
      {/* update profile data form */}
      <div className="flex justify-center">
        {/* update profile icon */}
        <MdEditDocument
          onClick={() => {
            setUpdateProfileModal(true);
          }}
          className="text-[35px] text-orange cursor-pointer"
        />
        <button
          onClick={() => {
            setUpdateProfileModal(true);
          }}
          className="text-[20px] w-[150px] font-bold mt-[5px] text-orange"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default HomeUserInfo;

//h-[370px]
//lg:h-[435px]
