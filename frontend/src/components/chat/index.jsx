import React, { useEffect, useState } from 'react';
import './Chat.scss';
import { echo, GET, POST } from '../../shared/services/requests';
import { ButtonLink, ButtonSubmit } from "../../shared/components/";
import ChatWindow from '../chat_window';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {

  const [matchups, setMatchups] = useState([]),
    [activeChat, setActiveChat] = useState(null),
    [showChat, setShowChat] = useState([]),
    [optionModal, setOptionModal] = useState(null);


  useEffect(() => {
    GET('match/all').then(data => {
      // console.log(data);
      setMatchups(data.data);
      console.log(data)
    })
    const uid = localStorage.getItem('user_id');

    echo.private('App.Models.User.' + uid)
      .listen('MatchupSuccessful', (e) => {
        const newMatchup = e.matchupData.matchup;
        setMatchups((previousState) => [...previousState, newMatchup])
      });
  }, [])

  const handleSetActiveChat = (matchupId, session, friendId) => {

    if (session) {
      // console.log('session is active since before')
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

  const handleUnmatch = (id) => {
    const confirmation = window.confirm("Are you sure you want to remove this match? This is permanent.");
    if(confirmation) POST('match/delete', {
      matchup_id: id
    }).then(data => {
      setMatchups((previousState) => previousState.filter(i => i.id !== id))
    });
  }

  const handleCloseChat = () => setActiveChat(null);

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
        <div className="chat-box">
          <div
            onClick={() => handleSetActiveChat(matchup.id, matchup.session, matchup.user[0].id)}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/1077/1077114.png"
              width="30px"
              className="profile-img"
            />
            <p className="">
              {matchup.user[0].profile.display_name}
            </p>
            {/* write user info here */}
          </div>
          <span className="chat-options-wrapper">
          <span
            className="chat-options"
            onClick={(e) => {
              e.preventDefault();
              setOptionModal((previousState) => previousState === matchup.id ? null : matchup.id)
            }}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>

            <div className={`chat-options-modal ${optionModal === matchup.id && "shown"}`}
            >
              <span
                className="un-match"
                onClick={() => { handleUnmatch(matchup.id) }}
              >
                Un-match
            </span>
            </div>
          </span>

        </div>
      )}
      {matchups.map(matchup =>

        <ChatWindow
          active={(activeChat && matchup.session) && activeChat === matchup.session.id ? true : false}
          matchup={matchup}
          closeChat={handleCloseChat}
          key={matchup.user[0].id}
        />

      )}
    </>
  )
}

export default Chat
