import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { IAuthState } from '../../types/redux/redux.type';
import {isError, isPendingAction } from '../actions/actions';
import { checkAuth, logout, signin, signup } from '../thunk/auth.thunk';

const initialState: IAuthState = {
  isAuth: null,
  isLoading: null,
  error: null,
  id: null,
};
const itemSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        localStorage.setItem('authToken', payload.jwt);
        state.id = payload.id;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        localStorage.setItem('authToken', payload.jwt);
        state.id = payload.id;
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        localStorage.setItem('authToken', payload);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .addCase(logout.fulfilled, (state, action) => {})
      .addCase(checkAuth.rejected, (state, { payload }) => {
        state.isAuth = false;
        localStorage.removeItem('authToken');
      })
      .addMatcher(isError, (state, { payload }) => {
        state.error = payload.message;
        state.isLoading = false;
      })

      .addMatcher(isPendingAction, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isAuth = true;
        state.isLoading = false;
      });
  },
});

// export const {changeSearch, changeDataStart, changeDataEnd} = itemSlice.actions;

export default itemSlice.reducer;
