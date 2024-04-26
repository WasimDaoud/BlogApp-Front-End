import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { useState } from "react";

import { HiOutlineDocumentDuplicate, HiOutlineUsers } from "react-icons/hi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { TbCategory2 } from "react-icons/tb";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  CreateCategory,
  GetAllCategories,
} from "../Redux/apiCalls/CategoryApiCalls";
import { categoryActions } from "../Redux/Slices.js/CategorySlice";
import { GetAllUsers } from "../Redux/apiCalls/UserApiCalls";
import { GetAllComments } from "../Redux/apiCalls/CommentApiCalls";
import { GetAllPosts } from "../Redux/apiCalls/PostsApiCalls";

const DashBoardMain = () => {
  const dispatch = useDispatch();
  const {
    allCategories,
    categoryIsDeleted,
    categoryIsUpdated,
    categoryIsCreated,
  } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");

  const { users } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { allComments } = useSelector((state) => state.comment);

  const AddCategorySubmitHandler = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("title field is required");
    }
    dispatch(CreateCategory({ title }));
    dispatch(categoryActions.setCategoryIsCreated(true));
    setTitle("");
    toast.success("Category has been created successfully");
  };

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(GetAllPosts());
    dispatch(GetAllCategories());
    dispatch(GetAllComments());
    dispatch(categoryActions.setCategoryIsCreated(false));
  }, [
    categoryIsCreated,
    categoryIsUpdated,
    categoryIsDeleted.allCategories?.length,
    users?.length,
    posts?.length,
    allComments?.length,
    allCategories?.length,
  ]);

  return (
    <div className="w-full pt-[30px]">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-[60px]">
        {/* dashBoard Head section */}
        <div className="w-full flex items-start justify-center  flex-wrap gap-[10px] lg:px-[10px]">
          {/* users card */}
          <div className="w-[80%] lg:w-[45%] xl:w-[23%] h-[150px] bg-gray dark:bg-gray-dark rounded-xl flex flex-col justify-between border-2 border-gray-dark-text p-[15px] shadow-md">
            <strong className="text-[25px] text-gray-dark dark:text-gray">
              Users
            </strong>
            <h2 className="text-red text-[20px] font-bold">{users?.length}</h2>
            <div className="flex justify-between items-center">
              <Link to="/dashboard/users-table">
                <button className="text-white text-[20px] hover:scale-105 duration-500 rounded-xl px-[15px] dark:text-[gray-dark] bg-green">
                  See all Users
                </button>
              </Link>
              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white dark:bg-gray-dark-bg border-2 border-blue">
                <Link to="/dashboard/users-table">
                  <HiOutlineUsers className="text-[25px] text-blue" />
                </Link>
              </div>
            </div>
          </div>
          {/* posts card */}
          <div className="w-[80%] lg:w-[45%] xl:w-[23%] h-[150px] bg-gray dark:bg-gray-dark rounded-xl flex flex-col justify-between border-2 border-gray-dark-text p-[15px] shadow-md">
            <strong className="text-[25px] text-gray-dark dark:text-gray">
              Posts
            </strong>
            <h2 className="text-red text-[20px] font-bold">{posts?.length}</h2>
            <div className="flex justify-between items-center">
              <Link to="/dashboard/posts-table">
                <button className="text-white text-[20px] hover:scale-105 duration-500 rounded-xl px-[15px] dark:text-[gray-dark] bg-green">
                  See all Posts
                </button>
              </Link>

              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white dark:bg-gray-dark-bg border-2 border-blue">
                <Link to="/dashboard/posts-table">
                  <HiOutlineDocumentDuplicate className="text-[25px] text-blue" />
                </Link>
              </div>
            </div>
          </div>
          {/* categories card */}
          <div className="w-[80%] lg:w-[45%] xl:w-[23%] h-[150px] bg-gray dark:bg-gray-dark rounded-xl flex flex-col justify-between border-2 border-gray-dark-text p-[15px] shadow-md">
            <strong className="text-[25px] text-gray-dark dark:text-gray">
              Categories
            </strong>
            <h2 className="text-red text-[20px] font-bold">
              {allCategories?.length}
            </h2>
            <div className="flex justify-between items-center">
              <Link to="/dashboard/categories-table">
                <button className="text-white text-[20px] hover:scale-105 duration-500 rounded-xl px-[10px] dark:text-[gray-dark] bg-green">
                  See all Categories
                </button>
              </Link>

              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white dark:bg-gray-dark-bg border-2 border-blue">
                <Link to="/dashboard/categories-table">
                  <TbCategory2 className="text-[25px] text-blue" />
                </Link>
              </div>
            </div>
          </div>
          {/* comments card */}
          <div className="w-[80%] lg:w-[45%] xl:w-[23%] h-[150px] bg-gray dark:bg-gray-dark rounded-xl flex flex-col justify-between border-2 border-gray-dark-text p-[15px] shadow-md">
            <strong className="text-[25px] text-gray-dark dark:text-gray">
              Comments
            </strong>
            <h2 className="text-red text-[20px] font-bold">
              {allComments?.length}
            </h2>
            <div className="flex justify-between items-center">
              <Link to="/dashboard/comments-table">
                <button className="text-white text-[20px] hover:scale-105 duration-500 rounded-xl px-[10px] dark:text-[gray-dark] bg-green">
                  See all Comments
                </button>
              </Link>
              <div className="w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-white dark:bg-gray-dark-bg border-2 border-blue">
                <Link to="/dashboard/comments-table">
                  <VscCommentDiscussion className="text-[25px] text-blue" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* New Category Section */}
        <div className="w-full flex justify-center items-center">
          <div className="w-[90%] md:w-[80%] xl:w-[50%] bg-gray dark:bg-gray-dark rounded-xl flex flex-col justify-center border-2 border-gray-dark-text px-[15px] shadow-md mb-[15px]">
            <strong className="mb-[10px] text-[25px] text-gray-dark dark:text-gray ">
              Add new Category
            </strong>
            <form onSubmit={AddCategorySubmitHandler}>
              <label
                htmlFor="category"
                className="mb-[5px] block text-gray-dark dark:gray-dark-i text-[16px]"
              >
                Category title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="mb-[20px] outline-none w-[100%] rounded-lg px-[15px] py-[5px] "
                placeholder="category title"
                id="category"
              />
              <button
                type="submit"
                className="text-white mx-auto text-[20px] w-[100%] hover:scale-105 duration-500 rounded-lg px-[10px] dark:text-[gray-dark] bg-green mb-[15px]"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardMain;
