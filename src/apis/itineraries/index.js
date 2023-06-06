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
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes`,
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

export const GenerateItiTest = (IdIti, token, setDataToSentMap) => {
  let data = JSON.stringify({
    routes: [
      [
        {
          latitude: 16.0683088,
          longitude: 108.1490164,
        },
        {
          _id: '64742bfd9a86f189a3bfe605',
        },
        {
          _id: '64742bf99a86f189a3bfe5c9',
        },
        {
          _id: '64742bec9a86f189a3bfe52a',
        },
        {
          _id: '64742bfd9a86f189a3bfe604',
        },
        {
          _id: '64742bf29a86f189a3bfe56b',
        },
        {
          _id: '64742bed9a86f189a3bfe52c',
        },
        {
          _id: '64742bfc9a86f189a3bfe5f2',
        },
        {
          _id: '64742bf89a86f189a3bfe5c1',
        },
        {
          _id: '64742bfa9a86f189a3bfe5dd',
        },
      ],
    ],
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes/${IdIti}/generate`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
      setDataToSentMap(response?.data?.data);
    })
    .catch(error => {
      console.log(error);
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
  await axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.output);
    })
    .catch(error => {
      return error.response.data;
    });
};
