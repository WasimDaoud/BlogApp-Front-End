import React from "react";
import PostsList from "../components/PostsList";
import Categories from "../components/Categories";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Redux/apiCalls/PostsApiCalls";
import { GetAllUsers } from "../Redux/apiCalls/UserApiCalls";
import { GetAllCategories } from "../Redux/apiCalls/CategoryApiCalls";

import { commentActions } from "../Redux/Slices.js/CommentSlice";
import { userActions } from "../Redux/Slices.js/UserSlice";

import { RotatingLines } from "react-loader-spinner";

const Home2 = () => {
  const dispatch = useDispatch();

  const { posts, post } = useSelector((state) => state.posts);   
  const { allCategories } = useSelector((state) => state.category);
  const { comment } = useSelector((state) => state.comment);
  const { profileIsDeleted } = useSelector((state) => state.user);
  const { commentIsDeleted, commentIsUpdated } = useSelector(
    (state) => state.comment
  );
  

  useEffect(() => {
    window.scroll("0px", "0px");
    dispatch(GetAllUsers());
  }, []);

  useEffect(() => {
    dispatch(getPosts(1));
    dispatch(GetAllUsers());
    dispatch(GetAllCategories());
    dispatch(commentActions.setCommentIsDeleted(false));
    dispatch(commentActions.setCommentIsUpdated(false));
    dispatch(userActions.setProfileIsDeleted(false));
  }, [
    post?.likes?.length,
    post?._id,
    post?.comments?.length,
    comment?._id,
    commentIsDeleted,
    commentIsUpdated,
    profileIsDeleted,
    allCategories?.length,
  ]);

  return (
    <div className=" w-full bg-white h-full dark:bg-black">
      <h1 className="h-[300px] hero dark:bg-transparent font-bold text-[45px] flex justify-center  text-white items-center">
        {/* Wasim Blog */}
      </h1>
      <div className=" max-w-[1600px] mx-auto p-[15px] rounded-xl">
        {/* Latest Posts */}
        <h1 className="text-[35px] font-bold underline dark:text-gray text-gray-dark pb-[30px]">
          Latest Posts
        </h1>
        {posts.length === 0 ? (
          <h1 className="flex bg-transparent justify-center items-center text-[30px] font-bold text-gray-dark dark:text-gray">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </h1>
        ) : (
          <>
            <div className=" text-[35px] text-gray-dark-bg w-full  flex">
              <div className="xl:w-[75%]">
                <PostsList posts={posts} />
              </div>
              <div className="xl:w-[25%]">
                <Categories />
              </div>
            </div>
            {/* See all posts */}
            <div className="w-full border-2 border-blue font-bold text-blue hover:bg-blue hover:dark:bg-blue hover:text-white hover:dark:text-white rounded-xl cursor-pointer text-center p-[10px] text-[30px] mb-[30px] duration-500">
              <Link to="/posts" className="w-full">
                See All Posts
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home2;
