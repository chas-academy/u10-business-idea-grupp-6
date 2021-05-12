import React from 'react'
import './InputPassword.scss';

const InputPassword = ({placeholder}) => {
    return (
        <>
            <input type="password" className="input-password" placeholder={placeholder}/>
        </>
    )
}

export default InputPassword;
