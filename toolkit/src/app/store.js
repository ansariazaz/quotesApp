import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Reducers/authReducer';
import quoteReducer from '../Reducers/quoteReducer';
export const store = configureStore({
  reducer: {
    user:authReducer,
    quotes:quoteReducer,
  },
});
