import React, { useState } from 'react';
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';
import {
  Input,
  InputPassword,
  ButtonSubmit,
  MessageError,
} from '../../shared/components/';
import { echo, POST } from '../../shared/services/requests';

const Login = ({ getToken }) => {
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
      password: pwd,
    };

    POST('login', data)
      .then((data) => {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user.id);
        getToken(localStorage.getItem('token'));

        echo
          .private('App.Models.User.' + localStorage.getItem('user_id'))
          .listen('MatchupSuccessful', (e) => {
            // if you get a match, will print to console
            console.log(e);
          });

        setRedirect(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  if (redirect) return <Redirect to="/preferences" />;

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

        {error && <MessageError message={error} />}

        <Input
          type="email"
          placeholder="Email"
          name="email"
          getState={getEmail}
        />

        <InputPassword
          getState={getPwd}
          placeholder="Password"
          idPwd="pwd"
        />

        <ButtonSubmit name="Login" />

      </form>

      <p className="login-text">
        Dont have an account?
        <Link
          className="login-link"
          to="/register">
          Register
        </Link>
      </p>
    </>
  );
};

export default Login;
