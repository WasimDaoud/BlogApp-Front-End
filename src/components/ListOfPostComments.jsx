import React, { useEffect } from "react";
import Comment from "../components/Comment";

const ListOfPostComments = ({ post }) => {
  return (
    <div className="overflow-auto">
      <strong className="text-[20px] underline md:text-[25px] text-gray-dark-text dark:text-gray-dark-i my-[20px] px-[20px] md:px-[35px]">
        Post Comments
      </strong>
      <div>
        {post?.comments?.map((comment) => (
          <>
            <Comment key={comment._id} comment={comment} />
          </>
        ))}
      </div>
    </div>
  );
};

export default ListOfPostComments;
