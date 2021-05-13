import React, { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit } from "../../shared/components/";
import { GET, POST } from './LoginApi';

const Login = () => {
  const [email, setEmail] = useState(''),
        [pwd, setPwd] = useState('');

  const getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e);

  // const submit = () => console.log({email,pwd});
  const submit = () => {
    const data = {
      email: email,
      password: pwd,
    }
    
    POST('login', data).then(data => {
      localStorage.setItem('token', data.data.token)
    });
  };

  // this function tests the protected match route. it is only for testing purposes
  const testMatch = () => {
        GET('match').then(data => 
      console.log(data))
  }
  return (
    <>
      <h1 className="login-title">Log In Now</h1>
      <h2 className="login-sub-title">Please login to continue </h2>

      <button onClick={testMatch}>Test match</button>
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
