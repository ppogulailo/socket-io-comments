import { createSlice } from '@reduxjs/toolkit';

interface ThemeReducer {
  themes: 'light' | 'dark';
}
const initialState: ThemeReducer = {
  themes: 'light',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.themes = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
