import { createSlice } from "@reduxjs/toolkit";

export const PostSlice = createSlice({
  name: "Post",
  initialState: {
    posts: [],
    ProfilePosts: [],
    postsCount: null,
    postsCat: [],
    postIsCreated: false,
    lauding: false ,
    post : null ,
    postIsDeleted : false 
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
    getProfilePosts(state, action) {
      state.ProfilePosts = action.payload;
    },
    getPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    getPostsCat(state, action) {
      state.postsCat = action.payload;
    },
    setPostIsCreated(state) {
      state.postIsCreated = true;
      state.lauding = false;
    },
    clearPostIsCreated(state) {
      state.postIsCreated = false;
    },
    setLauding(state) {
      state.lauding = true;
    },
    clearLauding(state) {
      state.lauding = false;
    },
    toggleLike(state,action) {
      state.post.likes = action.payload.likes;
    },
    setPost(state,action){
      state.post = action.payload;
    },
    clearPost(state){
      state.post = null
    },
    setPostIsDeleted(state,action){
      state.postIsDeleted = action.payload;
    }
  },
});

const PostsReducer = PostSlice.reducer;
const PostsActions = PostSlice.actions;

export { PostsReducer, PostsActions };
