import axios from 'axios';
const baseUrl = 'http://192.168.21.63:5000';
export const SignUp = (email, name, password) => {
  let data = JSON.stringify({
    email: email,
    password: password,
    role: 1,
    name: name,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/accounts`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error.response.data.message[0]);
    });
};

