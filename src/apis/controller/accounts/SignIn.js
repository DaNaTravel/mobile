import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
export const SignIn = (email, password) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/accounts/signin`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      AsyncStorage.setItem('token', response?.data?.data?.token);
      AsyncStorage.setItem('refreshToken', response?.data?.data?.refreshToken);
      return response.data.message;
    })
    .catch(error => {
      return error.response.data.message;
    });
};
