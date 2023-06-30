import {createContext, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import {BASE_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../redux/features/auth/authSlice';
import {NonAccount} from '../components/Modal/NonAccount/index';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
export const AxiosContext = createContext();

const {Provider} = AxiosContext;

export const AxiosProvider = ({children}) => {
  const dispatch = useDispatch();
  const isUser = useSelector(state => state.auth.login);
  const axiosInstance = axios.create({
    baseURL:
      'http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000',
    headers: {
      Authorization: `Bearer ${isUser?.data?.token}`,
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(async req => {
    const token = isUser?.data?.token;
    let refreshToken = isUser?.data?.refreshToken;
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
      refreshToken = isUser?.data?.refreshToken;
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/accounts/refresh`,
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      axios
        .request(config)
        .then(response => {
          dispatch(loginSuccess(response?.data));
          let token = isUser?.data?.token;
          req.headers.Authorization = `Bearer ${token}`;
          return req;
        })
        .catch(error => {
          console.log('error', error);
          return req;
        });
      return req;
    } else {
      console.log('Login session is expired');
      Alert.alert('Failed', 'Login session is expired', [
        {
          text: 'Cancel',
        },
      ]);
    }
  });

  const GetFavo = async (category, setData) => {
    try {
      axiosInstance
        .get(`/favorites?category=${category}`)
        .then(response => {
          setData(response?.data?.data?.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddLocationFavorite = locationId => {
    try {
      axiosInstance
        .post(`/favorites`, {locationId: locationId})
        .then(response => {
          console.log('result ', response?.data?.message);
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddItineraryFavorite = itineraryId => {
    axiosInstance
      .post('/favorites', {itineraryId: itineraryId})
      .then(response => {
        console.log(response?.data?.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const DeleteItineraryFavo = (itineraryId, setResult) => {
    let data = JSON.stringify({
      itineraryId: itineraryId,
    });
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isUser?.data?.token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(async response => {
        console.log(response?.data?.message);
        setResult(await response?.data?.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const DeleteFavo = (locationId, setResult) => {
    let data = JSON.stringify({
      locationId: locationId,
    });
    axiosInstance
      .delete('/favorites/', {data: data})
      .then(response => {
        setResult(response?.data?.message);
        console.log(response?.data?.message);
      })
      .catch(error => {
        console.log('hi');
        console.log(error?.response?.data?.message);
      });
  };

  const GetHistories = (page, setData) => {
    console.log(page);
    axiosInstance
      .get(`/routes?access=private&page=${page}`)
      .then(response => {
        setData(response?.data?.data?.output);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const ChangeStatusForIti = (ItiId, isPublic) => {
    axiosInstance
      .patch(`/routes/${ItiId}`, {isPublic: isPublic})
      .then(response => {
        console.log(response?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const ItineraryRoutesUser = async (
    latitude,
    longitude,
    startDate,
    endDate,
    idType,
    cost,
    number,
    setTotal,
    setId,
    setData,
  ) => {
    let data = {
      latitude: latitude,
      longitude: longitude,
      startDate: startDate,
      endDate: endDate,
      type: idType,
      minCost: cost[0] * 1000000,
      maxCost: cost[1] * 1000000,
      people: number,
      points: ['64742bec9a86f189a3bfe52a', '64742bed9a86f189a3bfe52c'],
    };
    await axiosInstance
      .post(`/routes`, {data})
      .then(response => {
        console.log(response?.data?.data);
        setData(response?.data?.data?.routes);
        setTotal(response?.data?.data?.cost);
        setId(response?.data?.data?._id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const GenerateNewIti = (ItiId, routes) => {
    let data = {
      routes: routes,
    };
    axiosInstance
      .post(`/routes/${ItiId}/arrange`, {data})
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };
  return (
    <Provider
      value={{
        GetFavo,
        AddLocationFavorite,
        AddItineraryFavorite,
        DeleteItineraryFavo,
        DeleteFavo,
        GetHistories,
        ChangeStatusForIti,
        ItineraryRoutesUser,
        GenerateNewIti,
      }}>
      {children}
    </Provider>
  );
};
