import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
  },
  reducers: {
    getProfile(state, action) {
      state.user = action.payload;
    },
    uploadPhoto(state,action) {
      state.user.profilePhoto = action.payload;
    },
    updateProfile(state,action){
      state.user = action.payload
    }
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
