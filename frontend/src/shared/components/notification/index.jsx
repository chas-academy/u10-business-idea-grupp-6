import React, { useEffect, useState } from 'react'
import { echo } from '../../services/requests';
import './Notification.scss';
const Notification = ({ auth }) => {

    useEffect(() => {
        if (auth) {
            const uid = localStorage.getItem('user_id');
            console.log('subscribing to echo for user ' + uid)
            echo.private('App.Models.User.' + uid)
                .listen('MatchupSuccessful', (e) => {
                    console.log(e)
                    const otherUser = e.matchupData.users.find(user => user.id !== parseInt(uid))
                    setMessage(`
                    You have a new match! Their name is ${otherUser.profile.display_name || "hidden..."}
                    `);
                });
        }
    }, [auth]);

    const [isShown, setIsShown] = useState(false),
          [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            setIsShown(true);
            setTimeout(() => {
                setIsShown(false);
                setMessage("");
            }, 5000);
        }
    }, [message])

    return (
        message && isShown && <div id="notification">
            {message}
        </div>
    )
}

export default Notification;