import { useNavigate, useParams } from "react-router-dom";

import React, { useEffect } from "react";

import HomeUserInfo from "../components/HomeUserInfo";
import PostsList from "../components/PostsList";

import { useSelector, useDispatch } from "react-redux";
import { GetProfileUser } from "../Redux/apiCalls/ProfileApiCalls";
import { GetSingleUserPosts } from "../Redux/apiCalls/PostsApiCalls";
import { DeleteProfile } from "../Redux/apiCalls/ProfileApiCalls";

import { RotatingLines } from "react-loader-spinner";

import { commentActions } from "../Redux/Slices.js/CommentSlice";
import { userActions } from "../Redux/Slices.js/UserSlice";
import { authActions } from "../Redux/Slices.js/authSlice";

import swal from "sweetalert";

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.profile);
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { ProfilePosts } = useSelector((state) => state.posts);
  const { comment } = useSelector((state) => state.comment);
  const { commentIsDeleted, commentIsUpdated } = useSelector(
    (state) => state.comment
  );

  const DeleteProfileHandler = () => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteProfile(state.user?.user?._id));
        dispatch(userActions.setProfileIsDeleted(true));
        dispatch(authActions.logout());
        swal("Your Profile has been deleted successfully !", {
          icon: "success",
        });
        navigate("/");
      } else {
        swal("Your Profile is safe!");
      }
    });
  };

  useEffect(() => {
    dispatch(GetProfileUser(params.id));
    dispatch(GetSingleUserPosts(params.id));
    dispatch(commentActions.setCommentIsDeleted(false));
    dispatch(userActions.setProfileIsDeleted(false));
  }, [
    post?.likes?.length,
    post?._id,
    params.id,
    comment?._id,
    commentIsDeleted,
    commentIsUpdated,
  ]);

  return (
    <div className="w-full bg-white dark:bg-black profile-bg ">
      {/* USER INFO */}
      <HomeUserInfo user={state.user?.user} />
      <div className="max-w-[1500px] mx-auto">
        {/* latest posts */}
        <h1 className="md:text-[40px] text-[30px] font-bold underline dark:text-gray text-gray-dark-bg pb-[30px]">
          {localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).user.userName
            : state.user?.user.userName}{" "}
          posts
        </h1>
        {ProfilePosts.length === 0 ? (
          <h1 className="flex justify-center items-center text-[30px] font-bold text-gray-dark dark:text-gray">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </h1>
        ) : (
          <PostsList posts={ProfilePosts} />
        )}
        {user?.user?._id == state.user?.user?._id || user?.user?.isAdmin ? (
          <button
            onClick={DeleteProfileHandler}
            className="text-[20px] md:text-[25px] py-[5px] px-[10px] duration-1000 text-red border-2 border-red hover:border-white hover:text-white hover:bg-red rounded-xl m-[25px]"
          >
            Delete Profile
          </button>
        ) : (
          <button className="py-[5px] px-[10px] m-[25px]"></button>
        )}
      </div>
    </div>
  );
};

export default Profile;
