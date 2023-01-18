import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { IPostState } from '../../types/redux/redux.type';
import {isError, isPendingAction } from '../actions/actions';
import { createPost, downloadTxtPost, fetchPost, removePost } from '../thunk/post.thunk';

const initialState: IPostState = {
  post: null,
  error: null,
  isLoading: null,
  txtMessage: null,
  count: null,
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.post = payload.post;
        state.count = payload.count;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        if (state.post) state.post = [payload, ...state.post];
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        if (state.post) state.post = state.post.filter((post) => post.id !== payload.id);
      })
      .addCase(downloadTxtPost.fulfilled, (state, { payload }) => {
        state.txtMessage = payload;
      })
      .addMatcher(isError, (state, { payload }) => {
        state.error = payload.message;
        state.isLoading = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
