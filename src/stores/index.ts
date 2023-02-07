import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import simpleModalSlice from "./slices/simple.modal.slice";
import userSlice from "./slices/user.slice";


export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    simplePopup: simpleModalSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
