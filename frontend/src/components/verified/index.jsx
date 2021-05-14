import React from 'react';
import './Verified.scss';
import { ButtonLink } from "../../shared/components";

const Verified = () => {
  return (
    <>
      <h1 className="verified-title">
        Email is verified succesfully!
      </h1>

      <div className="verified-container">
        <ButtonLink 
          classValue="button-link light" 
          name="Setup Your Profile" 
          link="#"
        />
      </div>
    </>
  )
}

export default Verified;