import axios from 'axios';
import {BASE_URL} from '@env';
export const OnForgot = async email => {
  let data = JSON.stringify({
    email: email,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/accounts/forgot-password`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  await axios
    .request(config)
    .then(response => {
      console.log('res: ', response?.data?.message);
      return response?.data?.message;
    })
    .catch(error => {
      console.log('error: ', error?.response?.data?.message);
      return error?.response?.data?.message;
    });
};
