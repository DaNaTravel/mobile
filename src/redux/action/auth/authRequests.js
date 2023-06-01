import {SignInTest} from '../../../apis/controller/accounts/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from '../../features/auth/authSlice';

export const Login = (dispatch, email, password) => {
  dispatch(loginStart());
  SignInTest(email, password)
    .then(async res => {
      await AsyncStorage.setItem('token', res.data?.data?.token);
      await AsyncStorage.setItem('refreshToken', res.data?.data?.refreshToken);
      dispatch(loginSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(loginFailure(err.response));
    });
};

export const Logout = async dispatch => {
  let newValue = {};
  dispatch(logoutSuccess(newValue));
};
