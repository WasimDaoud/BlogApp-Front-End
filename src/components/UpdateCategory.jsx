import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { categoryActions } from "../Redux/Slices.js/CategorySlice";
import { UpdateTheCategory } from "../Redux/apiCalls/CategoryApiCalls";

const UpdatingCategory = ({ setUpdateModal, category }) => {
  const dispatch = useDispatch();
  const { updateCategory } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");

  const UpdatedCategorytSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(categoryActions.setCategoryIsUpdated(false));
    if (!title) {
      return toast.error("You Must Make Some changing");
    }

    dispatch(UpdateTheCategory(updateCategory?._id, { title }));
    dispatch(categoryActions.setCategoryIsUpdated(true));
    setUpdateModal(false);
  };

  return (
    <div className="w-[90%] m-auto rounded-xl p-[25px] my-[15px] border-2 border-blue">
      {/* Update comment */}
      <strong className="underline text-[20px] md:text-[25px] text-blue dark:text-blue">
        Update Category
      </strong>
      {/* new-comment form */}
      <div className="bg-gray dark:text-gray-dark-i dark:bg-gray-dark-bg border-2 dark:border-gray-dark-i rounded-xl my-[20px]">
        <form className="flexBetween px-[15px]">
          {/* input field for Update category */}
          <input
            className="min-w-[200px] text-[20px]  dark:text-gray-dark-i input py-[10px]"
            placeholder="Update Category"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          {/* icon for submitting */}
          <abbr title="Update">
            <BsSendFill
              onClick={UpdatedCategorytSubmitHandler}
              className="md:text-[30px] text-[25px] hover:scale-110 duration-500 cursor-pointer text-blue"
            />
          </abbr>
        </form>
      </div>
      <hr className="text-2 mt-[40px] text-gray dark:text-gray-dark"></hr>
    </div>
  );
};

export default UpdatingCategory;
