import React from "react";
import "./MessageError.scss";

function MessageError({ message }) {
  return (
    <>
      <div 
        className="message" 
        >
        {message}
      </div>
    </>
  );
}

export default MessageError;
