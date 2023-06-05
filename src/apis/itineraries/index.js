import axios from 'axios';
import {BASE_URL} from '@env';
import axiosInstance from '../../utils/axiosInstance';
export const ItineraryRoutes = async (
  latitude,
  longitude,
  startDate,
  endDate,
  idType,
  cost,
  number,
  setTotal,
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
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  await axios
    .request(config)
    .then(async response => {
      console.log(response?.data?.data?.routes);
      setData(response?.data?.data?.routes);
      setTotal(response?.data?.data?.cost);
    })
    .catch(error => {
      return error?.response;
    });
};

export const GetItineraries = async setData => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axiosInstance
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.output);
    })
    .catch(error => {
      return error.response.data;
    });
};
