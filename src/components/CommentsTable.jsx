import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardLink from "../components/DashBoardLink";

import { Link } from "react-router-dom";

import swal from "sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  GetAllComments,
  DeleteComment,
} from "../Redux/apiCalls/CommentApiCalls";
import { commentActions } from "../Redux/Slices.js/CommentSlice";

const CommentsTable = () => {
  const dispatch = useDispatch();

  const { allComments, commentIsDeleted } = useSelector(
    (state) => state.comment
  );

  const DeleteCommentHandler = (id) => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteComment(id));
        dispatch(commentActions.setCommentIsDeleted(true));
        swal("Your Comment has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("Your Comment is safe!");
      }
    });
  };

  useEffect(() => {
    dispatch(GetAllComments());
    dispatch(commentActions.setCommentIsDeleted(false));
  }, [commentIsDeleted, allComments?.length]);

  return (
    <div className="dark:bg-black">
      <div className="lg:hidden ">
        <DashBoardLink />
      </div>
      {/* user-table */}
      <div className="flex w-full min-h-[587px] mx-auto dark:bg-black">
        <div className="lg:block hidden w-[35%] xl:w-[20%]">
          {/* DashBoard-SidBar */}
          <DashBoardSideBar />
        </div>
        {/* users-table */}
        <div className="flex flex-col mx-auto bg-gray w-full pt-[30px] lg:w-[80%] dark:bg-black  px-[10px]">
          <div className="shadow  w-full">
            <strong className="underline dark:text-gray text-[30px]">
              Comments
            </strong>
            <table className="w-full dark:text-gray shadow-md mt-[20px]">
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
                    className="w-[25%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="w-[25%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                  >
                    Comment text
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
                {allComments?.map((comment, index) => (
                  <tr
                    className="hover:bg-blue divide-x duration-700 w-full"
                    key={comment?._id}
                  >
                    {/* Count */}
                    <td className="px-2 py-4 w-[10%]">
                      <div className="flex items-center justify-center">
                        {index}
                      </div>
                    </td>
                    {/* User ( image & name)*/}
                    <td className="px-2 py-4 whitespace-nowrap w-[20%]">
                      <div className="flex items-center">
                        {/* user image */}
                        <Link
                          to={`/profile/${comment?.user?._id}`}
                          className="flex-shrink-0 h-10 w-10 mr-[15px]"
                        >
                          <img
                            className="h-10 w-10 rounded-full"
                            src={comment?.user?.profilePhoto?.url}
                            alt="userImage"
                          />
                        </Link>
                        {/* comment owner  */}
                        <div className="text-sm lg:text-lg text-gray-500">
                          {comment?.user?.userName}
                        </div>
                      </div>
                    </td>
                    {/* comment text */}
                    <td className="w-[20%]">
                      <div className="ml-4">
                        <div className="overflow-auto text-sm font-medium text-gray-900">
                          {`${comment?.text}`}
                        </div>
                      </div>
                    </td>
                    {/* Action ( show-Profile & delete-Profile ) */}
                    <td className="md:px-2 py-4   w-[50%] text-center">
                      <button
                        onClick={() => DeleteCommentHandler(comment?._id)}
                        className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-red text-white"
                      >
                        Delete Comment
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
  );
};

export default CommentsTable;
