import React from 'react';
import './ButtonSubmit.scss';

const ButtonSubmit = ({name}) => {
  return (
    <div className="button-submit">
      <button type="submit">
        {name}
      </button>
    </div>
  )
}

export default ButtonSubmit;