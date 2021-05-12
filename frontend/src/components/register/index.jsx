import React, { useState } from "react";
import "./Register.scss";
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit } from "../../shared/components/";

const Register = () => {
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [pwdConf, setPwdConf] = useState('');

  const getName = (e) => setName(e),
        getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e),
        getPwdConf = (e) => setPwdConf(e);

  const submit = () => console.log({name,email,pwd,pwdConf});
  
  return (
    <>
      <h1 className="title">Sign Up Now</h1>
      <h2 className="sub-title">Please fill in the details and create an account</h2>

      <form className="form">
        <Input type="text" placeholder="Username" name="name" getState={getName}/>
        <Input type="email" placeholder="Email" name="email" getState={getEmail}/>
        <InputPassword getState={getPwd} getStateConf={getPwdConf}/>
        <ButtonSubmit name="Sign up" submit={submit} />
      </form>

      <p className="link-text">Already have an account?<Link className="link" to="/login">Log In</Link></p>
    </>
  );
};

export default Register;
