import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: [1, Infinity],
  date: null,
  localisation: [],
};

export const userSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    addQuantity: (state, action) => {
      state.quantity.push(action.payload);
    },
    
    // on veut pas de doubon donc = 
    addDate:(state, action) => {
// Update the date without checking for duplicates
state.date = action.payload;
      },

     // on veut pas de doubon donc = 
    addLocalisation: (state, action) => {
  // Add the payload to the localisation array if not already present
  const newLocalisation = action.payload;
  if (!state.localisation.includes(newLocalisation)) {
    state.localisation.push(newLocalisation);
  }    },

  removeFilter: (state, action) => {
    state.localisation = [];
    state.date = null;
    state.quantity = [];
},
},
});


export const {addQuantity, addDate, addLocalisation, removeFilter} = userSlice.actions;

export default userSlice.reducer;
