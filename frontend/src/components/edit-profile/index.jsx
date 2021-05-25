import React, { useState, useEffect } from 'react';
import './EditProfile.scss';
// import { Link } from "react-router-dom";
import {
  Input,
  InputDropdown,
  Textarea,
  ButtonSubmit,
  MessageError,
  Modal,
} from '../../shared/components/';
import { PATCH, GET } from '../../shared/services/requests';

const EditProfile = () => {
  const [displayName, setDisplayName] = useState(''),
        [oldDisplayName, setOldDisplayName] = useState(''),
        // [country, setCountry] = useState(""),
        // [imgPath, setImgPath] = useState(''),
        [body, setBody] = useState(''),
        [errorDisplayName, setErrorDisplayName] = useState(null);

  const getDisplayName = (e) => setDisplayName(e),
        // getCountry = (e) => setCountry(e),
        // getImgPath = (e) => setImgPath(e),
        getBody = (e) => setBody(e);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    GET(`user/${userId}`)
      .then((data) => {
        setOldDisplayName(data.data.display_name);
        setDisplayName(data.data.display_name);
        setBody(data.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const data = {
      // country: country,
      // img_path: imgPath,
      body: body,
    };

    if (displayName !== oldDisplayName) {
      data.display_name = displayName;
    }

    PATCH(`user/${userId}`, data)
      .then((data) => {
        console.log('Profile successfully updated!');
      })
      .catch((error) => {
        console.log(error);
        setErrorDisplayName(error.response.data.error.display_name);
      });
  };

  return (
    <>
      <h1 className="profile-title">
        Edit Profile
      </h1>

      <h2 className="profile-sub-title">
        This is your public profile that other people can see
      </h2>

      <form className="profile-form" onSubmit={submit}>

        {errorDisplayName && <MessageError message={errorDisplayName} />}

        <Input
          type="text"
          placeholder="Display Name"
          currentValue={displayName}
          name="display_name"
          getState={getDisplayName}
        />

        {/* <InputDropdown />

        <Input
          type="text"
          placeholder="Country"
          name="country"
          getState={getCountry}
        /> */}

        <Modal
          modalContent="Hello Modal!"
          openModalBtnClass="button-modal"
          closeModalBtnClass="button-modal"
        />

        <Textarea
          name="body"
          placeholder="Write something about yourself..."
          currentValue={body}
          getState={getBody}
        />

        <ButtonSubmit name="Update Profile" />

      </form>
    </>
  );
};

export default EditProfile;

//<a href="https://www.freepik.com/vectors/hand">Hand vector created by freepik - www.freepik.com</a>
