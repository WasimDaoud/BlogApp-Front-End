import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardLink from "../components/DashBoardLink";

import swal from "sweetalert" ;


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
const CommentsTable = () => {
    // view-Profile-Handler
    const viewCommentHandler = () => {
      console.log("profile viewed successfully");
    };
  
    const DeleteCommentHandler = () => {
      swal({
        title: "Are you sure ?",
        text: "Once deleted, you will not be able to recover this Comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Your Comment has been deleted successfully !", {
            icon: "success",
          });
        } else {
          swal("Your Comment is safe!");
        }
      });
      console.log("Comment Deleted successfully");
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
          <strong className="underline dark:text-gray text-[30px]">Comments</strong>
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
                    Comment Title
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
                    <td className="px-2 py-4 whitespace-nowrap w-[20%]">
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
                    <td className="w-[20%]">
                      <div className="text-sm text-gray-500">
                        {person.email}
                      </div>
                    </td>
                    {/* Action ( show-Profile & delete-Profile ) */}
                    <td className="md:px-2 py-4   w-[50%] text-center">
                      <button onClick={viewCommentHandler} className="py-[5px] mx-[10px] md:my-0 my-[10px] px-[5px] md:px-[10px] rounded-xl bg-green text-white">
                        View Comment
                      </button>
                      <button onClick={DeleteCommentHandler} className="py-[5px] px-[5px] md:px-[10px] rounded-xl bg-red text-white">
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
