import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import {
  BsFillSunFill,
  BsFillPencilFill,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { BiMenu, BiLogIn } from "react-icons/bi";
import { HiDocumentDuplicate } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";


import { useSelector, useDispatch } from "react-redux";
import { LogOutUser } from "../Redux/apiCalls/AuthApiCalls";

const Navbar = () => {

  const { allCategories } = useSelector(state => state.category )
  const [menu, setMenu] = useState(false);
  const [modeIcon, setModeIcon] = useState("light");
  const [dropDown, setDropDown] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lightMode = () => {
    setModeIcon("light");
    document.body.classList.toggle("dark");
  };

  const darkMode = () => {
    setModeIcon("dark");
    document.body.classList.toggle("dark");
  };

  const showMenu = () => {
    setMenu(!menu);
  };

  const LogoutHandler = () => {
    dispatch(LogOutUser());
    localStorage.removeItem("user");
    setDropDown(false);
    navigate("/");
  };

  return (
    <div className="w-full sticky z-[1000] bg-blue top-0  dark:bg-gray-dark">
      <div className="flexBetween md:max-w-[1600px] h-[60px] px-[20px] m-auto">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="font-bold text-[25px] text-white dark:text-blue sm:text-[25px] md:text-[30px]">
              Blog App
            </h1>
          </Link>
        </div>
        {/* nav-items */}
        <div className="hidden xl:block">
          <ul className="flexBetween gap-[15px] text-white">
            {/* Create Post */}
            {user ? (
              <Link to="/">
                <div className="flex items-center cursor-pointer dark:text-gray-dark-i hover:scale-105 duration-1000 px-[5px] rounded-xl">
                  <BsFillPencilFill className="cursor-pointer text-[20px] dark:text-gray-dark-i  sm:mx-[5px]" />
                  <li>
                    <Link to="/posts/createpost">Create</Link>
                  </li>
                </div>
              </Link>
            ) : (
              ""
            )}
            {/* Posts */}
            <Link to="/posts">
              <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-1000 px-[5px] rounded-xl">
                <HiDocumentDuplicate className="cursor-pointer text-[20px] sm:mx-[5px]" />
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
              </div>
            </Link>
            {/* Dash-Board */}
            {user?.user?.isAdmin ? (
              <Link to="/dashboard">
                <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-1000 px-[5px] rounded-xl">
                  <RiAdminFill className="cursor-pointer text-[20px] sm:mx-[5px]" />
                  <li>
                    <Link to="/dashboard">DashBoard</Link>
                  </li>
                </div>
              </Link>
            ) : (
              ""
            )}
            {/* Home */}
            <Link to="/">
              <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-1000 px-[5px] rounded-xl">
                <AiFillHome className="cursor-pointer text-[20px] sm:mx-[5px]" />
                <li>
                  <Link to="/">Home</Link>
                </li>
              </div>
            </Link>
          </ul>
        </div>
        {/* mobile menu */}
        <div className=" text-white xl:hidden cursor-pointer sm:mx-[10px] hover:scale-105 duration-500">
          <BiMenu
            onClick={showMenu}
            className="dark:text-gray-dark-i text-[30px]"
          />
        </div>
        {/* Icons */}
        <div className="flexBetween text-white gap-[10px] md:text-[20px] dark:text-gray-dark-i relative">
          {/* Sun & DarkMode */}
          {modeIcon !== "dark" ? (
            <BsFillSunFill
              onClick={darkMode}
              className="cursor-pointer sm:mx-[10px] hover:scale-105 duration-500"
            />
          ) : (
            <FaMoon
              onClick={lightMode}
              className="cursor-pointer sm:mx-[10px] hover:scale-105 duration-500"
            />
          )}
          {/* Login & Register */}
          {/* there is loggedIn user */}
          {user ? (
            // userName & userProfileImage
            <div className="flexBetween gap-[15px]">
              <h1 className="font-bold text-gray-dark dark:text-gray text-[20px]">
                {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user?.userName : user?.user?.userName }
              </h1>
              <div className=" cursor-pointer md:w-[45px] md:h-[45px] w-[40px] h-[40px] rounded-full relative">
                {/* user Image */}
                <img
                  className="w-full h-full rounded-full"
                  src={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user?.profilePhoto.url : user?.user?.profilePhoto.url }
                  alt="userImage"
                  onClick={() => setDropDown(!dropDown)}
                />
                {/* DropDown menu */}
                {dropDown ? (
                  <ul className="absolute right-0 w-[150px] p-[15px] flex flex-col items-center gap-[10px] bg-gray dark:bg-gray-dark border-2 border-blue dark:border-t-0 rounded-b-xl mt-[9px]">
                    <li className="text-[17px] hover:scale-105 duration-1000 font-bold text-gray-dark dark:text-gray-dark-i">
                      <Link
                        to={`profile/${user.user?._id}`}
                        onClick={() => setDropDown(false)}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li
                      onClick={LogoutHandler}
                      className="text-[17px] hover:scale-105 duration-1000 font-bold text-gray-dark dark:text-gray-dark-i"
                    >
                      Log Out
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-[15px]">
              <button className="border-2 border-white px-[7px] rounded-xl  hover:bg-white hover:border-blue hover:text-blue">
                <Link to="/login" className="flexBetween">
                  <BiLogIn className="cursor-pointer sm:mx-[5px] hover:scale-105 duration-500" />
                  LogIn
                </Link>
              </button>
              <button className="flexBetween border-2 border-white px-[7px] rounded-xl duration-500 hover:bg-white hover:border-blue hover:text-blue">
                <Link to="/register" className="flexBetween">
                  <BsPersonFillAdd className="cursor-pointer sm:mx-[5px] hover:scale-105 duration-500" />
                  Register
                </Link>
              </button>
            </div>
          )}
        </div>
        {/* display user menu or not */}
        {menu ? (
          <div className="clip-show duration-1000 absolute right-0 top-[60px] w-full  text-gray-dark  px-[10px] pb-[10px] bg-blue dark:bg-gray-dark">
            <div className="w-full h-full flexBetween py-[10px]">
              {/* MENU */}
              <div className="bg-transparent w-[50%]">
                <ul className="flex flex-col items-center gap-[10px]">
                  {/* Home */}
                  <Link to="/" onClick={() => setMenu(false)}>
                    <div className="flex items-center cursor-pointer text-[20px]  dark:text-gray-dark-i hover:scale-105 duration-500">
                      <AiFillHome className="cursor-pointer sm:mx-[10px]" />
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                    </div>
                  </Link>
                  {/* Create */}
                  {user?.user ? (
                    <Link to="/create" onClick={() => setMenu(false)}>
                      <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i  hover:scale-105 duration-500">
                        <BsFillPencilFill className="cursor-pointer dark:text-gray-dark-i  sm:mx-[10px]" />
                        <li>
                          <Link to="/posts/createpost">Create</Link>
                        </li>
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                  {/* Posts */}
                  <Link to="/posts" onClick={() => setMenu(false)}>
                    <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-500">
                      <HiDocumentDuplicate className="cursor-pointer  sm:mx-[10px]" />
                      <li>
                        <Link to="/posts">Posts</Link>
                      </li>
                    </div>
                  </Link>
                  {/* DashBoard */}
                  {user?.user.isAdmin ? (
                    <Link to="/dashboard" onClick={() => setMenu(false)}>
                      <div className="flex items-center cursor-pointer text-[20px]  dark:text-gray-dark-i hover:scale-105 duration-500">
                        <RiAdminFill className="cursor-pointer  sm:mx-[10px]" />
                        <li>
                          <Link to="/dashboard">Admin Dashboard</Link>
                        </li>
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              {/* CATEGORIES */}
              <div className="bg-transparent w-[50%]">
                <h1 className="text-[20px] font-bold text-white underline dark:text-gray-dark-i text-center">
                  Categories
                </h1>
                <div className="flex justify-center flex-wrap gap-[10px] py-[10px]">
                  {allCategories.map((item) => (
                    <div
                      key={item._id}
                      className=" md:text-[20px] px-[10px] py-[3px] rounded-xl text-gray-dark bg-white dark:hover:bg-blue dark:bg-gray-dark-text dark:text-gray-dark-i border-2 border-blue hover:bg-blue hover:border-white my-[10px] cursor-pointer duration-500"
                    >
                      <Link to={`/category/${item.title}`}>{item.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="clip-hide duration-1000 absolute right-0 top-[60px] w-full  text-gray-dark  px-[10px] pb-[10px] bg-blue  dark:bg-gray-dark">
            <div className="w-full h-full flexBetween py-[10px]">
              {/* MENU */}
              <div className="bg-transparent w-[50%]">
                <ul className="flex flex-col items-center gap-[10px]">
                  {/* Home */}
                  <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-500">
                    <AiFillHome className="cursor-pointer  sm:mx-[10px]" />
                    <li>Home</li>
                  </div>
                  {/* Create */}
                  {user?.user ? (
                    <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i  hover:scale-105 duration-500">
                      <BsFillPencilFill className="cursor-pointer dark:text-gray-dark-i  sm:mx-[10px]" />
                      <li>Create</li>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* Posts */}
                  <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-500">
                    <HiDocumentDuplicate className="cursor-pointer  sm:mx-[10px]" />
                    <li>Posts</li>
                  </div>
                  {/* Admin Dashboard */}
                  {user?.user?.isAdmin ? (
                    <div className="flex items-center cursor-pointer text-[20px] dark:text-gray-dark-i hover:scale-105 duration-500">
                      <RiAdminFill className="cursor-pointer sm:mx-[10px]" />
                      <li>Admin Dashboard</li>
                    </div>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              {/* CATEGORIES */}
              <div className="bg-transparent w-[50%]">
                <h1 className="text-[20px] text-white underline font-bold  dark:text-gray-dark-i text-center">
                  Categories
                </h1>
                <div className="flex justify-center flex-wrap gap-[10px] py-[10px]">
                  {allCategories?.map((item) => (
                    <div
                      key={item._id}
                      className=" md:text-[20px] px-[10px] py-[3px] rounded-xl text-gray-dark bg-white dark:hover:bg-blue dark:bg-gray-dark-text dark:text-gray-dark-i border-2 border-blue hover:bg-blue my-[10px] cursor-pointer duration-500"
                    >
                      <Link to={`/categories/${item.title}`}>{item.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
