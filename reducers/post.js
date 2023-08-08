import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { toUpdate: null, toConfirm: [] },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addToUpdate: (state, action) => {
      state.value.toUpdate = action.payload;
    },
    addToConfirm: (state, action) => {
      state.value.toConfirm.push(action.payload);
    },
    removeAllToConfirm: (state) => {
      state.value.toConfirm.splice(0);
    },
  },
});

export const { addToUpdate, addToConfirm, removeAllToConfirm } =
  postSlice.actions;

export default postSlice.reducer;
