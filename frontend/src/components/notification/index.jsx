import React, { useEffect, useState } from 'react';
import { echo } from '../../shared/services/requests';
import ButtonLink from '../../shared/components/button_link';
import './Notification.scss';

const Notification = ({ auth }) => {
  const [isShown, setIsShown] = useState(false),
        [message, setMessage] = useState('');

  useEffect(() => {
    if (auth) {
      const uid = localStorage.getItem('user_id');

      echo
        .private('App.Models.User.' + uid)
        .listen('MatchupSuccessful', (e) => {
          // console.log(e)
          const otherUser = e.matchupData.users.find(
            (user) => user.id !== parseInt(uid)
          );
          setMessage(
            `You have a new match! Their name is ${
              otherUser.profile.display_name || 'hidden...'
            }`
          );
        });
    }
  }, [auth]);

  useEffect(() => {
    if (message) {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false);
        setMessage('');
      }, 5000);
    }
  }, [message]);

  return (
    message && isShown && (
      <div id="notification">
        <ButtonLink
          link="/chat"
          name={message}
          classValue="button-link"
        />
      </div>
    )
  );
};

export default Notification;
