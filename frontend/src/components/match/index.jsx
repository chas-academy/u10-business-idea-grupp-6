import React, { useEffect, useState } from 'react'
import { GET, POST } from '../../shared/services/requests'
import './Match.scss';
import ProfileData from '../../shared/components/profile_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLifeRing, faSpinner, faTruckLoading } from '@fortawesome/free-solid-svg-icons';

const Match = () => {
  const [matches, setMatches] = useState([]),
        [current, setCurrent] = useState(),
        [loading, setLoading] = useState(false),
        [status, setStatus] = useState(true); // This state needs to be used in order for the matches to not show up before loading

  useEffect(() => {
    setLoading(true);
    setStatus(true)

    GET('match')
    .then(data => {

      setStatus(false)
      setLoading(false);
      setMatches(data.data)
    });
  }, []);

  useEffect(() => {
    const [first] = matches;

    setCurrent(first);
  }, [matches]);

  const like = () => {
    setLoading(true)

    POST('interactions', {
      object_user_id: current.id,
      likes: 1
    }).then(data => {
      setLoading(false)
      setStatus(false)

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
      setStatus(false)

      const [, ...rest] = matches;

      setMatches(rest);
    })
  };

  return (
    <div className="match">
      {!loading && matches.length && !status ?
        <div className="container">
          {current &&
            <ProfileData
              data={current.profile}
              preferences={current.preferences}
            />
          }

          <button
            className="like"
            disabled={loading}
            onClick={like}
          >
            YUP
          </button>

          <button
            className="dislike"
            disabled={loading}
            onClick={dislike}
          >
            NOPE
          </button>

        </div>
        : 
        !loading && !matches.length && !status &&
          <div className="container-nomatch">
            <div className="nomatch">
                <p>
                  No more matches! Please wait a minute before trying to refresh to get some more.
                </p>
            </div>
          </div>
      }


      <FontAwesomeIcon 
        className={`${loading && "shown"} spinner`}
        hidden={!loading}
        icon={faSpinner}
      />
      
    </div>
  )
}

export default Match;