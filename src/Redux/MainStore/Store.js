import { configureStore } from '@reduxjs/toolkit';
import AdminReducer from "../Slices/Admin_Slice"

export const store = configureStore({
  reducer: {
    admin: AdminReducer,
  }
});
