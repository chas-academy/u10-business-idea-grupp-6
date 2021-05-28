import React, { useEffect, useState } from 'react'
import { GET, POST } from '../../shared/services/requests'
import './Match.scss';
import ProfileData from '../../shared/components/profile_data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LoadingProfileCard } from '../../shared/loading_components';

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
    <div className="match">
      {(!loading && current) &&
        <div className="container">
          <ProfileData
            data={current.profile}
            preferences={current.preferences}
          />

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
      }

      {(!loading && !current) &&
        <p className="no-match-text">
          No more matches! Please wait a minute before trying to refresh to get some more.
        </p>
      }

      {loading &&
        <div className="loading">
          <LoadingProfileCard />
        </div>
      }

    </div>
  )
}

export default Match;