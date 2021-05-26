import React, { useEffect, useState } from 'react'
import { GET, POST } from '../../shared/services/requests'
import spinner from '../../shared/assets/icons/spinning-wheel.svg'
import './Match.scss';
import ProfileData from '../../shared/components/profile_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLifeRing, faSpinner, faTruckLoading } from '@fortawesome/free-solid-svg-icons';

const Match = () => {
  const [matches, setMatches] = useState([]),
        [current, setCurrent] = useState(),
        [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    GET('match')
      .then(data => {

        setLoading(false);
        setMatches(data.data)
      });
  }, []);

  useEffect(() => {
    const [first] = matches;
   
    console.log(first);
    setCurrent(first);
  }, [matches]);

  const like = () => {
    setLoading(true)

    POST('interactions', {
      object_user_id: current.id,
      likes: 1
    }).then(data => {
      setLoading(false)

      const [, ...rest] = matches;

      setMatches(rest);
    })
  };

  const dislike = () => {
    setLoading(true)

    POST('interactions', {
      object_user_id: current.id,
      likes: 0
    }).then(data => {
      setLoading(false)

      const [, ...rest] = matches;

      setMatches(rest);
    })
  };

  return (
    <>
      {!loading &&
        <div className="match-container">
          {current &&
            <ProfileData
              data={current.profile}
              preferences={current.preferences}
            />
          }

          <button
            className="match-like"
            disabled={loading}
            onClick={like}
          >
            LIKE
          </button>

          <button
            className="match-dislike"
            disabled={loading}
            onClick={dislike}
          >
            NOPE
          </button>

          {!matches.length &&
            <div>
              No more matches! Please wait a minute before trying to refresh to get some more. :)
            </div>
          }
        </div>
      }

      <FontAwesomeIcon 
        className={`${loading && "shown"} spinner`}
        hidden={!loading}
        icon={faSpinner}
      />

    </>
  )
}


export default Match;