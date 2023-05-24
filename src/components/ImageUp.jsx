import React from "react";

const ImageUp = () => {
  return (
    <form className="border-4 border-gray w-full h-[75px] p-[7px]">
      <input
        type="file"
        placeholder="chose"
        name="file"
        className="w-full h-full border-4 border-dotted border-gray"
      />
    </form>
  );
};

export default ImageUp;
