import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { useState } from "react";

import { UpdatingPost } from "../Redux/apiCalls/PostsApiCalls";
import { GetAllCategories } from "../Redux/apiCalls/CategoryApiCalls";

import { useDispatch , useSelector } from "react-redux";

const UpdatePost = ({ postId , post }) => {


  const dispatch = useDispatch();

  const { allCategories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post?.title);
  const [category, setCategory] = useState(post?.category);
  const [description, setDescription] = useState(post?.description);

  const UpdatePostSubmitHandler = (e) => {
    e.preventDefault();
    // validation
    if (
      title?.trim() === "" &&
      category?.trim() === "" &&
      description?.trim() === ""
    ) {
      return toast.error(" You didn't update any field ");
    }
    const data = {
      title,
      category,
      description,
    };
    dispatch(UpdatingPost(data, postId));
    setTitle("");
    setCategory("");
    setDescription("");
  };

  useEffect(()=>{
    dispatch(GetAllCategories());
  },[ allCategories , postId]);

  return (
    <div className="w-full h-full p-[15px] bg-gray  dark: dark:bg-black">
      <form
        className="w-[90%] border-2 border-blue rounded-xl my-[30px] bg-white lg:w-[90%] mx-auto text-center dark:bg-gray-dark"
        onSubmit={UpdatePostSubmitHandler}
      >
        <h1 className="text-center font-bold text-[27px] pt-[15px] mt-[11px] text-blue">
          Update Post
        </h1>
        {/* post title */}
        <div className="flexBetween py-[20px]">
          <input
            className="input text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* select category */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="input  text-[20px] md:text-[30px] dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
        >
          <option disabled value="">
            Select Category
          </option>
          {allCategories?.map((category) => {
            return <option value={category.title}>{category.title}</option>;
          })}
        </select>
        {/* Post Description */}
        <textarea
          rows="2"
          className=" text-[20px] md:text-[30px] border-2 outline-none border-gray-dark-text dark:text-gray-dark-i dark:bg-gray-dark-bg my-[20px] w-[90%] rounded-xl p-[15px]"
          placeholder="Post Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
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

export default UpdatePost;
