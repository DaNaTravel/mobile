import axios from 'axios';
import {BASE_URL} from '@env';
export const AddLocationFavorite = (accountId, locationId, setResult) => {
  let data = JSON.stringify({
    accountId: accountId,
    locationId: locationId,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
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

export const AddItineraryFavorite = (accountId, itineraryId, setResult) => {
  let data = JSON.stringify({
    accountId: accountId,
    itineraryId: itineraryId,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
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

export const GetFavo = (category, accountId, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites?category=${category}&accountId=${accountId}`,
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

export const DeleteFavo = (accountId, locationId, setResult) => {
  let data = JSON.stringify({
    accountId: accountId,
    locationId: locationId,
  });
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
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

export const DeleteItineraryFavo = (accountId, itineraryId, setResult) => {
  let data = JSON.stringify({
    accountId: accountId,
    itineraryId: itineraryId,
  });
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://ec2-3-112-251-136.ap-northeast-1.compute.amazonaws.com:5000/favorites`,
    headers: {
      'Content-Type': 'application/json',
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
