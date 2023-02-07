import { createSlice } from "@reduxjs/toolkit";
import auth from "../services/auth.services";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setSignOut: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = async (state: any) => {
  let authenticated = await auth.isAutenticated();
  return authenticated;
};

export default authSlice.reducer;
