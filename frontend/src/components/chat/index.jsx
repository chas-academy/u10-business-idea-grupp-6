import React, { useEffect, useState } from 'react';
import './Chat.scss';
import { echo, GET, POST } from '../../shared/services/requests';
import { ButtonLink, ButtonSubmit } from "../../shared/components/";
import ChatWindow from '../chat_window';

const Chat = () => {

    const [matchups, setMatchups] = useState([]),
        [activeChat, setActiveChat] = useState(null),
        [showChat, setShowChat] = useState([]),
        [userStatus, setUserStatus] = useState(null),
        [unreadCount, setUnreadCount] = useState(null);





    useEffect(() => {
        GET('match/all').then(data => {
            setMatchups(data.data);
            // Increment Count
            echo.private(`Chat.${data.data[0].session.id}`).listen('PrivateChatEvent', (e) =>
                setUnreadCount(data.data[0].session.unreadCount += 1)
            )
            setUnreadCount(data.data[0].session.unreadCount)
        })
        const uid = localStorage.getItem('user_id');


        echo.private('App.Models.User.' + uid)
            .listen(' ', (e) => {
                const newMatchup = e.matchupData.matchup;
                setMatchups((previousState) => [...previousState, newMatchup])
            });
    }, [])

    // Join Chat online/Offline

    echo.join(`Chat`).here((users) => {
        matchups.forEach(matchup => {
            users.forEach(user => {
                if (user.id == matchup.user[0].id) {
                    matchup.user[0].online = true;
                }
            })
        })
        console.log(users)
    })
        .joining((user) => {
            matchups.forEach(matchup =>
                user.id == matchup.user[0].id ? matchup.user[0].online = true : ''
            )
            console.log(user.id + ' ' + 'is Online')
            setUserStatus('Online')
        }).leaving((user) => {
            matchups.forEach(matchup =>
                user.id == matchup.user[0].id ? matchup.user[0].online = false : ''
            )
            console.log(user.id + ' ' + 'is Offline')
            setUserStatus('Offline')

        })

    const handleSetActiveChat = (matchupId, session, friendId) => {

        if (session) {
            setActiveChat(session.id);
        }
        else {
            POST('session/create', {
                friend_id: friendId
            }).then(data => {

                setActiveChat(data.data.data.id);
                const newMatchups = [...matchups];
                const index = newMatchups.findIndex(i => i.id === matchupId)
                newMatchups[index].session = data.data.data;
                setMatchups(newMatchups);
                setShowChat(true);
            });
        }
    }

    const handleCloseChat = () => setActiveChat(null);

    const handleOpenChat = () => {
        const chatbox = document.querySelector('#chatbox');
        if (chatbox) {
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }

    return (
        <>
            <h1 className="chat-title">
                Chat Room
            </h1>

            {matchups.length === 0 && <div>You have no more matches...
                <ButtonLink
                    name="Match"
                    classValue="button-link" />

            </div>}

            {matchups.map(matchup =>
                matchup &&
                <div
                    onClick={() => handleSetActiveChat(matchup.id, matchup.session, matchup.user[0].id, setUnreadCount(0))}
                    className="chat-box">
                    <img
                        src="https://image.flaticon.com/icons/png/512/1077/1077114.png"
                        width="30px"
                        className="profile-img"
                    />
                    <h1>{userStatus}</h1>
                    <h1>Messages not read: {unreadCount}</h1>

                    <p className="chat-displayname">
                        {matchup.user[0].profile.display_name}
                    </p>
                    {/* write user info here */}
                </div>
            )}
            {matchups.map(matchup =>

                <ChatWindow
                    active={(activeChat && matchup.session) && activeChat === matchup.session.id ? true : false}
                    matchup={matchup}
                    closeChat={handleCloseChat}
                    openChat={handleOpenChat}
                    key={matchup.user[0].id}
                />

            )}
        </>
    )
}

export default Chat
