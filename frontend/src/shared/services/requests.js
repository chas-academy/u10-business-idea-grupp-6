import axios from 'axios';

const apiBaseURL = 'https://u10-backend-staging.herokuapp.com/api'
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
        data,
    });
}