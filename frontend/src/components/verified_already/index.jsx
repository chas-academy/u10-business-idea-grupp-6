import React from 'react';
import './VerifiedAlready.scss';
import { ButtonLink } from "../../shared/components";

const VerifiedAlready = () => {
  return (
    <>
      <h1 className="verified-title">Email is already verified</h1>

      <div className="verified-container">
        <ButtonLink classValue="button-link light" name="Setup Your Profile" link="#"/>
      </div>
    </>
  )
}

export default VerifiedAlready;