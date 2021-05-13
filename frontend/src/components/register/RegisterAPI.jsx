import axios from 'axios'
const apiBaseURL = 'BACKEND_URL'

export const GET = (url) => {
    return axios.get(`${apiBaseURL}/${url}`);
}

export const POST = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        data,
    });
}