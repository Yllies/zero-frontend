import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: [1, Infinity],
  date: '2020-08-26',
  location: { latitude: null, longitude: null }, // Utiliser une structure d'objet pour stocker les coordonnées
  radius: null,
  display: false,
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

      addDisplay : (state, action) => {
        console.log("déclenchement de add")
        state.display = action.payload;
      },


      removeFilter: (state, action) => {
        console.log("déclenchement de remove")
        state.location = {};
        state.date = null;
        state.quantity = [];
        state.radius = null;
        state.display = false;
      },
  },
});


export const {addQuantity, addDate, addLocalisation, removeFilter, addRadius, addDisplay} = userSlice.actions;

export default userSlice.reducer;
