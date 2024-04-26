import React from "react";

import swal from "sweetalert";

import DashBoardLink from "../components/DashBoardLink";
import DashBoardSideBar from "../components/DashBoardSideBar";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { GetAllPosts, DeletePost } from "../Redux/apiCalls/PostsApiCalls";
import { PostsActions } from "../Redux/Slices.js/PostSlice";

const PostsTable = () => {
  const dispatch = useDispatch();

  const { posts, postIsDeleted } = useSelector((state) => state.posts);

  // delete-post-handler
  const DeletePostHandler = (id) => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeletePost(id));
        dispatch(PostsActions.setPostIsDeleted(true));
        swal("this Post has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("this Post is safe!");
      }
    });
  };

  useEffect(() => {
    dispatch(GetAllPosts());
    dispatch(PostsActions.setPostIsDeleted(false));
  }, [posts?.length, postIsDeleted]);

  return (
    <>
      <div className="dark:bg-black">
        {/* Dash board link */}
        <div className="lg:hidden">
          <DashBoardLink />
        </div>
        {/* Post-table */}
        <div className="flex">
          {/* DashBoard-SidBar */}
          <div className="lg:block hidden w-[35%] xl:w-[20%]">
            <DashBoardSideBar />
          </div>
          {/* Posts-table */}
          <div className="flex flex-col w-full min-h-[587px] mx-auto bg-gray pt-[30px] dark:bg-black lg:w-[80%] px-[10px]">
            <div className="shadow  w-full">
              <strong className="underline dark:text-gray text-[30px]">
                Posts
              </strong>
              <table className="w-full dark:text-gray mt-[20px]">
                {/* Head of table */}
                <thead className="bg-blue">
                  <tr>
                    <th
                      scope="col"
                      className="w-[10%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      Count
                    </th>
                    <th
                      scope="col"
                      className="w-[35%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="w-[15%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      Post Category
                    </th>
                    <th
                      scope="col"
                      className=" w-[40%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                {/* Body of Table */}
                <tbody className="bg-white dark:bg-gray-dark-bg divide-y divide-gray-200 w-full">
                  {posts?.map((post, index) => (
                    <tr
                      className="hover:bg-blue divide-x duration-700 w-full"
                      key={post?._id}
                    >
                      {/* Count */}
                      <td className="px-2 py-4 w-[10%]">
                        <div className="flex items-center justify-center">
                          {index}
                        </div>
                      </td>
                      {/* User ( image & name)*/}
                      <td className=" py-4 whitespace-nowrap w-[35%] ">
                        <Link
                          to={`/profile/${post?.user?._id}`}
                          className="flex items-center pl-[40px]"
                        >
                          {/* user image */}
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={post?.user?.profilePhoto?.url}
                              alt=""
                            />
                          </div>
                          {/* user Name */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {post?.user?.userName}
                            </div>
                          </div>
                        </Link>
                      </td>
                      {/* POST CATEGORY */}
                      <td className="w-[10%] text-center">
                        <div className="text-sm text-gray-500">
                          {post?.category}
                        </div>
                      </td>
                      {/* Action ( show-Profile & delete-Profile ) */}
                      <td className="px-2 py-4   w-[45%] text-center">
                        <Link
                          to={`/posts/${post?._id}`}
                          className="py-[5px] mx-[10px] md:my-0 my-[10px] px-[5px] md:px-[10px] rounded-xl bg-green text-white"
                        >
                          View Post
                        </Link>
                        <button
                          onClick={() => DeletePostHandler(post?._id)}
                          className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-red text-white"
                        >
                          Delete Post
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsTable;
