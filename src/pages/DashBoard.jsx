import React, { useEffect } from "react";

import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardMain from "../components/DashBoardMain";

// import { useDispatch , useSelector } from "react-redux";
// import { userActions } from "../Redux/Slices.js/UserSlice";


const DashBoard = () => {

  // const dispatch = useDispatch();

  // const { users } = useSelector(state => state.user);

  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // },[users?.length]);



  return (
    <div className="w-full bg-white dark:bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex">
          {/* DashBoard-SideBar */}
          <div className="w-[35%] xl:w-[20%]">
            <DashBoardSideBar />
          </div>
          {/* DashBoard-Main-Section */}
          <div className="w-[65%] xl:w-[80%]">
            <DashBoardMain />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
