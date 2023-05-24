import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  return (
    <div>
      <ul className="flex justify-center items-center mb-[50px]">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          className={
            currentPage === 1
              ? "bg-gray w-[40px] h-[40px] text-[40px] font-bold rounded-xl ml-[5px] flex justify-center items-center p-[5px] dark:bg-gray-dark"
              : "bg-gray w-[40px] h-[40px] text-[40px] font-bold cursor-pointer rounded-xl ml-[5px] border-2 border-black hover:bg-blue flex justify-center items-center p-[5px] duration-500 dark:bg-blue"
          }
        >
          <GrFormPrevious />
        </button>
        {/* PAGES NUMBER */}
        {pagesArr.map((page) => (
          <li
            onClick={() => {
              setCurrentPage(page);
            }}
            key={page}
            className={
              currentPage === page
                ? "bg-blue w-[40px] h-[40px] text-[25px] font-bold cursor-pointer rounded-xl mx-[2px] border-2 border-black hover:bg-blue flex justify-center items-center p-[5px] duration-500 dark:border-blue dark:text-gray-dark-i"
                : "w-[40px] h-[40px] text-[25px] font-bold cursor-pointer rounded-xl mx-[2px] border-2 border-black hover:bg-blue flex justify-center items-center p-[5px] duration-500 dark:border-blue dark:text-gray-dark-i"
            }
          >
            {/* <Link to="/" className=""> */}
            {page}
            {/* </Link> */}
          </li>
        ))}
        {/* NEXT */}
        <button
          disabled={currentPage === pages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className={
            currentPage === pages
              ? "bg-gray w-[40px] h-[40px] text-[40px] font-bold rounded-xl ml-[5px] flex justify-center items-center p-[5px] dark:bg-gray-dark"
              : "bg-gray w-[40px] h-[40px] text-[40px] font-bold cursor-pointer rounded-xl ml-[5px] border-2 border-black hover:bg-blue flex justify-center items-center p-[5px] duration-500 dark:bg-blue"
          }
        >
          <GrFormNext className="dark:text-blue" />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
