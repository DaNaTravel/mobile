import axios from 'axios';
import {BASE_URL} from '@env';
import axiosInstance from '../../utils/axiosInstance';
export const AddLocationFavorite = (token, locationId, setResult) => {
  let data = JSON.stringify({
    locationId: locationId,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      setResult(await response?.data?.message);
    })
    .catch(error => {
      console.log(error?.data?.message);
    });
};

export const AddItineraryFavorite = (token, itineraryId, setResult) => {
  let data = JSON.stringify({
    itineraryId: itineraryId,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      setResult(await response?.data?.message);
    })
    .catch(error => {
      console.log(error?.data?.message);
    });
};

export const GetFavo = (category, token, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=${category}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data);
    })
    .catch(error => {
      console.log(error?.data);
    });
};

export const DeleteFavo = (token, locationId, setResult) => {
  let data = JSON.stringify({
    locationId: locationId,
  });
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      setResult(await response?.data?.message);
    })
    .catch(error => {
      console.log(error?.data?.message);
    });
};

export const DeleteItineraryFavo = (token, itineraryId, setResult) => {
  let data = JSON.stringify({
    itineraryId: itineraryId,
  });
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(async response => {
      setResult(await response?.data?.message);
    })
    .catch(error => {
      console.log(error?.data?.message);
    });
};
