import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineSpaceDashboard } from "react-icons/md";

const DashBoardLink = () => {
  return (
    <>
      {/* DashBoard Link */}
      <strong className="text-[25px] lg:text-[30px] pt-[30px] text-blue flex lg:gap-[5px] items-center justify-center underline">
        <MdOutlineSpaceDashboard className="text-[25px] lg:text-[35px]" />
        <Link to="/dashboard">Dashboard</Link>
      </strong>
    </>
  );
};

export default DashBoardLink;
