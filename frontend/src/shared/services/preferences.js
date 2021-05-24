import axios from 'axios';
import { PATCH, POST } from './requests';

const apiBaseURL = 'https://u10-backend-staging.herokuapp.com/api';

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

export const DROPDOWN = (elem, diff, type) => {

  const id = elem
  .filter(item => !diff.includes(item))
  .concat(diff.filter(item => !elem.includes(item)))
  [0]
  ?.id;

  if(id) {
    const data = {
      model: `${type}s`,
      model_id: id
    }

    POST('prefs', data).then(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}

export const SWITCH = (type, id) => {
  const data = {
    model: `${type}s`,
    model_id: id
  }

  POST('prefs', data).then(data => {
    console.log(data);
  },  error => {
    console.log(error);
  });
}

export const TIME = (from, to, interval, available) => {
  const data = {
    from: from,
    to: to,
    interval: interval,
    available: available
  }

  PATCH('times', data).then(data => {
    console.log(data);
  },  error => {
    console.log(error);
  });
}
