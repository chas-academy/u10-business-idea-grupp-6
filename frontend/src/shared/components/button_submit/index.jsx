import React from 'react';
import './ButtonSubmit.scss';

const ButtonSubmit = ({ name, id }) => {
  return (
    <div className="button-submit">
      <label htmlFor={id}>
        {name}
      </label>
      <button
        type="submit"
        id={id}>{name}
      </button>
    </div>
  );
};

export default ButtonSubmit;
