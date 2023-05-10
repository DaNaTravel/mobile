import axios from 'axios';
import {BASE_URL} from '@env';
export const ItineraryRoutes = setData => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://192.168.21.63:5000/routes?latitude=16.019110655988168&longitude=108.22903420822459&startDate=2023-05-04&endDate=2023-05-05`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .request(config)
    .then(async response => {
      console.log(response?.data?.routes);
      setData(response?.data?.routes);
    })
    .catch(error => {
      return error.response.data;
    });
};
