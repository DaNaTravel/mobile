import axios from 'axios';
import {BASE_URL} from '@env';
export const AddLocationFavorite = (accountId, locationId) => {
  let data = JSON.stringify({
    accountId: accountId,
    locationId: locationId,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://192.168.20.191:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      console.log(response?.data?.mesage);
      return response?.data?.mesage;
    })
    .catch(error => {
      console.log(error?.data);
    });
};
export const GetFavo = (category, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=${category}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(response => {
      setData(response?.data?.data);
    })
    .catch(error => {
      console.log(error?.data);
    });
};