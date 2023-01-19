import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentApi } from '../../api/comments.api';
import { ICommentUpdate } from '../../types/redux/redux.type';
import {
  addComments,
  removeComments,
  fetchComments,
  updateComments,
  toggleLikes,
  getComment,
  errorComment,
} from '../reducer/comment.reducer';
import { ICommentCreate, ICommentFind } from '../../types/comment/comment.type';

export const findComment = createAsyncThunk<void, ICommentFind, { rejectValue: string }>(
  'comment/fetch',
  async (body, { rejectWithValue }) => {
    try {
      return CommentApi.findComment(body);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const createComment = createAsyncThunk<void, ICommentCreate, { rejectValue: string }>(
  'comment/create',
  async (body, { rejectWithValue }) => {
    try {
      return CommentApi.sendComment(body);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const deleteComment = createAsyncThunk<void, string, { rejectValue: string }>(
  'comment/remove',
  async (id, { rejectWithValue }) => {
    try {
      return CommentApi.deleteComment(id);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const updateComment = createAsyncThunk<void, ICommentUpdate, { rejectValue: string }>(
  'comment/updateListening',
  async (body, { rejectWithValue }) => {
    try {
      return CommentApi.updateComment(body);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const likeComment = createAsyncThunk<void, string, { rejectValue: string }>(
  'comment/updateListening',
  async (id, { rejectWithValue }) => {
    try {
      return CommentApi.likeComment(id);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const getCommentChildren = createAsyncThunk<void, any[], { rejectValue: string }>(
  'comment/getCommentChildren',
  async (id, { rejectWithValue }) => {
    try {
      return CommentApi.getChildrenComment(id);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const startCommentListen = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'comment/startCommentListen',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return (
        CommentApi.connect(),
        CommentApi.onGetChildrenComment((res) => {
          dispatch(getComment(res));
        }),
        CommentApi.onLikeComment((res) => {
          dispatch(toggleLikes(res));
        }),
        CommentApi.onUpdateComment((res) => {
          dispatch(updateComments(res));
        }),
        CommentApi.onDeleteComment(({ id }) => {
          dispatch(removeComments(id));
        }),
        CommentApi.onSendComment((res) => {
          dispatch(addComments(res));
        }),
        CommentApi.onError((res: any) => {
          dispatch(errorComment(res));
        }),
        CommentApi.onFindComment((res) => {
          dispatch(fetchComments(res));
        })
      );
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const stopCommentListen = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'comment/stopCommentListen',
  async (_, { rejectWithValue }) => {
    try {
      CommentApi.disconnect();
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
