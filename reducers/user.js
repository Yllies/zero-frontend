import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {token: "RiRWMLmhGyX9pM2VeSTZPRc031xPvyO9", email: null, name: null},//token:a remettre null après install persistor ou écran login  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.type = action.payload.type;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.name = null;
      state.value.type = null;
    },
    
    removeUser: (state, action) => {
      state.value.token = state.value.token.filter(e => e.token !== action.payload);
    },
  },
});

export const { login, logout, removeUser } = userSlice.actions;

export default userSlice.reducer;
