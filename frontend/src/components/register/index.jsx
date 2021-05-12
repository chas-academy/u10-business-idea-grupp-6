import React, { useState, useEffect } from "react";
import "./Register.scss";
import { Input, InputPassword, ButtonSubmit } from "../../shared/components/";
import { Link } from 'react-router-dom';

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
      <form>
        <Input type="text" placeholder="Username" name="name" getState={getName}/>
        <Input type="email" placeholder="Email" name="email" getState={getEmail}/>
        <InputPassword placeholder="Password" name="password" getState={getPwd}/>
        <InputPassword placeholder="Password confirmation" name="password_confirmation" getState={getPwdConf}/>
        {/* <Input type="text" placeholder="Age" />
        <Input type="text" placeholder="Full name" /> */}
        <ButtonSubmit name="Sign up" submit={submit} />
      </form>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </>
  );
};

export default Register;
