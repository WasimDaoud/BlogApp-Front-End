import React, { useEffect } from "react";
import Post from "../components/Post";

import { useSelector } from "react-redux";

const PostsList = ({ posts }) => {

  const { comment } = useSelector(state => state.comment);

  useEffect(() => {
    window.scroll("0", "0");
  }, [comment?._id]);

  return (
    <div>
      <div className="text-[35px] w-full mt-[10px]">
        {/* loop on data */}
        {posts.map((post) => (
          <Post post={post} key={post?._id} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
