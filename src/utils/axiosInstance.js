import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
const baseURL = 'http://192.168.21.63:5000';
let authToken = AsyncStorage.getItem('token');
const axiosInstance = axios.create({
  baseURL,
  headers: {Authorization: `Bearer ${authToken}`},
});
axiosInstance.interceptors.request.use(async req => {
  const expireInRefreshToken = await AsyncStorage.getItem('expireInRefreshToken');
  const isExpiredRefresh = dayjs(new Date()).unix();
  console.log('expireInRefreshToken', expireInRefreshToken);
  const isTrueRefresh = Boolean(expireInRefreshToken - isExpiredRefresh > 5);
  if(isTrueRefresh){
    if (!authToken) {
      authToken = AsyncStorage.getItem('token');
      console.log(authToken);
      req.headers.Authorization = `Bearer ${authToken}`;
    }
    const expireInToken = await AsyncStorage.getItem('expireInToken');
    console.log('expireInToken', expireInToken);
    const isExpired = dayjs(new Date()).unix();
    console.log('isExpired', isExpired);
    const isTrue = Boolean(expireInToken - isExpired > 5);
    if (isTrue) return req;
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/accounts/refresh`,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    axios
      .request(config)
      .then(response => {
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
        req.headers.Authorization = `Bearer ${AsyncStorage.getItem('token')}`;
        return req;
      })
      .catch(error => {
        console.log(error);
        return req;
      });
    return req;
  }
  else{
    console.log('refresh is expired');
  }
  
});
export default axiosInstance;
