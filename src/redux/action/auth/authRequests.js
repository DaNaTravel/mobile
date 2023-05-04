import {SignInTest} from '../../../apis/controller/accounts/SignIn';
import {
  loginStart,
  loginSuccess,
  loginFailure,
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
