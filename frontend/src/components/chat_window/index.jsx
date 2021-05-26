import React, { useEffect, useState } from 'react'
import { echo, POST } from '../../shared/services/requests';
import './ChatWindow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
const ChatWindow = ({ active, matchup, closeChat, openChat }) => {

    const [inputValue, setInputValue] = useState(""),
          [messageLog, setMessageLog] = useState([]),
          [newMessages, setNewMessages] = useState([]);


    useEffect(() => {
        openChat()
        if (active) {
            if(!(messageLog.length))
            {
                POST('session/' + matchup.session.id + '/chats').then(data => {
                setMessageLog((previousState) => [...data.data.data]);
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

    useEffect(() => {
        openChat();
    }, [messageLog]);

    const submit = (e) => {
        e.preventDefault();
        POST('send/' + matchup.session.id, {
            content: inputValue,
            to_user: matchup.user[0].id
        })
        setInputValue("");
    }

    const toggleChat = () => {
        echo.leave(`Chat.${matchup.session.id}`)
        closeChat();
    }

    return (
      <>
        {active && (
          <div class="chat-modal">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="back-arrow"
              onClick={toggleChat}
            />
            <h3 className="chatwindow-title">
              {matchup.user[0].profile.display_name}
            </h3>

            <div id="chatbox" className="chatbox">
              {messageLog.map((i) => (
                <div className={parseInt(i.type) ? "received" : "sent"}>
                  <div className="chatbox-bubble">
                    <p key={i.id}>{i.content}</p>
                    <p className="chatbox-sent">{i.send_at}</p>
                  </div>
                </div>
              ))}
              {newMessages.map((i) => (
                <p key={i.id} className={i.chat.type ? "received" : "sent"}>
                  {i.content}
                </p>
              ))}
            </div>
            <div className="chatwindow">
              <form onSubmit={submit}>
                <input
                  type="text"
                  name="message"
                  onChange={(e) => setInputValue(e.target.value)}
                  className="chatwindow-textarea"
                  value={inputValue}
                  placeholder={
                    "Message " + matchup.user[0].profile.display_name
                  }
                />
              </form>
            </div>
          </div>
        )}
      </>
    );
}

export default ChatWindow