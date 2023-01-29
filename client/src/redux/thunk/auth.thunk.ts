import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from '../../api/auth.api';
import { AuthResponse } from '../../types/api/api.type';

// eslint-disable-next-line import/no-cycle

export const signup = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('auth/register', async (body, { rejectWithValue }) => {
  try {
    const response = await AuthApi.register(body);
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});
export const signin = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const response = await AuthApi.login(body);
    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});
export const checkAuth = createAsyncThunk<string, undefined, { rejectValue: string }>(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.checkAuth();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
export const logout = createAsyncThunk<void, undefined, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthApi.logOut();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
