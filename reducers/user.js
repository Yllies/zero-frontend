import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, name: null, _id: null},
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
      state.value._id = state.value._id.filter(e => e._id !== action.payload);
    },
  },
});

export const { login, logout, removeUser } = userSlice.actions;

export default userSlice.reducer;
