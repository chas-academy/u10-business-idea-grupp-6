import React, { useEffect, useState } from 'react';
import './Chat.scss';
import { echo, GET, POST } from '../../shared/services/requests';
import { ButtonLink, ButtonSubmit } from '../../shared/components/';
import ChatWindow from '../chat_window';

const Chat = () => {
  const [matchups, setMatchups] = useState([]),
        [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    GET('match/all').then((data) => {
      // console.log(data);
      setMatchups(data.data);
    });
    const uid = localStorage.getItem('user_id');

    echo.private('App.Models.User.' + uid).listen('MatchupSuccessful', (e) => {
      const newMatchup = e.matchupData.matchup;
      setMatchups((previousState) => [...previousState, newMatchup]);
    });
  }, []);

  const handleSetActiveChat = (matchupId, session, friendId) => {
    if (session) {
      // console.log('session is active since before')
      setActiveChat(session.id);
    } else {
      POST('session/create', {
        friend_id: friendId,
      }).then((data) => {
        setActiveChat(data.data.data.id);
        const newMatchups = [...matchups];
        const index = newMatchups.findIndex((i) => i.id === matchupId);
        newMatchups[index].session = data.data.data;
        setMatchups(newMatchups);
      });
    }
  };

  return (
    <>
      <h1>Chat</h1>

      {matchups.length === 0 && (
        <div>
          You have no more matches...
          <ButtonLink
            name='Match'
            classValue='button-link'
          />
        </div>
      )}

      {matchups.map((matchup) => (
        <p>
          <button
            onClick={() =>
              handleSetActiveChat(
                matchup.id,
                matchup.session,
                matchup.user[0].id
              )
            }
          >
            GO CHAT
          </button>

          {matchup.user[0].id}
          {/* write user info here */}
        </p>
      ))}
      {matchups.map((matchup) => (
        <ChatWindow
          active={
            activeChat && matchup.session && activeChat === matchup.session.id
              ? true
              : false
          }
          matchup={matchup}
        />
      ))}
    </>
  );
};

export default Chat;
