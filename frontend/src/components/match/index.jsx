import React, { useEffect, useState } from 'react'
import { GET, POST } from '../../shared/services/requests'
import spinner from '../../shared/assets/icons/spinning-wheel.svg'


import './Match.scss';
import ProfileData from '../../shared/components/profile_data';

const Match = () => {
  const [matches, setMatches] = useState([]),
    [current, setCurrent] = useState(),
    [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true);

  //   GET('match')
  //     .then(data => {

  //       setLoading(false);
  //       setMatches(data.data)

  //     });
  // }, []);

  useEffect(() => {
    // const [first] = matches;
    const first = {
      "id": 141,
      "profile": {
        "id": 141,
        "user_id": 141,
        "display_name": "Hannes",
        "country": "Sweden",
        "img_path": null,
        "body": "Kom och spela Fortnite med mig pls! Jag har mammas kreditkort :D ",
        "created_at": "2021-05-24T08:27:17.000000Z",
        "updated_at": "2021-05-24T08:27:17.000000Z"
      },
      "preferences": {
        "genres": [
          {
            "id": 3,
            "genre": "fps"
          },
          {
            "id": 2,
            "genre": "arpg"
          }
        ],
        "games": [
          {
            "id": 3,
            "game": "Diablo 3",
            "genre": {
              "id": 4,
              "genre": "arpg"
            }
          },
          {
            "id": 3,
            "game": "World of Warcraft",
            "genre": {
              "id": 4,
              "genre": "mmo"
            }
          }
        ],
        "player_types": [
          {
            "id": 1,
            "player_type": "casual"
          },
          {
            "id": 2,
            "player_type": "competetive"
          }
        ],
        "langs": [
          {
            "id": 1,
            "lang": "Swedish",
            "native": "Svenska",
            "code": "SE"
          },
          {
            "id": 2,
            "lang": "Arabic",
            "native": "عربى",
            "code": "AR"
          }
        ],
        "times": [
          {
            "interval": "weekday",
            "from": 19,
            "to": 21,
            "available": 0
          },
          {
            "interval": "weekend",
            "from": 19,
            "to": 21,
            "available": 0
          }
        ],
        "miscs": [
          {
            "id": 1,
            "misc": "Non-aggressive language"
          }
        ]
      },
      "online": false,
      "session": null,
      "timezone_offset": 0
    };
    console.log(first);
    setCurrent(first);
    // }, [matches]);
  }, [matches]);

  // const like = () => {
  //   setLoading(true)

  //   POST('interactions', {
  //     object_user_id: current.id,
  //     likes: 1
  //   }).then(data => {
  //     setLoading(false)

  //     const [, ...rest] = matches;

  //     setMatches(rest);
  //   })
  // };

  // const dislike = () => {
  //   setLoading(true)

  //   POST('interactions', {
  //     object_user_id: current.id,
  //     likes: 0
  //   }).then(data => {
  //     setLoading(false)

  //     const [, ...rest] = matches;

  //     setMatches(rest);
  //   })
  // };

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
          // onClick={like}
          >
            LIKE
          </button>

          <button
            className="match-dislike"
            disabled={loading}
          // onClick={dislike}
          >
            DISLIKE
          </button>

          {!matches.length &&
            <div>
              {/* No more matches! Please wait a minute before trying to refresh to get some more. :) */}
            </div>
          }
        </div>
      }

      <img className={`${loading && "shown"} spinner`}
        hidden={!loading}
        src={spinner}
      />
    </>
  )
}


export default Match;