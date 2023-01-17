import { configureStore, combineReducers, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../reducer/auth.reducer';
import theme from '../reducer/theme.reducer';

const reducers = combineReducers({
  theme: theme,
  auth: authReducer,
});

// [apiSlice.reducerPath]: apiSlice.reducer
const persistedReducer = persistReducer(
  { key: 'root', storage },
  reducers
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;

export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

export function isError(action: AnyAction) {
  return action.type.endsWith('/rejected');
}

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
