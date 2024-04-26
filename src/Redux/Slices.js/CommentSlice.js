import { createSlice } from "@reduxjs/toolkit";

const CommentSlice = createSlice({
  name: "comment",

  initialState: {
    allComments: null,
    comment: null,
    commentIsDeleted: false,
    commentIsUpdated: false,
  },

  reducers: {
    getAllComments(state, action) {
      state.allComments = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
    setCommentIsDeleted(state, action) {
      state.commentIsDeleted = action.payload;
    },
    setCommentIsUpdated(state, action) {
      state.commentIsUpdated = action.payload;
    },
  },
});

const commentReducer = CommentSlice.reducer;
const commentActions = CommentSlice.actions;

export { commentReducer, commentActions };
