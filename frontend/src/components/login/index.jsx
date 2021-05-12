import React, { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit } from "../../shared/components/";

const Login = () => {
  const [email, setEmail] = useState(''),
        [pwd, setPwd] = useState('');

  const getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e);

  const submit = () => console.log({email,pwd});

  return (
    <>
      <h1 className="login-title">Log In Now</h1>
      <h2 className="login-sub-title">Please login to continue </h2>

      <form className="login-form">
        <Input type="email" placeholder="Email" name="email" getState={getEmail}/>
        <InputPassword getState={getPwd}/>
        <ButtonSubmit name="Login" submit={submit} />
      </form>

      <p className="login-text">Dont have an account?<Link className="login-link" to="/register">Register</Link></p>
    </>
  )
}

export default Login
