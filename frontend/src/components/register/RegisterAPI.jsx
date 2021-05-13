import axios from 'axios'
const apiBaseURL = 'BACKEND_URL'

export const GET = (url) => {
    // return axios.get(`${apiBaseURL}/${url}`);
    return console.log(url);
}

export const POST = (url, data) => {
    // return axios(`${apiBaseURL}/${url}`, {
    //     method: 'POST',
    //     data,
    // });
    return console.log(url, data);
}