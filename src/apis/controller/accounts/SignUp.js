import axios from 'axios';
import {BASE_URL} from '@env';
export const SignUp = async (email, name, password) => {
  let data = JSON.stringify({
    email: email,
    password: password,
    role: 1,
    name: name,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://ec2-54-199-239-74.ap-northeast-1.compute.amazonaws.com:5000/accounts`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  await axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error.response.data.message);
      return error;
    });
};
