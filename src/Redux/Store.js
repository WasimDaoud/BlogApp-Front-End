import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slices.js/authSlice";
import { profileReducer } from "./Slices.js/ProfileSlice";
import { PostsReducer } from "./Slices.js/PostSlice";
import { categoryReducer } from "./Slices.js/CategorySlice";
import { commentReducer } from "./Slices.js/CommentSlice";
import { userReducer } from "./Slices.js/UserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: PostsReducer ,
    category : categoryReducer ,
    comment : commentReducer ,
    user : userReducer
  },
});

export default store;
