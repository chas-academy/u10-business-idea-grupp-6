import React, { useEffect, useState } from 'react'
import { echo } from '../../services/requests';

const Notification = ({ auth }) => {

    useEffect(() => {
        if (auth) {
            const uid = localStorage.getItem('user_id');
            console.log('subscribing to echo for user ' + uid)
            echo.private('App.Models.User.' + uid)
                .listen('MatchupSuccessful', (e) => {
                    console.log(e.matchup.users)
                    const otherUser = e.matchup.users.find(user => user.id !== parseInt(uid))
                    console.log(otherUser)
                    setMessage(`
                    You have a new match! Their name is ${otherUser.name}
                    `)
                });
        }
    }, [auth])


    const [isShown, setIsShown] = useState(false),
        [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            setIsShown(true);
            setTimeout(() => setIsShown(false), 5000);
        }
    }, [message])

    return (
        message && isShown && <div id="notification">
            {message}
        </div>
    )
}

export default Notification;