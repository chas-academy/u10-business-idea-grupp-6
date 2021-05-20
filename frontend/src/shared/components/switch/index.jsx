import React from 'react';
import './Switch.scss';

const Switch = ({name}) => {
  return (
    <div className="switch-container">
        <input 
          className="switch-checkbox"
          type="checkbox" 
          id={name} 
        />

        <label className="switch-checkbox-label" htmlFor={name}>
          {name}
        </label>
    </div>
  )
}

export default Switch;
