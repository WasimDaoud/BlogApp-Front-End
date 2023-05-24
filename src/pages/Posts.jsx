import React, { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { GetPostsCount, getPosts } from "../Redux/apiCalls/PostsApiCalls";
import { GetAllCategories } from "../Redux/apiCalls/CategoryApiCalls";

import { RotatingLines } from "react-loader-spinner";

import { commentActions } from "../Redux/Slices.js/CommentSlice";

const Posts = (props) => {
  const dispatch = useDispatch();

  const { postsCount, posts, post, postIsDeleted } = useSelector(
    (state) => state.posts
  );
  const { allCategories } = useSelector((state) => state.category);
  const { comment } = useSelector((state) => state.comment);
  const { commentIsDeleted, commentIsUpdated } = useSelector(
    (state) => state.comment
  );

  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(postsCount / 3);

  useEffect(() => {
    window.scrollTo("0px", "0px");
    dispatch(GetPostsCount());
  }, []);

  useEffect(() => {
    window.scrollTo("0px", "0px");
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPosts(currentPage));
    dispatch(GetAllCategories());
    dispatch(commentActions.setCommentIsDeleted(false));
    dispatch(commentActions.setCommentIsUpdated(false));
  }, [
    post?.likes?.length,
    post?._id,
    currentPage,
    postIsDeleted,
    allCategories?.length,
    post?.comments?.length,
    comment?._id,
    commentIsDeleted,
    commentIsUpdated,
  ]);

  return (
    <div className="w-full h-full bg-white dark:bg-black">
      <div className="max-w-[1600px] mx-auto p-[15px] rounded-xl">
        {/* posts show control */}
        {posts.length === 0 ? (
          <h1 className="flex justify-center items-center text-[30px] font-bold text-gray-dark dark:text-gray">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </h1>
        ) : (
          <section className="flex">
            {/* Posts */}
            <div className="xl:w-[75%] dark:text-gray-dark-i">
              <PostsList posts={posts} />
            </div>
            {/* Categories */}
            <div className="xl:w-[25%]">
              <Categories />
            </div>
          </section>
        )}
        {/* Pagination */}
        {posts.length > 0 ? (
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Posts;
