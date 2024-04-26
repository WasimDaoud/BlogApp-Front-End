import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import Categories from "../components/Categories";
import PostsList from "../components/PostsList";

import { useDispatch, useSelector } from "react-redux";
import { GetPostsByCategory } from "../Redux/apiCalls/PostsApiCalls";

import { RotatingLines } from "react-loader-spinner";

const Category = () => {
  const { postsCat, post } = useSelector((state) => state.posts);
  const pages = postsCat.length;
  const dispatch = useDispatch();

  const { category } = useParams();

  useEffect(() => {
    dispatch(GetPostsByCategory(category));
  }, [category, post?.likes?.length]);

  return (
    <div className="w-full h-full bg-white dark:bg-black">
      <div className="max-w-[1600px] mx-auto p-[15px] rounded-xl">
        {postsCat?.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[30px] font-bold dark:text-gray text-gray-dark mb-[30px] mt-[100px]">
              not posts in this category
            </h1>
            <Link
              className="text-[25px] font-bold text-center dark:text-gray text-gray-dark mb-[400px] hover:text-blue dark:hover:text-blue hover:scale-105 duration-1000 border-2 border-blue p-[10px] rounded-xl"
              to="/posts"
            >
              See another Posts
            </Link>
          </div>
        ) : !postsCat ? (
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
              <PostsList posts={postsCat} />
            </div>
            {/* Categories */}
            <div className="xl:w-[25%]">
              <Categories />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Category;
