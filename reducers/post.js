import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { toUpdate: null, toConfirm: [], toConfirmOrRefuse: {}, reserved: {} },
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
    addToConfirmOrRefuse: (state, action) => {
      state.value.toConfirmOrRefuse = action.payload;
    },
    removeToConfirmOrRefuse: (state) => {
      state.value.toConfirmOrRefuse = {};
    },
    addToShowTheAccepted: (state, action) => {
      state.value.reserved = action.payload;
    },
  },
});

export const {
  addToUpdate,
  addToConfirm,
  removeAllToConfirm,
  addToConfirmOrRefuse,
  addToShowTheAccepted,
} = postSlice.actions;

export default postSlice.reducer;
