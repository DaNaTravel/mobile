import axios from 'axios';
export const ItineraryRoutes = async (
  latitude,
  longitude,
  startDate,
  endDate,
  idType,
  cost,
  number,
  point,
  setTotal,
  setData,
) => {
  let data = {
    latitude: latitude,
    longitude: longitude,
    startDate: startDate,
    endDate: endDate,
    type: idType,
    minCost: Number.parseInt(cost[0]) * 1000000,
    maxCost: Number.parseInt(cost[1]) * 1000000,
    people: number,
    points: point,
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  await axios
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data?.routes);
      setTotal(response?.data?.data?.cost);
    })
    .catch(error => {
      return error?.response;
    });
};

export const ItineraryRoutesTest = async (
  latitude,
  longitude,
  startDate,
  endDate,
  idType,
  cost,
  number,
  point,
  token,
  setTotal,
  setId,
  setData,
) => {
  console.log('point', point);
  let data = {
    latitude: latitude,
    longitude: longitude,
    startDate: startDate,
    endDate: endDate,
    type: idType,
    minCost: Number.parseInt(cost[0]) * 1000000,
    maxCost: Number.parseInt(cost[1]) * 1000000,
    people: number,
    points: point,
  };
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    data: data,
  };
  await axios
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data?.routes);
      setTotal(response?.data?.data?.cost);
      setId(response?.data?.data?._id);
    })
    .catch(error => {
      return error?.response;
    });
};

export const GenerateItiTest = (IdIti, token, arr, setDataToSentMap) => {
  let data = {routes: arr};
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/${IdIti}/generate`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log('response.data', response.data);
      setDataToSentMap(response?.data?.data);
    })
    .catch(error => {
      console.log(error.response.data.message);
    });
};

export const UpdateItiTest = (IdIti, token, arr, status, setDataReturn) => {
  let data = {routes: arr};
  console.log('data', data);
  console.log('Id', IdIti);
  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/${IdIti}?checked=${status}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log('response.data', response.data);
      setDataReturn(response?.data);
    })
    .catch(error => {
      console.log(error?.response?.data?.message);
      setDataReturn(error?.response?.data);
    });
};

export const GetItineraries = async setData => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes?isPublic=true`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await axios
    .request(config)
    .then(async response => {
      setData(response?.data?.data?.output);
    })
    .catch(error => {
      return error.response.data;
    });
};

export const GetItineraryById = (Id, setData) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/${Id}`,
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
      return error.response.data;
    });
};

export const GetItineraryRecommend = setData => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/routes/recommended`,
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
      console.log(error?.response?.data);
      return error.response.data;
    });
};

export const GetLocationRecommend = setData => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/locations/recommended`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .request(config)
    .then(response => {
      console.log(response?.data?.data);
      setData(response?.data?.data);
    })
    .catch(error => {
      console.log(error?.response?.data);
      return error.response.data;
    });
};
