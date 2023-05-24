import React from "react";

import swal from "sweetalert";

import DashBoardLink from "../components/DashBoardLink";
import DashBoardSideBar from "../components/DashBoardSideBar";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image: "https://bit.ly/33HnjK0",
  },
  {
    name: "John Doe",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Tester",
    email: "john.doe@example.com",
    image: "https://bit.ly/3I9nL2D",
  },
  {
    name: "Veronica Lodge",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: " Software Engineer",
    email: "veronica.lodge@example.com",
    image: "https://bit.ly/3vaOTe1",
  },
  // More people...
];

const PostsTable = () => {

    // view-Profile-Handler
    const viewPostHandler = () => {
      console.log("posts viewed successfully");
    };
  
    // delete-post-handler
    const DeletePostHandler = () => {
      swal({
        title: "Are you sure ?",
        text: "Once deleted, you will not be able to recover this Post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("this Post has been deleted successfully !", {
            icon: "success",
          });
        } else {
          swal("this Post is safe!");
        }
      });
      console.log("Post Deleted successfully");
    };
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
                      className="w-[25%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="w-[25%] px-2 py-3 text-center text-md font-bold text-gray-dark uppercase tracking-wider"
                    >
                      Post Title
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
                  {people.map((person) => (
                    <tr
                      className="hover:bg-blue duration-700 hover:cursor-pointer w-full"
                      key={person.email}
                    >
                      {/* Count */}
                      <td className="px-2 py-4 w-[10%]">
                        <div className="flex items-center justify-center">
                          count
                        </div>
                      </td>
                      {/* User ( image & name)*/}
                      <td className="px-2 py-4 whitespace-nowrap w-[25%]">
                        <div className="flex items-center">
                          {/* user image */}
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={person.image}
                              alt=""
                            />
                          </div>
                          {/* user image */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* User Email */}
                      <td className="w-[25%]">
                        <div className="text-sm text-gray-500">
                          {person.email}
                        </div>
                      </td>
                      {/* Action ( show-Profile & delete-Profile ) */}
                      <td className="px-2 py-4   w-[40%] text-center">
                        <button onClick={viewPostHandler} className="py-[5px] mx-[10px] md:my-0 my-[10px] px-[5px] md:px-[10px] rounded-xl bg-green text-white">
                          View Post
                        </button>
                        <button onClick={DeletePostHandler} className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-red text-white">
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
