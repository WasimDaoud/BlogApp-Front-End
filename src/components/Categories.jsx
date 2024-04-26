import React, { useEffect } from "react";
// import { categories } from "../dummyData";
import { Link } from "react-router-dom";

import { GetAllCategories } from "../Redux/apiCalls/CategoryApiCalls";

import { useDispatch , useSelector } from "react-redux";

const Categories = () => {

  const dispatch = useDispatch();
  const { allCategories } = useSelector(state => state.category);

  useEffect(()=>{
    dispatch(GetAllCategories());
  },[ allCategories?.length ]);

  return (
    <div className="sticky top-[75px] w-full h-[0%] md:p-[10px] rounded-xl hidden xl:block">
      <div className="dark:bg-gray-dark rounded-xl p-[10px] bg-gray  ">
        {/* categories */}
        <h1 className="dark:text-gray-dark-i md:text-[30px] font-bold text-gray-dark-bg text-center pb-[10px]">
          Categories
        </h1>
        <hr className="mb-[30px] text-gray-dark-i"></hr>
        {allCategories?.map((item) => (
          <div
            key={item._id}
            className="w-full md:text-[25px] px-[10px] py-[3px] rounded-xl text-gray-dark bg-gray-dark-i dark:hover:bg-blue duration-700 dark:text-gray-dark-i hover:bg-blue my-[10px] cursor-pointer dark:bg-gray-dark-bg"
          >
            <Link to={`/category/${item.title}`}>{item.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
