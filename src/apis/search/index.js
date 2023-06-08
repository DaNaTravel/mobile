import axios from 'axios';
import {BASE_URL} from '@env';
export const Search = (keyword, type, page, take, setData, setIsLoading) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${keyword}&types=${type}&page=${page}&take=${take}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(async response => {
      setData(response?.data?.listLocations);
      setIsLoading(false);
    })
    .catch(error => {
      return error.response.data;
    });
};
export const Filter = (type, page, take, setData, setIsLoading) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/locations?types=${type}&page=${page}&take=${take}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(async response => {
      setData(response?.data?.listLocations);
      setIsLoading(false);
    })
    .catch(error => {
      return error.response.data;
    });
};
export const SearchByID = (id, setData) => {
  console.log(id);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/locations/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .request(config)
    .then(async response => {
      console.log('LocaData', response?.data?.data);
      setData(response?.data?.data);
    })
    .catch(error => {
      console.log(error?.response?.data);
      return error.response.data;
    });
};
