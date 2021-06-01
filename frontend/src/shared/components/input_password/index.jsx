import React, { useState } from 'react';
import './InputPassword.scss';

const InputPassword = ({ getState, getStateConf, placeholder, idPwd }) => {
  const [toggle, setToggle] = useState(true),
        [pwdValue, setPwdValue] = useState(''),
        [pwdConfValue, setPwdConfValue] = useState('');

  const inputValue = (input) => {
    setPwdValue(input);
    getState(input);
  };

  const inputConfValue = (input) => {
    setPwdConfValue(input);
    getStateConf(input);
  };

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="input-password">
      <div>
        <input
          name="password"
          type={toggle ? "password" : "text"}
          placeholder={placeholder}
          value={pwdValue}
          onChange={(e) => inputValue(e.target.value)}
          maxLength="255"
        />

        <input
          id={idPwd}
          type="checkbox"
          onChange={toggleInputType}
        />

        <label
          htmlFor={idPwd}
        />

      </div>

      { getStateConf &&
        <div>
          <input
            name="password_confirmation"
            type={toggle ? "password" : "text"}
            placeholder="Password Confirmation"
            value={pwdConfValue}
            onChange={(e) => inputConfValue(e.target.value)}
            maxLength="255"
          />
        </div>
      }
    </div>
  );
};

export default InputPassword;
