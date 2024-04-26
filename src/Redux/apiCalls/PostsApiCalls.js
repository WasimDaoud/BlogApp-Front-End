import { toast } from "react-toastify";
import { request } from "../../utility/Axios";
import { PostsActions } from "../Slices.js/PostSlice";

// GET POSTS BY PAGE-NUMBER FOR ( HOME & POSTS )PAGES
export function getPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/posts?pageNumber=${pageNumber}`);
      if (!data) {
        throw new Error("there is no response");
      }
      dispatch(PostsActions.getPosts(data));
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
}

// GET POSTS-COUNT
export function GetPostsCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      if (!data) {
        throw new Error("there is no response from server");
      }
      // console.log("response data are :",data);
      dispatch(PostsActions.getPostsCount(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };
}

// GET POSTS BY CATEGORY 
export function GetPostsByCategory(category){
  return async (dispatch)=>{
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      if(!data){
        throw new Error("no response from server")
      }
      dispatch(PostsActions.getPostsCat(data));

    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  }
}

// GET ALL POSTS 
export function GetAllPosts(){
  return async (dispatch)=>{
    try {
      const { data } = await request.get(`/api/posts`);
      if(!data){
        throw new Error("no response from server")
      }
      dispatch(PostsActions.getPosts(data));

    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  }
}


// GET SINGLE POSTS BY ID
export function GetSinglePost(PostId){
  return async (dispatch)=>{
    try {
      const { data } = await request.get(`api/posts/${PostId}`);
      if(!data){
        throw new Error("no response from server")
      }
      dispatch(PostsActions.setPost(data));

    } catch (error) {
      toast.error(error.response.data);
    }
  }
}

// Create New POST
export function CreateNewPost( newPost ){
  return async (dispatch,getState)=>{
    try {

      dispatch(PostsActions.setLauding());

      await request.post(`api/posts`, newPost , {
        headers : {
          Authorization : `Bearer ${getState().auth.user.token}`,
          "Content-Type" : "multipart/form-data"
        }
      });

      dispatch(PostsActions.setPostIsCreated());
      setTimeout(()=>{
        dispatch(PostsActions.clearPostIsCreated());
      },2000);


    } catch (error) {
      toast.error(error.response.data);
    }
  }
}

// GET POSTS BELONG TO SPECIFIC USER
export function GetSingleUserPosts(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?id=${userId}`);
      if (!data) {
        throw new Error("there is no response from server");
      }
      dispatch(PostsActions.getProfilePosts(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  };
}

// TOGGLE LIKE ON POST
export function ToggleLikePost(PostId) {
  return async (dispatch,getState) => {
    try {
      const { data } = await request.put(`/api/posts/like/${PostId}`, {} , {
        headers : {
          Authorization : `Bearer ${getState().auth?.user?.token}`
        }
      });
      if (!data) {
        throw new Error("there is no response from server");
      }
      dispatch(PostsActions.toggleLike(data));
    } catch (error) {
      toast.error(error.response?.data);
    }
  };
}

// UPDATE POST IMAGE
export function UpdatePostImage(newImage,postId){
  return async (dispatch,getState)=>{
    try {
      await request.put(`/api/posts/update-image/${postId}` , newImage , {
        headers : {
          Authorization : `Bearer ${getState().auth.user?.token}` ,
          "Content-Type" : "multipart/form-data"
        }
      })
      toast.success("Post Image has been uploaded successfully")
    } catch (error) {
      console.log("error-response",error.response)
      toast.error(error.response.data)
    }
  }
}

// UPDATE POST 
export function UpdatingPost(newPost,postId){
  return async (dispatch,getState)=>{
    try {

      const { data } = await request.put(`/api/posts/${postId}` , newPost , {
        headers : {
          Authorization : `Bearer ${getState().auth.user?.token}` ,
        }
      })

      dispatch(PostsActions.setPost(data));
      toast.success("Post has been Updated successfully")

    } catch (error) {
      console.log("error-response",error.response.data)
      toast.error(error.response.data)
    }
  }
}

// DELETE POST 
export function DeletePost(postId){
  return async (dispatch,getState)=>{
    try {

      await request.delete(`/api/posts/${postId}` , {
        headers : {
          Authorization : `Bearer ${getState().auth.user?.token}` ,
        }
      })

      dispatch(PostsActions.setPostIsDeleted());

    } catch (error) {
      console.log("error-response",error.response.data)
      toast.error(error.response.data)
    }
  }
}


