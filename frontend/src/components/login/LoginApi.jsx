import axios from 'axios'

const apiBaseURL = 'https://u10-backend-staging.herokuapp.com/api'

axios.defaults.withCredentials = true;

export const GET = (url) => {
    return axios.get(`${apiBaseURL}/${url}`);
}

export const POST = async (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        data,
    });
}