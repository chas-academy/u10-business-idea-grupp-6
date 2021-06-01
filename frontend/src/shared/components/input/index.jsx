import React, { useState } from 'react';
import './Input.scss';

const Input = ({ placeholder, type, name, getState, currentValue, id }) => {
  const [value, setValue] = useState('');

  const inputValue = (input) => {
    setValue(input);
    getState(input);
  };

  return (
    <div className="input">
      <label htmlFor={id}>
        {placeholder}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={currentValue || value}
        onChange={(e) => inputValue(e.target.value)}
        id={id}
      />
    </div>
  );
};

export default Input;
