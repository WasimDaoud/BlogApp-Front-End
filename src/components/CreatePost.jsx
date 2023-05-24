import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CreateNewPost } from "../Redux/apiCalls/PostsApiCalls";
import { useNavigate } from "react-router-dom";

import { GetAllCategories } from "../Redux/apiCalls/CategoryApiCalls";

import { RotatingLines } from "react-loader-spinner";

const CreatePost = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { lauding, postIsCreated } = useSelector((state) => state.posts);
  const { allCategories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (postIsCreated) {
      navigate("/");
    }
    dispatch(GetAllCategories());
  }, [navigate, postIsCreated, GetAllCategories?.length]);

  const formSubmit = (e) => {
    e.preventDefault();
    // validation
    if (title.trim() === "") {
      return toast.error("Title Field is Required");
    }
    if (category.trim() === "") {
      return toast.error("Category Field is Required");
    }
    if (description.trim() === "") {
      return toast.error("Description Field is Required");
    }
    if (!image) {
      return toast.error("File Field is Required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

    dispatch(CreateNewPost(formData));

    if (postIsCreated) {
      toast.success("Post has been Created Successfully");
    }

    setTitle("");
    setCategory("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="w-full h-full p-[15px] bg-gray  dark: dark:bg-black">
      <form
        className="w-[80%] border-2 border-blue rounded-xl my-[45px] bg-white lg:w-[65%] mx-auto text-center dark:bg-gray-dark"
        onSubmit={formSubmit}
      >
        <h1 className="text-center font-bold text-[30px] pt-[15px] mt-[11px] text-blue">
          Create Post
        </h1>
        {/* post title */}
        <div className="flexBetween py-[20px]">
          <input
            className="input dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* select category */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="input dark:text-gray-dark-i bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-gray-dark"
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
          rows="5"
          className="border-2 outline-none border-gray-dark-text dark:text-gray-dark-i dark:bg-gray-dark-bg my-[20px] w-[90%] rounded-xl p-[15px]"
          placeholder="Post Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        {/* upload image */}
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="w-[90%] my-[10px] mx-auto py-[15px] text-center bg-gray rounded-xl dark:bg-gray-dark-bg dark:text-white border-dashed border-2 cursor-pointer"
          >
            Select a Picture
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="mb-[15px] hidden outline-none px-[15px] py-[5px] bg-gray rounded-xl dark:bg-gray-dark-bg dark:text-white"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        {/* Submit Button */}
        <button
          className="input my-[13px] bg-gray  dark:bg-gray-dark-bg py-[10px] mx-auto px-[15px] rounded-xl text-blue dark:text-blue text-[25px] font-bold"
          type="submit"
        >
          {lauding ? (
            <h1 className="flex justify-center items-center text-[30px] font-bold text-gray-dark dark:text-gray">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}
              />
            </h1>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
