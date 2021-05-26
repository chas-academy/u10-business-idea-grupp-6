import React, { useState, useEffect } from 'react';
import './Switch.scss';
import { SWITCH } from '../../services/preferences';

const Switch = ({ type, data, defaults }) => {
  useEffect(() => {
    document.getElementById(data[type]).checked = defaults?.some(
      (elem) => elem.id === data.id
    );
  }, [defaults]);

  const handleChange = (event) => SWITCH(type, data.id);

  return (
    <div className="switch">
        <input 
          type="checkbox" 
          id={data[type]} 
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor={data[type]}>
          {data[type]}
        </label>
    </div>
  );
};

export default Switch;
