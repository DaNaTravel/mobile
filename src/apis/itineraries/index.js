import axios from 'axios';
import {BASE_URL} from '@env';
export const ItineraryRoutes = async (startDate, endDate, idType, setData) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-18-177-138-181.ap-northeast-1.compute.amazonaws.com:3000/routes?latitude=16.019110655988168&longitude=108.22903420822459&startDate=${startDate}&endDate=${endDate}&type=${idType}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .request(config)
    .then(async response => {
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
