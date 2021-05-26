import React from "react";
import "./MessageError.scss";

const MessageError = ({ message }) => {
  return (
    <div className="message" >
      <div>
        {message}
      </div>
    </div>
  );
}

export default MessageError;
