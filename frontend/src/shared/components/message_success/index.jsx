import React from 'react';
import './MessageSuccess.scss';

const MessageSuccess = ({ message }) => {
  return (
    <>
      <div className="message-success">
        {message}
      </div>
    </>
  )
}

export default MessageSuccess;
