import React, { useState } from 'react';
import './Textarea.scss';

const Textarea = ({ placeholder, name, getState, currentValue, id }) => {
  const [value, setValue] = useState('');

  const inputValue = (input) => {
        setValue(input);
        getState(input);
  };

  return (
    <div className="textarea">
      <label htmlFor={id}>
        {placeholder}
      </label>
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        value={currentValue || value}
        onChange={(e) => inputValue(e.target.value)}
      />
    </div>
  );
};

export default Textarea;
