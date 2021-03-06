import axios from 'axios';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

const apiBaseURL = 'https://u10-backend-staging.herokuapp.com/api';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const GET = (url) => {
  return axios.get(`${apiBaseURL}/${url}`);
}

export const POST = async (url, data) => {
  return axios(`${apiBaseURL}/${url}`, {
    method: 'POST',
    data
  });
}

export const PATCH = async (url, data) => {
  return axios(`${apiBaseURL}/${url}`, {
    method: 'PATCH',
    data,
  });
}

export const echo = new Echo({
  broadcaster: 'pusher',
  key: "236a01f23701620287f9",
  cluster: 'eu',
  forceTLS: true,
  authEndpoint: `${apiBaseURL}/broadcasting/auth`,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios.post(`${apiBaseURL}/broadcasting/auth`, {
           socket_id: socketId, channel_name: channel.name })
          .then(response => {
            callback(false, response.data)
          })
          .catch(error => {
            callback(true, error)
          })
      }
    }
  },
});
