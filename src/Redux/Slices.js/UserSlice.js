import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    users : null ,
    profileIsDeleted : false
  },
  reducers: {
    getAllUsers(state, action) {
      state.users = action.payload;
    },
    setProfileIsDeleted(state,action) {
      state.profileIsDeleted = action.payload;
    }
  },
});

const userReducer = UserSlice.reducer;
const userActions = UserSlice.actions;

export { userReducer, userActions };
