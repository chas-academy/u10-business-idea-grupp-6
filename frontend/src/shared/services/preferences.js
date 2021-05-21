import axios from 'axios';
import { POST } from './requests';

// const apiBaseURL = 'http://u10-backend-staging.herokuapp.com/api';
const apiBaseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

const tables = [
  'games', 
  'genres', 
  'langs', 
  'player_types', 
  'miscs', 
];

export const OPTIONS = () => {
  const promises = tables.map(table => axios(`${apiBaseURL}/prefs-payload`, {
    method: 'POST',
    data: {model: table},
  }));

  return Promise.all(promises)
    .then(response => response.reduce((acc, curr, idx) => {
        acc[tables[idx]] = curr.data;
        return acc;
    },{})
  );
}

export const PREFERENCES = () => {
  return axios.get(`${apiBaseURL}/user/prefs`)
  .then(response => response.data.data.preferences);
}

export const UPDATE = (elem, diff, type) => {
  if(elem.length !== diff.length) {
    const data = {
      model: `${type}s`,
      model_id: elem
      .filter(item => !diff.includes(item))
      .concat(diff.filter(item => !elem.includes(item)))
      .pop()
      .id
    }
    
    POST('prefs', data).then(data => {
      console.log(data);
    },error => {
      console.log(error);
    })
  };
}