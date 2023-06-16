import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
import {useDispatch} from 'react-redux';
import axiosInstance from '../../../utils/axiosInstance';
export const SignIn = (email, password) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-13-114-139-244.ap-northeast-1.compute.amazonaws.com:5000/accounts/signin`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      await AsyncStorage.setItem('token', response?.data?.data?.token);
      await AsyncStorage.setItem(
        'refreshToken',
        response?.data?.data?.refreshToken,
      );
      return response?.data?.message;
    })
    .catch(error => {
      return error.response.data.message;
    });
};
export function SignInTest(email, password) {
  return axios.post(
    `http://ec2-13-114-139-244.ap-northeast-1.compute.amazonaws.com:5000/accounts/signin`,
    {
      email: email,
      password: password,
    },
  );
}
