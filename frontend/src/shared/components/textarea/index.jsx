import React, { useState } from 'react';
import './Textarea.scss';

const Textarea = ({ placeholder, name, getState, currentValue }) => {
  const [value, setValue] = useState('');

  const inputValue = (input) => {
        setValue(input);
        getState(input);
  };

  return (
    <>
      <textarea
        className="textarea"
        name={name}
        placeholder={placeholder || value}
        value={currentValue}
        onChange={(e) => inputValue(e.target.value)}
      />
    </>
  );
};

export default Textarea;
