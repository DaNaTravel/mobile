import axios from 'axios';
import {BASE_URL} from '@env';
export const Search = (keyword, page, take, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/locations?keyword=${keyword}&page=${page}&take=${take}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(async response => {
      setData(response?.data?.listLocations);
    })
    .catch(error => {
      return error.response.data;
    });
};

export const SearchByID = (id, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${BASE_URL}/locations/${id}`,
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
