import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from "./slices/authSlice";
import moviesReducer from "./slices/moviesSlice";
import bookingReducer from "./slices/bookingSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    movies: moviesReducer,
    booking: bookingReducer,
    admin: adminReducer
  }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
