import React, { useEffect, useReducer, useState } from 'react';
import './Chat.scss';
import { echo, GET, POST } from '../../shared/services/requests';
import { ButtonLink, ButtonSubmit } from "../../shared/components/";
import ChatWindow from '../chat_window';
import ChatMatchupBox from '../chat_matchup_box';

const Chat = () => {

    const [matchups, setMatchups] = useState([]),
        [activeChat, setActiveChat] = useState(null),
        [showChat, setShowChat] = useState([]),
        [userStatus, setUserStatus] = useState(null),//dessa två kommer aldrig fungera, pga de är globala för alla samtidigt
        [unreadCount, setUnreadCount] = useState(null),//dessa två kommer aldrig fungera, pga de är globala för alla samtidigt
        [users, setUsers] = useState([]),
        [usersOnline, setUsersOnline] = useState([]);

        // man skulle kunna hantera unreadCount och userStatus i en useReducer
        // som man sen mappar över för att skapa komponenterna.
        // const matchupsReducer = (state, action) => {
        //     switch(action.type){
        //         case 'LOAD_ALL':
        //             console.log(state)
        //             return [...state, action.payload];
        //             break;
        //         case 'NEW_MATCHUP':
        //             return [...state, action.payload];
        //             break;
        //     }
        // }
        // const [matchups, dispatchMatchups] = useReducer(matchupsReducer, []);

    const handleSetReadMessages = (id) => {

        
        setMatchups((previousState) => previousState.reduce((prev, curr, i) => {
            if(curr.id === id){
                console.log(curr)
                curr.session.unreadCount = 0;
            }
            prev.push(curr);
            console.log(prev)
            return prev;
        }, []));
    }
    useEffect(() => {
        GET('match/all').then(data => {
            // dispatchMatchups({type: 'LOAD_ALL', payload: data.data});
            setMatchups(data.data);
            // Increment Count
            // echo.private(`Chat.${data.data[0].session.id}`).listen('PrivateChatEvent', (e) =>
            //     setUnreadCount(data.data[0].session.unreadCount += 1)
            // )
            // setUnreadCount(data.data[0].session.unreadCount)
        })
        const uid = localStorage.getItem('user_id');


        echo.private('App.Models.User.' + uid)
            .listen(' ', (e) => {
                const newMatchup = e.matchupData.matchup;
                // dispatchMatchups({type: 'NEW_MATCHUP', payload: newMatchup});
                setMatchups((previousState) => [...previousState, newMatchup])
            });

        echo.join(`Chat`).here((users) => {

            matchups.forEach(matchup => {
                users.forEach(user => {
                    if (user.id == matchup.user[0].id) {
                        matchup.user[0].online = true;
                    }
                })
            })
            console.log(users)
            setUsers(users);
            setUsersOnline(users);
        })
            .joining((user) => {
                if(usersOnline.find(i => i.id === user.id) === undefined)
                {
                    setUsersOnline((previousState) => [...previousState, user]);
                }
                // matchups.forEach(matchup =>
                //     matchup.user[0].online = user.id == matchup.user[0].id
                // )
                console.log(user.id + ' ' + 'is Online')
                // console.log(user)
                // setUserStatus('Online')
            }).leaving((user) => {
                if(usersOnline.find(i => i.id === user.id) !== undefined)
                {
                    setUsersOnline((previousState) => previousState.filter(i => i.id !== user.id))
                }
                // matchups.forEach(matchup =>
                //     matchup.user[0].online = user.id != matchup.user[0].id
                // )
                console.log(user.id + ' ' + 'is Offline')
                // setUserStatus('Offline')
            })
    }, [])

    // Join Chat online/Offline



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
                // dispatchMatchups({type: 'LOAD_ALL', payload: newMatchups});
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


    useEffect(() => {
        console.log(matchups)
        
    }, [matchups])
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
                <>
                <div
                    onClick={() => handleSetActiveChat(matchup.id, matchup.session, matchup.user[0].id, setUnreadCount(0))}
                    className="chat-box">
                    <img
                        src="https://image.flaticon.com/icons/png/512/1077/1077114.png"
                        width="30px"
                        className="profile-img"
                    />
                    
                    <h1>{matchup.user[0].online ? "true" : "False"}</h1>
                    {/* <h1>Messages not read: {unreadCount}</h1> */}

                    <p className="chat-displayname">
                        {matchup.user[0].profile.display_name}
                    </p>
                    {/* write user info here */}
                </div>
                <ChatMatchupBox matchup={matchup} users={usersOnline} 
                />
                </>
            )}
            {matchups.map(matchup =>

                <ChatWindow
                    active={(activeChat && matchup.session) && activeChat === matchup.session.id ? true : false}
                    matchup={matchup}
                    closeChat={handleCloseChat}
                    openChat={handleOpenChat}
                    readChat={handleSetReadMessages}
                    key={matchup.user[0].id}
                />

            )}
        </>
    )
}

export default Chat
