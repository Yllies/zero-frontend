import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: [1, Infinity],
  date: null,
  location: { latitude: null, longitude: null }, // Utiliser une structure d'objet pour stocker les coordonnées
  radius: null,
};

export const userSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    addQuantity: (state, action) => {

      // On ne push pas pour ne pas avoir plusieurs quantité enregistré dans le store
      state.quantity = action.payload; // Update with the new quantity range
    },
    
  
    addDate:(state, action) => {
    // Update the date without checking for duplicates
    state.date = action.payload;
      },

      addLocalisation: (state, action) => {
        state.location = action.payload;
      },

      addRadius : (state, action) => {
        state.radius = action.payload;
      },

  removeFilter: (state, action) => {
    state.location = {};
    state.date = null;
    state.quantity = [];
    state.radius = null;
},
},
});


export const {addQuantity, addDate, addLocalisation, removeFilter, addRadius} = userSlice.actions;

export default userSlice.reducer;
