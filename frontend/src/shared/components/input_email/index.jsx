import React from 'react'
import './InputEmail.scss';

const InputEmail = ({placeholder}) => {
    return (
        <>
            <input type="email" className="input-email" placeholder={placeholder}/>
        </>
    )
}

export default InputEmail;
