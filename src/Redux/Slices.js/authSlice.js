import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    error: null,
    registerMessage: null,
    emailIsVerified : false
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setProfilePhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserName(state, action) {
      state.user.userName = action.payload;
    },
    error(state, action) {
      state.error = action.payload;
    },
    setEmailIsVerified(state){
      state.emailIsVerified = true ;
    }
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
