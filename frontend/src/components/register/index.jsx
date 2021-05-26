import React, { useState } from "react";
import "./Register.scss";
import { Link, Redirect } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit, MessageError } from "../../shared/components/";
import { POST } from "../../shared/services/requests";

const Register = ({getToken, getAuthLoading}) => {
  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [pwd, setPwd] = useState(''),
        [pwdConf, setPwdConf] = useState(''),
        [redirectVerify, setRedirectVerify] = useState(false),
        [errorEmail, setErrorEmail] = useState(null),
        [errorPwd, setErrorPwd] = useState(null);


  const getName = (e) => setName(e),
        getEmail = (e) => setEmail(e),
        getPwd = (e) => setPwd(e),
        getPwdConf = (e) => setPwdConf(e);
  
  const submit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      password: pwd,
      password_confirmation: pwdConf
    }
    
    getAuthLoading(true);
    POST('register', data).then(data => {
      getAuthLoading(false);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user_id', data.data.user.id);
      localStorage.setItem('timezone_offset', data.data.user.timezone_offset);
      
      getToken(localStorage.getItem('token'));
      setRedirectVerify(true);
    }).catch(error => {
      getAuthLoading(false);
      setErrorEmail(error.response.data.errors.email);
      setErrorPwd(error.response.data.errors.password);
    })
  };

  if(redirectVerify) return <Redirect to="/verify"/>;
  
  return (
    <div className="register">
      <h1>
        Sign Up Now
      </h1>

      <h2>
        Please fill in the details and create an account
      </h2>

      <form 
        onSubmit={submit}>

        <Input 
          type="text"
          placeholder="Name"
          name="name"
          getState={getName}
        />

        {errorEmail && <MessageError message = {errorEmail}/>}
        
        <Input 
          type="email"
          placeholder="Email"
          name="email"
          getState={getEmail}
        />
        
        {errorPwd && <MessageError message = {errorPwd}/>}

        <InputPassword
          getState={getPwd}
          getStateConf={getPwdConf}
          placeholder="Password"
          idPwd="pwd"
        />

        <ButtonSubmit name="Register" />

      </form>

      <p>
        Already have an account?
        <Link
          className="link"
          to="/login"
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
