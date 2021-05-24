import React, { useEffect, useState } from 'react'
import { echo, POST } from '../../shared/services/requests';
import './ChatWindow.scss';

const ChatWindow = ({ active, matchup }) => {
    // console.log('active is', active, matchup)

    // 
    const [inputValue, setInputValue] = useState(""),
          [messageLog, setMessageLog] = useState([]),
          [newMessages, setNewMessages] = useState([]);

    useEffect(() => {
        if (active) {
            if(!(messageLog.length))
            {
                POST('session/' + matchup.session.id + '/chats').then(data => {
                // console.log(data.data.data)
                setMessageLog((previousState) => [...data.data.data]);
                console.log(data)
                });
            }
            console.log('subscribing to session chat ' + matchup.session.id)
            
            
            echo.private(`Chat.${matchup.session.id}`).listen('PrivateChatEvent', (e) => {
                const f = e;
                if (f.chat.user_id !== parseInt(localStorage.getItem('user_id')))
                {
                    f.chat.type = 1;
                }
                setNewMessages((previousState) => [...previousState, f]);
            })
        }
    }, [active])

    // use this for debugging
    // 
    // useEffect(() => {
    //     console.log(messageLog, newMessages)
    // }, [messageLog, newMessages])

    const submit = (e) => {
        e.preventDefault();
        POST('send/' + matchup.session.id, {
            content: inputValue,
            to_user: matchup.user[0].id
        })
        setInputValue("");
    }
    return <>
        {active &&
            <div>
                <h1 className="chatwindow-title">
                    {matchup.user[0].profile.display_name}
                </h1>

                <div className="chatbox">
                    {messageLog.map(i => 
                        <div className={parseInt(i.type) ?  "received" : "sent"}>
                            <div className="chatbox-bubble">
                                <p key={i.id}
                                >
                                {i.content}
                                </p>
                                <p className="chatwindow-sent">
                                {i.send_at}
                                </p>
                        </div>
                </div>
                

                )}
                {newMessages.map(i => 
                    
                        <p key={i.id}
                        className={i.chat.type ? "received" : "sent"}
                        >
                        {i.content}
                        </p>
                    
                    )}
                    </div>
                    <div className="chatwindow">
                        <form onSubmit={submit}>

                            <input 
                                type="text" 
                                name="message" 
                                onChange={(e) => setInputValue(e.target.value)} 
                                className="chatwindow-textarea"
                                value={inputValue}
                                placeholder="Send message"
                            />
                    </form>
                </div>
            </div>
        }

    </>
}

export default ChatWindow