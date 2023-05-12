import axios from 'axios';
import {BASE_URL} from '@env';
export const ItineraryRoutes = async (startDate, endDate, setData) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/routes?latitude=16.019110655988168&longitude=108.22903420822459&startDate=${startDate}&endDate=${endDate}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .request(config)
    .then(async response => {
      setData(response?.data?.routes);
    })
    .catch(error => {
      return error.response.data;
    });
};
