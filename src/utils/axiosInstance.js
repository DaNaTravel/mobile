import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import {BASE_URL} from '@env';
const accessToken = AsyncStorage.getItem('token');
const axiosInstance = axios.create({
  BASE_URL,
  headers: {Authorization: `Bearer ${accessToken}`},
});
axiosInstance.interceptors.request.use(async req => {
  const accessToken = await AsyncStorage.getItem('token');
  let refreshToken = await AsyncStorage.getItem('refreshToken');
  const expireInRefreshToken = await jwtDecode(refreshToken).exp;
  const isExpiredRefresh = dayjs(new Date()).unix();
  const isTrueRefresh = Boolean(expireInRefreshToken - isExpiredRefresh > 5);
  if (isTrueRefresh) {
    if (!accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    const expireInToken = await jwtDecode(accessToken).exp;
    console.log('expireInToken', expireInToken);
    const isExpired = dayjs(new Date()).unix();
    console.log('isExpired', isExpired);
    const isTrue = Boolean(expireInToken - isExpired > 5);
    if (isTrue) return req;
    refreshToken = await AsyncStorage.getItem('refreshToken');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/accounts/refresh`,
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
        console.log(error);
        return req;
      });
    return req;
  } else {
    console.log('Login session is expired');
  }
});
export default axiosInstance;
