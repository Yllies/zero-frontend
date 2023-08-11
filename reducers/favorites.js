import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",

  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.value = state.value.filter(
        (favorites) => favorites.idPost !== action.payload.idPost
        //
      );
    },
  },
});
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
