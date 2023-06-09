import axios from 'axios';
import {BASE_URL} from '@env';
import {useSelector} from 'react-redux';
export const ItineraryRoutes = async (
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
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  await axios
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data?.routes);
      setTotal(response?.data?.data?.cost);
    })
    .catch(error => {
      return error?.response;
    });
};

export const ItineraryRoutesTest = async (
  latitude,
  longitude,
  startDate,
  endDate,
  idType,
  cost,
  number,
  token,
  setTotal,
  setId,
  setData,
) => {
  console.log(typeof cost[0]);
  let data = {
    latitude: latitude,
    longitude: longitude,
    startDate: startDate,
    endDate: endDate,
    type: idType,
    minCost: Number.parseInt(cost[0]) * 1000000,
    maxCost: Number.parseInt(cost[1]) * 1000000,
    people: number,
    points: ['64742bec9a86f189a3bfe52a', '64742bed9a86f189a3bfe52c'],
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: data,
  };
  await axios
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data?.routes);
      setTotal(response?.data?.data?.cost);
      setId(response?.data?.data?._id);
    })
    .catch(error => {
      return error?.response;
    });
};

export const GenerateItiTest = (IdIti, token, arr, setDataToSentMap) => {
  let data = {routes: arr};
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/${IdIti}/generate`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log('response.data', response.data);
      setDataToSentMap(response?.data?.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const UpdateItiTest = (IdIti, token, arr, status, setDataReturn) => {
  let data = {routes: arr};
  console.log('data', data);
  console.log('Id', IdIti);
  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/${IdIti}?checked=${status}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log('response.data', response.data);
      setDataReturn(response?.data);
    })
    .catch(error => {
      console.log(error?.response?.data?.message);
      setDataReturn(error?.response?.data);
    });
};

export const GetItineraries = async setData => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.output);
    })
    .catch(error => {
      return error.response.data;
    });
};
