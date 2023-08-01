import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null, name: null },
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
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
