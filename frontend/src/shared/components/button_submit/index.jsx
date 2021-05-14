import React from 'react'
import './ButtonSubmit.scss';

const ButtonSubmit = ({name}) => {
  return (
    <>
      <button className="button-submit" type="submit">{name}</button>
    </>
  )
}

export default ButtonSubmit;
