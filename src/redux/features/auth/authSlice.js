import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  login: {},
  error: {},
  isLoggedIn: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      isLoggedIn = true;
      state.login = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure} = authSlice.actions;

export default authSlice.reducer;
