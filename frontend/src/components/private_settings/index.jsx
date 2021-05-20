import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./PrivateSettings.scss";
import { Link } from 'react-router-dom';
import { Input, InputPassword, ButtonSubmit, MessageError } from "../../shared/components/";
import { PATCH } from "../../shared/services/requests";

const PrivateSettings = () => {
  const [currentPwd, setCurrentPwd] = useState(''),
        [newPwd, setNewPwd] = useState(''),
        [newPwdConf, setNewPwdConf] = useState(''),
        [errorCurrentPwd, setErrorCurrentPwd] = useState(null),
        [errorNewPwd, setErrorNewPwd] = useState(null);


  const getCurrentPwd = (e) => setCurrentPwd(e),
    getNewPwd = (e) => setNewPwd(e),
    getNewPwdConf = (e) => setNewPwdConf(e);

  const submit = (event) => {
    event.preventDefault();
    const data = {
      current_password: currentPwd,
      password: newPwd,
      password_confirmation: newPwdConf,
    }

    const userId = localStorage.getItem('user_id');

    PATCH(`user/${userId}/password`, data).then(res => {
      console.log('Success!!')
    }).catch(error => {
      setErrorCurrentPwd(error.response.data.error.current_password)
      setErrorNewPwd(error.response.data.error.password)
    });
  };

  return (
    <>
      <h1 className="edit-title">
        Change Password
      </h1>

      <h2 className="edit-sub-title">
        Please fill in the details if you want to change your password
      </h2>

      <form
        className="edit-form"
        onSubmit={submit}>

        {errorCurrentPwd && <MessageError message={errorCurrentPwd} />}

        <InputPassword
          placeholder="Current Password"
          getState={getCurrentPwd}
          get
        />
utPassword, Password 
        
        <InputPassword 
          getState={getNewPwd}
          getStateConf={getNewPwdConf}
        />getStateConf={getNewPwdConf}
        />

        <ButtonSubmit name="Update" />

      </form>

    </>
  );
};

export default PrivateSettings;