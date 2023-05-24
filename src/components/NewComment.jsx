import React, { useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { useDispatch , useSelector } from "react-redux";

import { CreateComment } from "../Redux/apiCalls/CommentApiCalls";

const NewComment = ({post,setNewCommentModal}) => {

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const newCommentSubmitHandler = (e) => {
    e.preventDefault();
    if (!comment) {
      return toast.error("You Must Write Some thing");
    }
    const data = {
      "postId" : post?._id ,
      "text" : comment
    }
    dispatch(CreateComment( data ));
    setComment("");
    // setNewCommentModal(false);
  };

  return (
    <div className="sticky top-0 bg-gray border-gray-dark-text shadow-md dark:bg-gray-dark-bg w-[90%] rounded-xl mx-auto p-[25px] my-[15px] border-2 dark:border-gray-dark-i">
      {/* comment on post */}
      <strong className="underline text-[20px] md:text-[25px]  text-gray-dark-text dark:text-gray-dark-i">
        Comment on Post
      </strong>
      {/* new-comment form */}
      <div className="bg-white dark:text-gray-dark-i dark:bg-gray-dark-text border-2 dark:border-gray rounded-xl my-[10px]">
        <form className="flexBetween px-[15px]">
          {/* input field for write comment */}
          <input
            className="min-w-[200px] text-[20px] dark:text-gray-dark-i input py-[10px]"
            placeholder="write comment here"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
          {/* icon for submitting */}
          <abbr title="Send">
            <BsSendFill
              onClick={newCommentSubmitHandler}
              className="md:text-[30px] text-[25px] hover:scale-110 duration-500 cursor-pointer text-blue"
            />
          </abbr>
        </form>
      </div>
      <hr className="text-2 mt-[20px] text-gray dark:text-gray-dark"></hr>
    </div>
  );
};

export default NewComment;
