import { createSlice } from "@reduxjs/toolkit";
import { confirmCode, sendVerification } from "../services/user.services";


const initialState = {
  response: {},
  status: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendVerification.fulfilled, (state, action): any => {
        state.response = action.payload;
      })
      .addCase(confirmCode.fulfilled, (state, action): any => {
        state.response = action.payload;
      })
    
  },
});


export default userSlice.reducer;
