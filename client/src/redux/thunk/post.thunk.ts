import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostApi } from '../../api/post.api';
import { IPost, IPostCreate } from '../../types/post/post.type';
import { IFindPost } from '../../types/redux/redux.type';

export const fetchPost = createAsyncThunk<IFindPost, number, { rejectValue: string }>(
  'post/fetch',
  async (page, { rejectWithValue }) => {
    try {
      const response = await PostApi.getPost(page);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const createPost = createAsyncThunk<IPost, IPostCreate, { rejectValue: string }>(
  'post/create',
  async (body, { rejectWithValue }) => {
    try {
      const response = await PostApi.createPost(body);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const removePost = createAsyncThunk<{ id: string }, string, { rejectValue: string }>(
  'post/remove',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostApi.deletePost(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const downloadTxtPost = createAsyncThunk<string, string, { rejectValue: string }>(
  'post/download',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostApi.downloadPost(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
