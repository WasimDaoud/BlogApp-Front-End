import React, { useEffect, useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import swal from "sweetalert";

import Moment from "react-moment";

import UpdateComment from "../components/UpdateComment";

import { useDispatch } from "react-redux";

import { DeleteComment } from "../Redux/apiCalls/CommentApiCalls";
import { commentActions } from "../Redux/Slices.js/CommentSlice";

const Comment = (props) => {
  const [commentModal, setCommentModal] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.user);

  const userFound = users?.find((user) => user._id == props.comment?.user);

  const DeleteCommentHandler = () => {
    dispatch(commentActions.setCommentIsDeleted(false));
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteComment(props.comment?._id));
        dispatch(commentActions.setCommentIsDeleted(true));
        swal("Your Comment has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("Your Comment is safe!");
      }
    });
  };

  const foundPost = posts?.find((post) => {
    return post?._id === props.comment.postId;
  });

  return (
    <div className="border-2 bg-gray dark:bg-gray-dark-bg shadow-md  border-gray-dark-text p-[15px] w-[90%] mx-[auto] rounded-xl  mt-[15px] mb-[30px]">
      {/* User & date */}
      <div className="flexBetween">
        {/* User */}
        <div className="flex gap-[10px]">
          <Link
            to={`/profile/${props.comment.user}`}
            className="w-[40px] md:w-[50px] md:h-[50px] h-[40px] rounded-full"
          >
            <img className="rounded-full" src={userFound?.profilePhoto?.url} />
          </Link>
          <Link
            to={`/profile/${props.comment.user}`}
            className="text-[20px] text-blue md:text-[25px]"
          >
            {props.comment.userName}
          </Link>
        </div>
        {/* Date */}
        <div className="text-green text-[15px] md:text-[18px]">
          <Moment fromNow ago>
            {props.comment.createdAt}
          </Moment>{" "}
          ago
        </div>
      </div>
      <hr className="text-4 mt-[10px] mb-[20px] text-gray-dark-i dark:text-gray-dark px-[15px]"></hr>
      {/* Description */}
      <div className="text-[15px] md:text-[20px] font-bold text-black dark:text-white">
        {props.comment.text}
      </div>
      {/* Icons */}
      <div className="flex items-center flex-row-reverse gap-[25px] mt-[15px]">
        {/* update comment icon */}
        {/* just comment-owner can delete the comment  */}
        {props.comment?.user === user?.user?._id ? (
          <>
            <BsPencilSquare
              onClick={() => {
                setCommentModal(true);
              }}
              className="text-[25px] md:text-[35px] cursor-pointer text-green"
            />
          </>
        ) : (
          ""
        )}

        {/* delete comment icon */}
        {/* just comment-owner or admin can delete the comment  */}
        {props.comment?.user === user?.user?._id || user?.user?.isAdmin ? (
          <>
            {" "}
            <MdDelete
              onClick={DeleteCommentHandler}
              className="text-[30px] md:text-[40px] cursor-pointer text-red"
            />
          </>
        ) : (
          ""
        )}

        {/* control of comment modal */}
        {commentModal ? (
          <div className="bgModal">
            <div className="modal xl:w-[40%] lg:w-[55%] w-[70%] h-[45%] bg-white dark:bg-gray-dark-bg">
              <FaRegWindowClose
                onClick={() => {
                  setCommentModal(false);
                }}
                className="sticky text-red text-[35px] cursor-pointer  top-[10px] m-[10px]"
              />
              <UpdateComment
                comment={props.comment}
                setCommentModal={setCommentModal}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
