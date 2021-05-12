import React from 'react'
import axios from 'axios'

const RegisterAPI = () => {


const getData = () => {

}

  // Bäst?
  const sendData = async () => {
    try {
        const res = await axios.post("http://", {
            headers: {
                'authorization': 'Bearer...'
            }
        }, getData());
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return <div></div>;
}

export default RegisterAPI;
