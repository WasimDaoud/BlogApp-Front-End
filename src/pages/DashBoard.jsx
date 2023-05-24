import React from "react";

import DashBoardSideBar from "../components/DashBoardSideBar";
import DashBoardMain from "../components/DashBoardMain";

const DashBoard = () => {
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
