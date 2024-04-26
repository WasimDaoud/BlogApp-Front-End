import { BiLike } from "react-icons/bi";
import { FaBars, FaImages, FaRegWindowClose } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { AiTwotoneLike } from "react-icons/ai";

import { toast } from "react-toastify";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import swal from "sweetalert";

import NewComment from "../components/NewComment";
import ListOfPostComments from "../components/ListOfPostComments";
import UpdatePost from "../components/UpdatePost";

import { useDispatch, useSelector } from "react-redux";
import {
  ToggleLikePost,
  GetSinglePost,
  UpdatePostImage,
  DeletePost,
} from "../Redux/apiCalls/PostsApiCalls";
import { PostsActions } from "../Redux/Slices.js/PostSlice";

import Moment from "react-moment";

const Post = (props) => {
  const params = useParams();
  const idParam = params.id;

  const dispatch = useDispatch();
  const { setPostIsDeleted } = useSelector((state) => state.posts);

  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.posts);
  const { comment } = useSelector((state) => state.comment);

  const [updateIcon, setUpdateIcon] = useState(false);
  const [image, setImage] = useState(null);
  const [newCommentModal, setNewCommentModal] = useState(false);
  const [UpdatePostModal, setUpdatePostModal] = useState(false);

  // Delete-Post handler
  const PostDeleteHandler = () => {
    swal({
      title: "Are you sure ?",
      text: "Once deleted, you will not be able to recover this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeletePost(props.post?._id));
        dispatch(PostsActions.setPostIsDeleted(false));
        swal("Your Post has been deleted successfully !", {
          icon: "success",
        });
      } else {
        swal("Your Post is safe!");
      }
    });
  };

  // Image-Upload Handler
  const imgUploadHandler = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("You must Select a Picture before");
    }
    const formData = new FormData();
    formData.append("image", image);
    dispatch(UpdatePostImage(formData, props?.post?._id));
  };

  useEffect(() => {
    dispatch(PostsActions.setPost(props.post));
  }, [props.post?._id, setPostIsDeleted, props.post?.comments?.length]);

  // ToggleLike-post handler
  const likeHandle = () => {
    dispatch(PostsActions.clearPost());
    dispatch(PostsActions.setPost(props.post));
    dispatch(ToggleLikePost(props.post?._id));
    dispatch(GetSinglePost(props.post?._id));
  };

  return (
    <div className="w-full rounded-xl mb-[70px] bg-gray h[100vh] dark:bg-gray-dark relative shadow-md">
      {/* Post details ( post-Imag & author & user-Image & title & description & date) */}
      <div>
        <div className="flexBetween p-[10px]">
          {/* image & Author */}
          <div className="flexBetween gap-[15px]">
            <div className="w-[35px] md:w-[50px] h-[35px] md:h-[50px] rounded-full cursor-pointer hover:scale-110 duration-500">
              <Link to={`/profile/${props.post?.user?._id}`}>
                <img
                  className="w-full h-full rounded-full"
                  src={props.post?.user?.profilePhoto?.url}
                  alt="..."
                />
              </Link>
            </div>
            {/* user-Name */}
            <div className=" dark:text-gray-dark-i cursor-pointer hover:scale-110 duration-500">
              <Link to={`/profile/${props.post?.user?._id}`}>
                <div className="text-[20px] md:text-[25px] text-green">
                  {props.post?.user?.userName}
                </div>
              </Link>
            </div>
          </div>
          {/* title */}
          <div>
            <h1 className="font-bold text-[20px] md:text-[25px] text-blue">
              {props.post?.title}
            </h1>
          </div>
          {/* date */}
          <div>
            <h1 className="text-green dark:text-green text-[15px] md:text-[20px]">
              <Moment fromNow ago>
                {props.post?.createdAt}
              </Moment>
              {` ago`}
            </h1>
          </div>
        </div>

        {/* post image */}
        <div className="w-full h-[450px] flex justify-center">
          <img
            src={image ? URL.createObjectURL(image) : props.post?.image?.url}
            className="dark:text-gray-dark-i w-[100%] md:w-[60%] h-[100%] rounded-xl"
            alt="..."
          />
        </div>

        <hr className="text-white dark:text-gray-dark-bg"></hr>
        {/* post description */}
        <div className="w-full p-[10px]">
          <div className="flexBetween">
            {/* description */}
            <h2 className="font-bold text-orange text-[20px] underline">
              {props.post?.description}
            </h2>
            {/* category */}
            <Link to={`/category/${props.post?.category}`}>
              <h1 className="bg-orange border-2 border-orange dark:border-yellow dark:bg-orange dark:text-gray-dark-i text-[20px] rounded-xl px-[7px] text-yellow hover:scale-105 duration-1000">
                {props.post?.category}
              </h1>
            </Link>
          </div>

          {/* description control */}
          {idParam ? (
            <div>
              <p className="text-[20px] mt-[20px] dark:text-gray-dark-i">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
              </p>
            </div>
          ) : (
            <div className="flex">
              <p className="text-[20px] mt-[20px] readMore dark:text-gray-dark-i">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                nihil accusamus sint earum maxime, et necessitatibus suscipit
                libero repudiandae quasi! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. In nihil accusamus sint earum
                maxime, et necessitatibus suscipit libero repudiandae quasi!
              </p>
            </div>
          )}
          {/* read more */}
          {!idParam ? (
            <div className="sm:w-[20%] mt-[10px] mx-auto bg-transparent text-center text-[25px] text-blue  dark:text-blue cursor-pointer hover:scale-110 duration-1000">
              <Link
                to={`/posts/${props.post?._id}`}
                className="text-[20px] md:text-[25px]"
              >
                Read More...
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr className="mb-[10px] text-white dark:text-gray-dark-bg"></hr>
      {}

      {/* Icons */}
      <div className="flexBetween px-[15px] pb-[15px] relative">
        {/* Like */}
        <div className="flexBetween gap-[10px]">
          {props.post?.likes?.find((item) => item._id == user?.user?._id) ||
          props.post?.likes?.find((item) => item == user?.user?._id) ? (
            <AiTwotoneLike
              onClick={likeHandle}
              className="text-blue md:text-[40px] text-[30px] hover:scale-110 duration-500 cursor-pointer"
            />
          ) : (
            <BiLike
              onClick={likeHandle}
              className="text-black dark:text-gray  md:text-[40px] text-[30px] hover:scale-110 duration-500 cursor-pointer"
            />
          )}
          <h1 className="text-[20px] dark:text-gray-dark-i font-bold pr-[27px]">
            <span className="text-blue font-bold">
              {props.post?.likes?.length}
            </span>{" "}
            Likes
          </h1>
        </div>
        {/* Update bar Icon */}
        {/* show bar icon if user is logged in or user is admin */}
        {props.post?.user?._id === user?.user?._id || user?.user?.isAdmin ? (
          <div>
            <FaBars
              onClick={() => {
                setUpdateIcon(!updateIcon);
              }}
              className="text-blue text-[22px] lg:text-[30px] cursor-pointer"
            />
          </div>
        ) : (
          ""
        )}
        {/* show a new comment model icon */}
        <div className="flexBetween gap-[10px]">
          <div className="text-[20px]  dark:text-gray-dark-i font-bold">
            <span className="text-green font-bold">
              {props.post?.comments?.length}
            </span>{" "}
            comments
          </div>
          <BsPencilSquare
            onClick={() => {
              setNewCommentModal(true);
            }}
            className="text-green md:text-[32px] text-[26px] hover:scale-110 duration-500 cursor-pointer "
          />
        </div>
        {/* new comment modal */}
        {newCommentModal ? (
          <div className="bgModal">
            <div className="modal xl:w-[45%] lg:w-[60%] w-[75%] h-[95%] bg-white dark:bg-gray-dark">
              {/* close button */}
              <FaRegWindowClose
                onClick={() => {
                  setNewCommentModal(false);
                }}
                className="sticky text-[35px] text-red cursor-pointer top-0"
              />
              {/* write new comment  */}
              <NewComment
                setNewCommentModal={setNewCommentModal}
                post={props.post}
              />
              {/* List of this post comments */}
              {props.post.comments.length === 0 ? (
                <h1 className="text-center text-gray-dark text-orange dark:text-gray font-bold mt-[100px]">
                  no comments yet
                </h1>
              ) : (
                <ListOfPostComments post={props.post} />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Update post modal */}
        {UpdatePostModal ? (
          <div className="bgModal flex">
            <div className="modal xl:w-[45%] lg:w-[60%] w-[75%] h-[72%] bg-white dark:bg-gray-dark">
              {/* close button */}
              <FaRegWindowClose
                onClick={() => {
                  setUpdatePostModal(false);
                }}
                className="absolute left-[5px] text-[35px] top-[5px] text-red cursor-pointer"
              />
              {/* Update-Post component */}
              <UpdatePost post={props.post} postId={props.post?._id} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/*Control of update section */}
      {/* JUST POST OWNER CAN SEE CHANGE-IMAGE-POST ICON & UPDATE ICON */}
      {updateIcon ? (
        <div className="clip-show z-[2] duration-1000 absolute left-0 bottom-[-62px] w-full bg-gray dark:bg-gray-dark rounded-xl">
          <div className="w-full flex justify-center items-center gap-[150px] py-[20px]">
            {props.post?.user?._id === user?.user?._id ? (
              <>
                {/* select new image */}
                <form className="flex gap-2" onSubmit={imgUploadHandler}>
                  <label
                    htmlFor="image"
                    className="md:text-[35px] text-[20px] text-gray-dark cursor-pointer"
                  >
                    <FaImages className="md:text-[35px] text-[25px] text-green cursor-pointer" />
                  </label>
                  <input
                    id="image"
                    className="hidden"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  {/* upload */}
                  <button
                    type="submit"
                    className="text-[15px] px-[10px] bg-gray dark:bg-gray-dark-bg dark:text-green border-2 border-green rounded-xl hover:bg-blue hover:border-white hover:text-white hover:dark:bg-blue dark:hover:border-white duration-500"
                  >
                    Upload
                  </button>
                </form>
                {/* Delete Post */}
                <div className="ml-[-75px]">
                  <MdDelete
                    onClick={PostDeleteHandler}
                    className="text-red cursor-pointer text-[30px] md:text-[40px]"
                  />
                </div>
                {/* Update Post icon ( title , description , category ) */}
                <div className="flex gap-[5px]">
                  <abbr title="Update Post">
                    <MdEditDocument
                      id="update"
                      className="text-green cursor-pointer text-[30px] md:text-[37px]"
                      onClick={() => {
                        setUpdatePostModal(true);
                      }}
                    />
                  </abbr>
                </div>
              </>
            ) : (
              <>
                {/* Delete Post */}
                <div>
                  <MdDelete
                    onClick={PostDeleteHandler}
                    className="text-red cursor-pointer text-[30px] md:text-[40px]"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="clip-hide z-[2] duration-1000 absolute left-0 bottom-[-62px] w-full bg-gray dark:bg-gray-dark rounded-xl">
          <div className="w-full flex justify-center items-center gap-[150px] py-[20px]">
            {/* select new image */}
            {props.post?.user?._id === user?.user?._id ? (
              <>
                {" "}
                <form className="flex gap-2" onSubmit={imgUploadHandler}>
                  <label
                    htmlFor="file"
                    className="md:text-[35px] text-[20px] text-gray-dark cursor-pointer"
                  >
                    <FaImages className="md:text-[35px] text-[25px] text-green cursor-pointer" />
                  </label>
                  <input
                    id="file"
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                  {/* upload */}
                  <button
                    type="submit"
                    className="text-[15px] px-[10px] bg-gray dark:bg-gray-dark-bg dark:text-green border-2 border-green rounded-xl hover:bg-blue hover:border-white hover:text-white hover:dark:bg-blue dark:hover:border-white duration-500"
                  >
                    Upload
                  </button>
                </form>
                {/* Delete Post */}
                <div className="ml-[-75px]">
                  <MdDelete
                    onClick={PostDeleteHandler}
                    className="text-red cursor-pointer text-[30px] md:text-[40px]"
                  />
                </div>
                {/* Update Post icon ( title , description , category ) */}
                <div className="flex gap-[5px]">
                  <abbr title="Update Post">
                    <MdEditDocument
                      id="update"
                      className="text-green cursor-pointer text-[30px] md:text-[37px]"
                      onClick={() => {
                        setUpdatePostModal(true);
                      }}
                    />
                  </abbr>
                </div>
              </>
            ) : (
              <>
                {" "}
                {/* Delete Post */}
                <div>
                  <MdDelete
                    onClick={PostDeleteHandler}
                    className="text-red cursor-pointer text-[30px] md:text-[40px]"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
