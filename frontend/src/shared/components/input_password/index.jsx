import React, { useState } from "react";
import "./InputPassword.scss";

const InputPassword = ({ getState, getStateConf }) => {
  const [toggle, setToggle] = useState(true),
        [pwdValue, setPwdValue] = useState(''),
        [pwdConfValue, setPwdConfValue] = useState('');

  const inputValue = (input) => {
    setPwdValue(input);
    getState(input);
  };

  const inputConfValue= (input) => {
    setPwdConfValue(input);
    getStateConf(input);
  };

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <div className="input-password">
        <input 
          name="password" 
          className="input-text" 
          type={toggle ? "password" : "text"} 
          placeholder="Password"
          value={pwdValue}
          onChange={e => inputValue(e.target.value)}
          />
        <input id="toggle-hidden" type="checkbox" onChange={toggleInputType} />
        <label className="toggle-label" htmlFor="toggle-hidden"/>
      </div>

      { getStateConf && 
        <div className="input-password">
          <input 
            name="password_confirmation" 
            className="input-text" 
            type={toggle ? "password" : "text"} 
            placeholder="Password Confirmation"
            value={pwdConfValue}
            onChange={e => inputConfValue(e.target.value)}
          />
        </div>
      }  
    </>
  );
};

export default InputPassword;