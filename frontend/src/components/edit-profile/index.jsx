import React, { useState } from "react";
import "./EditProfile.scss";
import { Link } from "react-router-dom";
import {
  Input,
  InputDropdown,
  Textarea,
  ButtonSubmit,
  MessageError,
} from "../../shared/components/";
import { PATCH } from "../../shared/services/requests";

const EditProfile = () => {
  const [displayName, setDisplayName] = useState(''),
        [country, setCountry] = useState(''),
        // [imgPath, setImgPath] = useState(''),
        [body, setBody] = useState('');

  const getDisplayName = (e) => setDisplayName(e),
        getCountry = (e) => setCountry(e),
        // getImgPath = (e) => setImgPath(e),
        getBody = (e) => setBody(e);

  const submit = (event) => {
    console.log(event.target[0].value);
    event.preventDefault();
    const data = {
      display_name: displayName,
      country: country,
      // img_path: imgPath,
      body: body,
    };

    PATCH("/user/{user}", data)
      .then((data) => {
        console.log(data);
        // localStorage.setItem("token", data.data.token);
      })
      .catch((error) => {
        console.log(error);
        // setError(error.response.data.message);
      });
  };

  return (
    <>
      <h1 className="profile-title">Edit Profile</h1>
      <h2 className="profile-sub-title">This is your public profile that other people can see</h2>

      <form className="profile-form" onSubmit={submit}>
        {/* {errorEmail && <MessageError message = {errorEmail}/>} */}

        <Input
          type="text"
          placeholder="Display Name"
          name="display_name"
          getState={getDisplayName}
        />

        <InputDropdown />

        <Input
          type="text"
          placeholder="Country"
          name="country"
          getState={getCountry}
        />

        <Textarea
          name="body"
          placeholder="Write something about yourself..."
          getState={getBody}
        />

        <ButtonSubmit name="Save Profile" />
      </form>
    </>
  );
};

export default EditProfile;
