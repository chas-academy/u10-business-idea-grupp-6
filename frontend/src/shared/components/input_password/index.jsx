import React, { useState } from "react";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClose from "../../assets/icons/eye-close.svg";

import "./InputPassword.scss";

const InputPassword = ({ placeholder }) => {
  const [toggle, setToggle] = useState(true);

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <>
      <div className="input-password">
        <input className="input-text" type={toggle ? "password" : "text"} placeholder={placeholder} />
        <input id="toggle-pw" type="checkbox" onChange={toggleInputType} />
        <label className="toggle-label" htmlFor="toggle-pw"/>
      </div>
    </>
  );
};

export default InputPassword;

{/* <img src={toggle ? eyeOpen : eyeClose} width="40" alt="" /> */}