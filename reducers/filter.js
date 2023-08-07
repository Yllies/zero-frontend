import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {quantity:[], date: null, localisation:[]},
  //remettre null après remise à jour des filtres 
};

export const userSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    addQuantity: (state, action) => {
        state.value.localisation.push(action.payload);  
    },
    
    // on veut pas de doubon donc = 
    addDate:(state, action) => {
        state.value.date = action.payload;
      },

     // on veut pas de doubon donc = 
    addLocalisation: (state, action) => {
        state.value.localisation = action.payload;
    },

  removeFilter: (state, action) => {
    state.value.localisation = [];
    state.value.date = null;
    state.value.quantity = [];
},
},

});


export const {addQuantity, addDate, addLocalisation, removeFilter} = userSlice.actions;

export default userSlice.reducer;
