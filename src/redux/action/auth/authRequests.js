import {SignInTest} from '../../../apis/controller/accounts/SignIn';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess
} from '../../features/auth/authSlice';

export const Login = async (dispatch, email, password) => {
  dispatch(loginStart());
  await SignInTest(email, password)
    .then(res => {
      dispatch(loginSuccess(res.data));
    })
    .catch(err => {
      dispatch(loginFailure(err.response.message));
    });
};

export const Logout = async (dispatch) => {
  await dispatch(logoutSuccess())
};
