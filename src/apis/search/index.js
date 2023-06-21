import axios from 'axios';
import {BASE_URL} from '@env';
export const Search = (keyword, type, page, take, setData, setIsLoading) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${keyword}&types=${type}&page=${page}&take=${take}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(response => {
      console.log(response?.data?.listLocations);
      setData(response?.data?.listLocations);
      setIsLoading(false);
    })
    .catch(error => {
      return error.response.data;
    });
};

export const SearchLoca = (keyword, page, take, setData, setIsLoading) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations?keyword=${keyword}&page=${page}&take=${take}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .request(config)
    .then(response => {
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
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations?types=${type}&page=${page}&take=${take}`,
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
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations/${id}`,
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
      console.log(error?.response?.data);
      return error.response.data;
    });
};

export const SearchRelatedByID = (id, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-18-183-180-22.ap-northeast-1.compute.amazonaws.com:5000/locations/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.relatedLocations);
    })
    .catch(error => {
      console.log(error?.response?.data);
      return error.response.data;
    });
};
