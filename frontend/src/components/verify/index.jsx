import React from "react";
import "./Verify.scss";
import { ButtonSubmit } from "../../shared/components";

const Verify = () => {

  const submit = () => console.log("This is just a placeholder");

  return (
    <>
      <h1 className="verify-title">Verify your email</h1>
      <p className="verify-text">
        Please click on the link that has just been sent to your email account to verify your email and contiune the registration process.
      </p>

      <div className="verify-container">
        <ButtonSubmit name="Send Email Again" submit={submit} />
      </div>
    </>
  );
};

export default Verify;
