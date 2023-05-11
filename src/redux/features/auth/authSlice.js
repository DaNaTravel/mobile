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
    logoutSuccess: (state, action) => {
      isLoggedIn = false;
      state.login = action.payload;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure, logoutSuccess} =
  authSlice.actions;

export default authSlice.reducer;
