import React, { useState } from 'react';
import './ChangePassword.scss';
import { InputPassword, ButtonSubmit, MessageError, MessageSuccess, ProfileMenu } from '../../shared/components';
import { PATCH } from '../../shared/services/requests';

const ChangePassword = ({logoutHandler}) => {
  const [currentPwd, setCurrentPwd] = useState(''),
        [newPwd, setNewPwd] = useState(''),
        [newPwdConf, setNewPwdConf] = useState(''),
        [errorCurrentPwd, setErrorCurrentPwd] = useState(null),
        [errorNewPwd, setErrorNewPwd] = useState(null),
        [success, setSuccess] = useState(null)

  const getCurrentPwd = (e) => setCurrentPwd(e),
        getNewPwd = (e) => setNewPwd(e),
        getNewPwdConf = (e) => setNewPwdConf(e);

  const submit = (event) => {
    event.preventDefault();
    const data = {
      current_password: currentPwd,
      password: newPwd,
      password_confirmation: newPwdConf,
    };

    const userId = localStorage.getItem('user_id');

    PATCH(`user/${userId}/password`, data)
      .then((res) => {
        setSuccess('Password updated successfully!');
        setErrorCurrentPwd(null);
        setErrorNewPwd(null);
      })
      .catch((error) => {
        setErrorCurrentPwd(error.response.data.error.current_password);
        setErrorNewPwd(error.response.data.error.password);
        setSuccess(null);
      });
  };

  return (
    <div className="edit-password">

      <ProfileMenu
        navLink1="/your-profile"
        navLink1Name="Your profile"
        navLink2="/edit-profile"
        navLink2Name="Edit profile"
        navLink3="/preferences"
        navLink3Name="Set preferences"
        logoutHandler={logoutHandler}
      />

      <h1>Change Password</h1>

      <h2>Please fill in the details if you want to change your password</h2>

      <form onSubmit={submit}>
        {success ? <MessageSuccess message = {success} /> : errorCurrentPwd && <MessageError message={errorCurrentPwd} />}

        <InputPassword
          placeholder="Current Password"
          getState={getCurrentPwd}
          idPwd="currentPwd"
        />

        {errorNewPwd && <MessageError message={errorNewPwd} />}

        <InputPassword
          getState={getNewPwd}
          getStateConf={getNewPwdConf}
          placeholder="New Password"
          idPwd="newPwd"
        />

        <ButtonSubmit name="Update" />
      </form>
    </div>
  );
};

export default ChangePassword;
