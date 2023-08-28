import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: [1, 9999],
  date: '2020-08-26',
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

      addDisplay : (state, action) => {
        console.log(action.payload)
        state.display = action.payload;
      },


      removeFilter: (state, action) => {
        console.log("déclenchement de remove")
        state.date='2020-08-26';
        state.quantity= [1, 99999],
        state.display = false;
      },
  },
});


export const {addQuantity, addDate, removeFilter, addDisplay} = userSlice.actions;

export default userSlice.reducer;
