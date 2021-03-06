import React, { useEffect, useState } from 'react'
import { echo, POST } from '../../shared/services/requests';
import './ChatWindow.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ChatWindow = ({ active, matchup, closeChat, openChat }) => {

  const [inputValue, setInputValue] = useState(''),
        [messageLog, setMessageLog] = useState([]),
        [newMessages, setNewMessages] = useState([]),
        [chatDisabled, setChatDisabled] = useState(false);


  useEffect(() => {
    openChat()
    if (active) {
      if (!(messageLog.length)) {
        POST('session/' + matchup.session.id + '/chats').then(data => {
          setMessageLog((previousState) => [...data.data.data]);
        });
      }

      echo
        .private(`Chat.${matchup.session.id}`)
        .listen('PrivateChatEvent', (e) => {
          const f = e;
          if (f.chat.user_id !== parseInt(localStorage.getItem('user_id'))) {
            f.chat.type = 1;
          }
          setNewMessages((previousState) => [...previousState, f]);
          openChat();
        });
    }
  }, [active])

  useEffect(() => {
    openChat();
  }, [messageLog]);

  const submit = (e) => {
    e.preventDefault();
    setChatDisabled(true)
    if(!inputValue){
      setChatDisabled(false)
    } else {
      POST('send/' + matchup.session.id, {
        content: inputValue,
        to_user: matchup.user[0].id
      }).then(() => {
        openChat()
        setChatDisabled(false)
        setInputValue("");
      }).catch(e => {
        setNewMessages((previousState) => [...previousState, {
          chat: {
            type: 1
          },
          error: true,
          content: `SYSTEM: Something went wrong, or you have been unmatched! If you refresh your browser and the chat is gone, the other user doesn't wanna talk to you anymore... :(`
        }])
        openChat();
      }) 
    }
  }

  const toggleChat = () => {
    echo
      .leave(`Chat.${matchup.session.id}`)
    closeChat();
  }

  return (
    <>
      {active && (
        <div className="chat-modal">
          <div>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="back-arrow"
              onClick={toggleChat}
            />
            <h3 className="chatwindow-title">
              <Link
                className="link"
                to={{
                  pathname: '/profile',
                  data: { user: matchup.user[0] }
                }}
              >
                {matchup.user[0].profile.display_name}
              </Link>
            </h3>
          </div>
          <div id="chatbox" className="chatbox">
            <div className="shadow"/>
            {messageLog.map((i) => (
              <div className={i.type ? "received" : "sent"}>
                <div className="chatbox-bubble">
                  <p key={i.id}>{i.content}</p>
                  <p className="chatbox-sent">{i.send_at}</p>
                </div>
              </div>
            ))}
            {newMessages.map((i) => (
              <p
                key={i.id}
                className={`${i.chat.type ? "received" : "sent"} ${i.error ? "error" : ""}`}>
                {i.content}
              </p>
            ))}
          </div>
          <div className="chatwindow">
            <form onSubmit={submit}>
              <input
                type="text"
                name="message"
                disabled={chatDisabled}
                onChange={(e) => setInputValue(e.target.value)}
                className={`chatwindow-textarea ${chatDisabled && "sending"}`}
                value={inputValue}
                placeholder={
                  (matchup.user[0].profile.display_name ? "Message " + matchup.user[0].profile.display_name : "Send Message")
                }
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow
