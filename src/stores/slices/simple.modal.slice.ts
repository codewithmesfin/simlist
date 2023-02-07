import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  title: "",
  subtitle: "",
  btnText: "Retry",
};

const authSlice = createSlice({
  name: "simplePopup",
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.btnText = action.payload.btnText?action.payload.btnText:state.btnText;
    },
    closePopup: (state) => {
      state.open = false;
    },
  },
});

export const { showPopup, closePopup } = authSlice.actions;

export const selectIsPopupOpen = (state: any) => {
  const simplePopup = {
    open: state.simplePopup.open,
    title: state.simplePopup.title,
    subtitle: state.simplePopup.subtitle,
    btnText: state.simplePopup.btnText,
  };
  return simplePopup;
};

export default authSlice.reducer;
