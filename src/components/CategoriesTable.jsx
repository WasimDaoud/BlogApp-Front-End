import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardLink from "../components/DashBoardLink";
import UpdatingCategory from "../components/UpdateCategory";

import swal from "sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  GetAllCategories,
  DeleteCategory,
} from "../Redux/apiCalls/CategoryApiCalls";
import { categoryActions } from "../Redux/Slices.js/CategorySlice";

const CategoriesTable = () => {
  const dispatch = useDispatch();

  const { UpdateCategory } = useSelector((state) => state.category);
  const { allCategories, categoryIsDeleted, categoryIsUpdated } = useSelector(
    (state) => state.category
  );

  const [title, setTitle] = useState("");
  const [updateModal, setUpdateModal] = useState(false);

  // DELETE-CATEGORY
  const DeleteCategoryHandler = (id) => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteCategory(id));
        dispatch(categoryActions.setCategoryIsDeleted(true));
        swal("Your Category has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("Your Category is safe!");
      }
    });
  };

  // updateModalHandler
  const updateModalHandler = (category) => {
    dispatch(categoryActions.setUpdateCategory(category));
    setUpdateModal(true);
    console.log("category : ", category);
  };

  useEffect(() => {
    dispatch(GetAllCategories());
    dispatch(categoryActions.setCategoryIsDeleted(false));
    dispatch(categoryActions.setCategoryIsUpdated(false));
  }, [
    allCategories?.length,
    categoryIsUpdated,
    categoryIsDeleted,
    UpdateCategory?._id,
  ]);

  return (
    <div className="dark:bg-black">
      <div className="lg:hidden ">
        <DashBoardLink />
      </div>
      {/* categories-table */}
      <div className="flex w-full min-h-[587px] mx-auto dark:bg-black">
        <div className="lg:block hidden w-[35%] xl:w-[20%]">
          {/* DashBoard-SidBar */}
          <DashBoardSideBar />
        </div>
        {/* categories-table */}
        <div className="flex flex-col mx-auto bg-gray w-full pt-[30px] lg:w-[80%] dark:bg-black  px-[10px]">
          <div className="shadow  w-full">
            <strong className="underline dark:text-gray text-[30px]">
              Posts
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
                    Category Title
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
                {allCategories?.map((category, index) => (
                  <tr
                    className="hover:bg-blue divide-x duration-700 w-full"
                    key={category?._id}
                  >
                    {/* Count */}
                    <td className="px-2 py-4 w-[10%]">
                      <div className="flex items-center justify-center">
                        {index}
                      </div>
                    </td>
                    {/* User ( image & name)*/}
                    <td className="px-2 py-4 whitespace-nowrap  w-[40%]">
                      <div className="flex pl-[40px] items-center">
                        {/* user image */}
                        <Link
                          to={`/profile/${category?.user?._id}`}
                          className="flex-shrink-0 h-10 w-10"
                        >
                          <img
                            className="h-10 w-10 rounded-full"
                            src={category?.user?.profilePhoto?.url}
                            alt=""
                          />
                        </Link>
                        {/* user name */}
                        <div className="flex-shrink-0 h-10 w-10">
                          <h2 className="text-sm ml-[15px] lg:text-lg px-2">
                            {category?.user?.userName}
                          </h2>
                        </div>
                      </div>
                    </td>
                    {/* Category title */}
                    <td className="px-2 py-4 w-[10%]">
                      <div className="flex items-center justify-center">
                        {category?.title}
                      </div>
                    </td>
                    {/* Action ( Update & delete Category ) */}
                    <td className="md:px-2 py-4   w-[40%] text-center">
                      <button
                        onClick={() => updateModalHandler(category)} //UpdateCategoryHandler(category?._id)
                        className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-orange text-white"
                      >
                        Update
                      </button>
                      {updateModal ? (
                        <div className="bgModal">
                          <div className="modal bg-gray w-[70%] lg:w-[50%] h-[35%]">
                            <UpdatingCategory
                              setUpdateModal={setUpdateModal}
                              category={category}
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => DeleteCategoryHandler(category?._id)}
                        className="py-[5px] ml-[15px] px-[5px] md:px-[10px] rounded-xl bg-red text-white"
                      >
                        Delete
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

export default CategoriesTable;
