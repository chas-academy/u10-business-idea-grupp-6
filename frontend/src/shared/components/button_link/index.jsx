import React from 'react'
import { Link } from 'react-router-dom';
import './ButtonLink.scss'

const ButtonLink = ({name, link, classValue}) => {
  return (
    <>
      <Link to={link} className={classValue} >{name}</Link>
    </>
  )
}

export default ButtonLink;
