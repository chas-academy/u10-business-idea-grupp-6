import React, { useState, useEffect } from 'react';
import './Switch.scss';
import { POST, GET } from "../../services/requests";

const Switch = ({name, type, moduleId}) => {
  const [selectValue, setSelectValue] = useState([]);

  useEffect(() => { 
    GET('user/prefs').then(response => {
      const values = response.data.data.preferences[type].reduce((acc, curr) => {
        const value = {
          value: curr[type.slice(0, -1)],
          label: curr[type.slice(0, -1)],
          id: curr.id
        }
        acc.push(value)
        return acc;
      }, []);
      
      setSelectValue(values);
    })
  }, []);

  const handleChange = () => {
    const data = {
      model: type,
      model_id: moduleId
    }

    POST('prefs', data).then(data => {
      console.log(data);
    })
  }

  return (
    <div className="switch-container">
        <input 
          className="switch-checkbox"
          type="checkbox" 
          id={name} 
          onChange={handleChange}
        />

        <label className="switch-checkbox-label" htmlFor={name}>
          {name}
        </label>
    </div>
  )
}

export default Switch;
