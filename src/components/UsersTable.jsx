import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardLink from "../components/DashBoardLink";

import swal from "sweetalert" ;

import { useDispatch , useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { GetAllUsers } from "../Redux/apiCalls/UserApiCalls";
import { DeleteProfile } from "../Redux/apiCalls/ProfileApiCalls";
import { userActions } from "../Redux/Slices.js/UserSlice";

const UsersTable = () => {

  const dispatch = useDispatch();

  const { users , profileIsDeleted } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(userActions.setProfileIsDeleted(false));
  },[ users?.length , profileIsDeleted ]);

  const DeleteUserHandler = (id) => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteProfile(id));
        dispatch(userActions.setProfileIsDeleted(true));
        swal("this Profile has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("this Profile is safe!");
      }
    });
  };

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
              Users
            </strong>
            <table className="w-full dark:text-gray mt-[20px] shadow-md">
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
                    Email
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
                {users?.map((user,index) => (
                  <tr
                    className="hover:bg-blue divide-x duration-700 w-full"
                    key={user?._id}
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
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user?.profilePhoto?.url}
                            alt="userImage"
                          />
                        </div>
                        {/* user Name */}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user?.userName}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* User Email */}
                    <td className="w-[20%]">
                      <div className="text-sm text-gray-500 px-[10px]">
                        {user?.email}
                      </div>
                    </td>
                    {/* Action ( show-Profile & delete-Profile ) */}
                    <td className="md:px-2 py-4   w-[50%] text-center">
                      <Link
                        to={`/profile/${user?._id}`}
                        className="py-[5px] mx-[10px] md:my-0 my-[10px] px-[5px] md:px-[10px] rounded-xl bg-green text-white"
                      >
                        View Profile
                      </Link>
                      <button onClick={()=>DeleteUserHandler(user?._id)} className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-red text-white">
                        Delete User
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

export default UsersTable;
