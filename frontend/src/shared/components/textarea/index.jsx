import React, { useState } from 'react';
import './Textarea.scss';

const Textarea = ({ placeholder, name, getState, currentValue }) => {
  const [value, setValue] = useState('');

  const inputValue = (input) => {
        setValue(input);
        getState(input);
  };

  return (
    <div className="textarea">
      <textarea
        name={name}
        placeholder={placeholder}
        value={currentValue || value}
        onChange={(e) => inputValue(e.target.value)}
      />
    </div>
  );
};

export default Textarea;
