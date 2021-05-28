import React from 'react'
import './MessageSuccess.scss';

const MessageSuccess = ({ message }) => {
    return (
        <div>
            <div className="message-success">
                <div>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default MessageSuccess
