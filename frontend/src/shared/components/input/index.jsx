import React, {useState} from 'react';
import './Input.scss';

const Input = ({placeholder, type, name, getState}) => {
  const [value, setValue] = useState("");

  const inputValue = (input) => {
    setValue(input);
    getState(input);
  }

  return (
    <>
      <input
        className="input"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => inputValue(e.target.value)}
      />
    </>
  )
}

export default Input;