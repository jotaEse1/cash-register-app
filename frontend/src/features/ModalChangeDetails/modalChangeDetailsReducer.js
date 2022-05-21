import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChangeDetails: false,
  success: false,
  data: [],
  moneyCopy: [],
  msg: "",
};

const changeDetails = createSlice({
  name: "changeDetails",
  initialState,
  reducers: {
    openModalChangeDetails: (state) => {
      state.isChangeDetails = true;
    },
    closeModalChangeDetails: (state) => {
      state.isChangeDetails = false;
    },
    handleChangeDetails: (state, action) => {
      const { payload } = action;

      switch (payload.success) {
        case true:
          state.success = payload.success
          state.data = payload.data;
          state.moneyCopy = payload.moneyCopy;
          break;

        case false:
            state.success = payload.success
            state.msg = payload.msg 
            break;

        default: return state
      }
    },
  },
});

export const {
  openModalChangeDetails,
  closeModalChangeDetails,
  handleChangeDetails,
} = changeDetails.actions;
export default changeDetails.reducer;
