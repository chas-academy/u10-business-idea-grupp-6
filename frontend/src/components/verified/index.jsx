import React from 'react';
import './Verified.scss';
import { ButtonLink } from '../../shared/components';

const Verified = () => {
  return (
    <div className="verified">

      <h1>
        Email is verified succesfully!
      </h1>

      <ButtonLink
        classValue="button-link light"
        name="Setup Your Profile"
        link="#"
      />
    </div>
  )
}

export default Verified;
