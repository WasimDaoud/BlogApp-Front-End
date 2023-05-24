import React from "react";
import { Link } from "react-router-dom";

import DashBoardLink from "../components/DashBoardLink";

import { HiOutlineDocumentDuplicate, HiOutlineUsers } from "react-icons/hi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { TbCategory2 } from "react-icons/tb";

const DashBoardSideBar = () => {
  return (
    <div className="max-w-[1600px] pageHeight mx-auto border-r-2 border-blue dark:bg-black bg-gray shadow-md">
      <DashBoardLink />
      <div className="pt-[30px] text-gray-dark  dark:text-gray-dark-i">
        {/* UL */}
        <ul className="flex flex-col gap-[30px] items-center">
            {/* Users */}
          <li className="flex items-center gap-[10px] hover:text-blue hover:scale-105 duration-500 font-bold shadow-md">
            <HiOutlineUsers className="text-[20px] lg:text-[35px]"/>
            <Link to="/dashboard/users-table" className="text-[25px]">Users</Link>
          </li>
          {/* Posts */}
          <li className="flex items-center gap-[10px] hover:text-blue hover:scale-105 duration-500 font-bold shadow-md">
            <HiOutlineDocumentDuplicate className="text-[20px] lg:text-[35px]"/>
            <Link to="/dashboard/posts-table" className="text-[25px]">Posts</Link>
          </li>
          {/* Comments */}
          <li className="flex items-center gap-[10px] hover:text-blue hover:scale-105 duration-500 font-bold shadow-md">
            <VscCommentDiscussion className="text-[20px] lg:text-[35px]"/>
            <Link to="/dashboard/comments-table" className="text-[25px]">Comments</Link>
          </li>
          {/* Categories */}
          <li className="flex items-center gap-[10px] hover:text-blue hover:scale-105 duration-500 font-bold shadow-md">
            <TbCategory2 className="text-[20px] lg:text-[35px]"/>
            <Link to="/dashboard/categories-table" className="text-[25px]">Categories</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
