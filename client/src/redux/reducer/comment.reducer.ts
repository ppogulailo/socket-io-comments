import { createSlice } from '@reduxjs/toolkit';
import { ICommentState } from '../../types/redux/redux.type';
import { findComment, getCommentChildren } from '../thunk/comment.thunk';
import { isError, isPendingAction } from '../actions/actions';

const initialState: ICommentState = {
  comments: [],
  isLoading: null,
  isLoadingComment: null,
  post: null,
  error: null,
  count: null,
};
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchComments(state, { payload }) {
      state.comments = payload.comments;
      state.post = payload;
      state.isLoading = false;
      state.count = payload.count;
    },
    addComments(state, { payload }) {
      state.isLoading = false;
      state.comments = [payload, ...state.comments];
    },
    removeComments(state, action) {
      state.isLoading = false;
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    updateComments(state, action) {
      const existingComment = state.comments.find((comment) => comment.id === action.payload.id);
      if (existingComment != null) {
        existingComment.message = action.payload.message;
      }
      state.isLoading = false;
    },
    toggleLikes(state, action) {
      const existingComment = state.comments.find((comment) => comment.id === action.payload.id);
      if (existingComment) {
        if (action.payload.addLike) {
          existingComment.likeCount++;
          existingComment.likedByMe = true;
        } else {
          existingComment.likeCount--;
          existingComment.likedByMe = false;
        }
      }
      state.isLoading = false;
    },
    getComment(state, { payload }) {
      state.isLoading = false;
      if (!state.comments.find((comment) => comment.id === payload.comments[0].id)) {
        state.comments = [...state.comments, ...payload.comments];
      }
    },
    errorComment(state, { payload }) {
      state.error = payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentChildren.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload.message;
      })
      .addMatcher(isPendingAction, (state) => {
        state.error = null;
      });
  },
});

export const {
  fetchComments,
  addComments,
  removeComments,
  updateComments,
  toggleLikes,
  getComment,
  errorComment,
} = commentSlice.actions;

export default commentSlice.reducer;
