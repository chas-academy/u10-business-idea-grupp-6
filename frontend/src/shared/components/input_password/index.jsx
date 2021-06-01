import React, { useState } from "react";
import "./InputPassword.scss";

const InputPassword = ({ getState, getStateConf, placeholder, idPwd, idToggleText, idPwdConf }) => {
  const [toggle, setToggle] = useState(true),
        [pwdValue, setPwdValue] = useState(""),
        [pwdConfValue, setPwdConfValue] = useState("");

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
        <label htmlFor={idPwd}>
          {placeholder}
        </label>

        <input
          name="password"
          type={toggle ? "password" : "text"}
          placeholder={placeholder}
          value={pwdValue}
          onChange={(e) => inputValue(e.target.value)}
          id={idPwd}
        />

        <input
          id={idToggleText}
          type="checkbox"
          onChange={toggleInputType}
        />

        <label
          htmlFor={idToggleText}
          aria-label="Show/hide password"
        />

      </div>

      {getStateConf && (
        <div>
          <label htmlFor={idPwdConf}>
            Password Confirmation
          </label>
          <input
            name="password_confirmation"
            type={toggle ? "password" : "text"}
            placeholder="Password Confirmation"
            value={pwdConfValue}
            onChange={(e) => inputConfValue(e.target.value)}
            id={idPwdConf}
          />
        </div>
      )}
    </div>
  );
};

export default InputPassword;
