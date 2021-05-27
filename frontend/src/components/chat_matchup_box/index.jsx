import React, { useEffect, useState } from 'react'
import { echo } from '../../shared/services/requests';

const ChatMatchupBox = ({
    matchup,
    users
}) => {
    const [userStatus, setUserStatus] = useState(false),
          [unreadCount, setUnreadCount] = useState(null),
          [session, setSession] = useState(null),
          [listeningToChat, setListeningToChat] = useState(false);

    useEffect(()=>{
        
        if(matchup.session !== null)
        {
            console.log('unread count in parent is ', matchup.session.unreadCount)
            setUnreadCount(matchup.session.unreadCount)

            console.log('setting session to: ', matchup.session)
            setSession(matchup.session)


        }
    }, [matchup])

    useEffect(() => {
        if (session)
        {
            
            setUnreadCount(matchup.session.unreadCount)
            console.log('setting unread count to ', matchup.session.unreadCount)
            if(!listeningToChat)
            {
                console.log('setting up ws connection')
                setListeningToChat(true)
                echo.private(`Chat.${matchup.session.id}`).listen('PrivateChatEvent', (e) => {

                    if(e.chat.user_id !== parseInt(localStorage.getItem('user_id')))
                    setUnreadCount(matchup.session.unreadCount += 1)
                });
            }
        }
    }, [session])

    useEffect(() => {
        // if(session)
        // {
        //     echo.private(`Chat.${matchup.session.id}`).listen('PrivateChatEvent', (e) =>{
        //     console.log(e);
        //     setUnreadCount(matchup.session.unreadCount += 1)
        // }
        // )
        // }
    }, [])

    useEffect(()=>{
        
        setUserStatus(users.find(user => user.id === matchup.user[0].id) !== undefined)
        console.log('setting users status to ', userStatus)
    }, [users])
    useEffect(()=>{
        // console.log(matchup, userStatus, unreadCount, session)
    })

    return (
        <div>
            {userStatus ? "Online" : "Offline"}
         {unreadCount}
        </div>
    )
}

export default ChatMatchupBox
