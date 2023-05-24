import axios from 'axios';
import {BASE_URL} from '@env';
export const ItineraryRoutes = async (
  latitude,
  longitude,
  startDate,
  endDate,
  idType,
  setData,
) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    // url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes?latitude=16.019270292540877&longitude=108.22904382514184&startDate=${startDate}&endDate=${endDate}&type=${idType}`,
    url: 'http://192.168.21.63:5000/routes/check?latitude=16.019110655988168&longitude=108.22903420822459&startDate=2023-05-17&endDate=2023-05-19&type=5',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .request(config)
    .then(async response => {
      console.log(response?.data?.data?.routes);
      setData(response?.data?.data?.routes);
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
  await axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.output);
    })
    .catch(error => {
      return error.response.data;
    });
};
