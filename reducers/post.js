import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addToUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addToUpdate } = postSlice.actions;

export default postSlice.reducer;
