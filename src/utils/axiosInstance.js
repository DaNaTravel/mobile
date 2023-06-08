import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import {BASE_URL} from '@env';

const getToken = async () => {
  const accessToken = await AsyncStorage.getItem('token');
  return accessToken;
};

console.log(getToken());

const axiosInstance = axios.create({
  baseURL: 'http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000',
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async req => {
  const token = await AsyncStorage.getItem('token');
  console.log('token', token);
  let refreshToken = await AsyncStorage.getItem('refreshToken');
  const expireInRefreshToken = await jwtDecode(refreshToken).exp;
  const isExpiredRefresh = dayjs(new Date()).unix();
  const isTrueRefresh = Boolean(expireInRefreshToken - isExpiredRefresh > 5);
  if (isTrueRefresh) {
    if (!token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    const expireInToken = await jwtDecode(token).exp;
    console.log('expireInToken', expireInToken);
    const isExpired = dayjs(new Date()).unix();
    console.log('isExpired', isExpired);
    const isTrue = Boolean(expireInToken - isExpired > 5);
    if (isTrue) return req;
    refreshToken = await AsyncStorage.getItem('refreshToken');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/accounts/refresh`,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        AsyncStorage.setItem('token', response?.data?.data?.token);
        AsyncStorage.setItem(
          'refreshToken',
          response?.data?.data?.refreshToken,
        );
        req.headers.Authorization = `Bearer ${AsyncStorage.getItem('token')}`;
        return req;
      })
      .catch(error => {
        console.log('error', error);
        return req;
      });
    return req;
  } else {
    console.log('Login session is expired');
  }
});
export default axiosInstance;
