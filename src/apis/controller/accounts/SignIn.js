import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const baseURL = 'http://192.168.21.63:5000';
export const SignIn = (email, password) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseURL}/accounts/signin`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log(response?.data);
      AsyncStorage.setItem('token', response?.data?.data?.token?.token);
      AsyncStorage.setItem(
        'refreshToken',
        response?.data?.data?.refreshToken?.token,
      );
      AsyncStorage.setItem(
        'expireInToken',
        JSON.stringify(response?.data?.data?.token?.expireIn),
      );
      AsyncStorage.setItem(
        'expireInRefreshToken',
        JSON.stringify(response?.data?.data?.refreshToken?.expireIn),
      );
    })
    .catch(error => {
      console.log(error.response.data.message[0]);
    });
};
