import axios from 'axios';
import {BASE_URL} from '@env';
export const Related = (type, id, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations/related?type=${type}&locationId=${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data);
    })
    .catch(error => {
      return error.response.data;
    });
};
