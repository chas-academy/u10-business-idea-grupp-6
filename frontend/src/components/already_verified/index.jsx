import React from 'react';
import "./AlreadyVerified.scss";
import { ButtonLink } from "../../shared/components";

const AlreadyVerified = () => {
  return (
    <div className="already-verified">

      <h1>
        Email is already verified
      </h1>

      <ButtonLink
        classValue="button-link light"
        name="Setup Your Profile"
        link="#"
      />
    </div>
  )
}

export default AlreadyVerified;