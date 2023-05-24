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
  console.log('data position: ', latitude, longitude);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    // url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes?latitude=16.019270292540877&longitude=108.22904382514184&startDate=${startDate}&endDate=${endDate}&type=${idType}`,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&type=${idType}`,
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
