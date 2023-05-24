import React from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { GetSinglePost } from "../Redux/apiCalls/PostsApiCalls";

import { useDispatch, useSelector } from "react-redux";

import { commentActions } from "../Redux/Slices.js/CommentSlice";

const Details = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const { comment } = useSelector((state) => state.comment);
  const { commentIsDeleted , commentIsUpdated } = useSelector((state) => state.comment);

  const { id } = useParams();

  useEffect(() => {
    window.scroll("0px", "0px");
  }, [id]);

  useEffect(() => {
    dispatch(GetSinglePost(id));
    dispatch(commentActions.setCommentIsDeleted(false));
    dispatch(commentActions.setCommentIsUpdated(false));
  }, [id, comment?._id, post?.likes?.length, commentIsDeleted , commentIsUpdated]);

  return (
    <div className="w-full mx-auto h[100vh] dark:bg-black pt-[50px] pb-[70px] lg:px-[200px] xl:px-[300px]">
      {!post ? (
        <h1 className="flex justify-center items-center text-[30px] font-bold text-gray-dark dark:text-gray">
          Lauding...
        </h1>
      ) : (
        <Post post={post} />
      )}
    </div>
  );
};

export default Details;
