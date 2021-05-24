import React from 'react';
import './MessageError.scss';

const MessageError = ({ message }) => {
  return (
    <>
      <div className='message'>
        {message}
      </div>
    </>
  );
};

export default MessageError;
