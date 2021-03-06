import React, { useState } from 'react';
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit, MessageError } from "../../shared/components/";
import { POST } from '../../shared/services/requests';

const Login = ({getToken, getAuthLoading}) => {
  const [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [error, setError] = useState(null),
        [redirect, setRedirect] = useState(false);

  const getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e);

  const submit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: pwd
    }
    
    getAuthLoading(true);
    POST('login', data)
      .then(data => {
        getAuthLoading(false);
        setRedirect(true);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user.id);
        localStorage.setItem('timezone_offset', data.data.user.timezone_offset);
      
        getToken(localStorage.getItem('token'));
      })
      .catch(error => {
        getAuthLoading(false);
        setError(error.response.data.message);
      })
  };

  if(redirect) return <Redirect to="/"/>;

  return (
    <div className="login">
      <h1>
        Log In Now
      </h1>

      <h2>
        Please login to continue
      </h2>

      <form 
        onSubmit={submit}
      >
        {error && <MessageError message = {error}/>}
        
        <Input
          type="email"
          placeholder="Email"
          name="email"
          getState={getEmail}
          id="login-email"
        />

        <InputPassword
          getState={getPwd}
          placeholder="Password"
          idPwd="pwd"
          id="login-password"
        />

        <ButtonSubmit 
          name="Login"
          id="login-btn"
        />

      </form>

      <p>
        Dont have an account?
        <Link
          className="link"
          to="/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
