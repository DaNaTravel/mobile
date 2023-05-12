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
