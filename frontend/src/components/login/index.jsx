import React, { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit, MessageError } from "../../shared/components/";
import { POST } from '../../shared/services/requests';

const Login = () => {
  const [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [error, setError] = useState(null);

  const getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e);

    const submit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: pwd,
    }
    
    POST('login', data).then(data => {
      localStorage.setItem('token', data.data.token)
    }).catch(err =>{
      console.log(err.response.data.message)
      setError(err.response.data.message);
    })
    
  };

  return (
    <>
      <h1 className="login-title">
        Log In Now
      </h1>
      <h2 className="login-sub-title">
        Please login to continue
      </h2>

      <form 
        className="login-form"
        onSubmit={submit}
      >
        {error && <MessageError message = {error}/>}
        
        <Input
          type="email"
          placeholder="Email"
          name="email"
          getState={getEmail}
        />

        <InputPassword
          getState={getPwd}
        />

        <ButtonSubmit 
          name="Login" 
        />

      </form>

      <p className="login-text">
        Dont have an account?
        <Link
          className="login-link"
          to="/register"
        >
          Register
        </Link>
      </p>
    </>
  )
}

export default Login;