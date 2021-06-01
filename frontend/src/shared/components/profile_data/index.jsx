import React from 'react';
import './ProfileData.scss';
import Showcase from '../showcase';

const ProfileData = ({ data, preferences, offset }) => {

  console.log(preferences);

  return (
    <div className="profile-data">

      {data.img_path ?
        <img
          src={require(`../../assets/images/${data.img_path}.png`).default}
          alt="profile picture"
        /> :
        <img
          src={require('../../assets/images/default_profile_image.png').default}
          alt="default profile picture"
        />
      }

      <h3>
        {data.display_name ||
          "User hasn't selected a display name"}
      </h3>

      <span>
        {preferences?.player_types.length ?
          preferences.player_types.map((i) => <h4>{i.player_type}</h4>) :
          <h4>
            All types
          </h4>
        }
      </span>

      <span>
        {preferences?.langs.length ?
          preferences.langs.map((i) => <h5>{i.lang}</h5>) :
          <h5>
            All languages
          </h5>
        }
      </span>

      <p>
        {data.country || ''}
      </p>

      <div className="showcase-container">

        <p>games</p>

        <Showcase
          data={preferences.games}
          type="game"
        />

        <p>genres</p>

        <Showcase
          data={preferences.genres}
          type="genre"
        />
      </div>

      <span className="times">
        {preferences?.times.map((i) => {
          return i.available === 1 &&
            <h5>
              {`${i.interval}s ${i.from} to ${i.to} UTC +(${offset})`}
            </h5>
        })}
      </span>

      <p>
        {data.body ||
          `User hasn't chosen a body... Here's some lorem ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero omnis nulla hic quae iste obcaecati, consequuntur velit minus rerum. Non veritatis reiciendis quos magni corrupti enim molestias, dolor fugit ipsum?
          Eligendi expedita dignissimos velit reiciendis nulla amet consectetur harum et, dicta cumque explicabo vel laboriosam. Deleniti nemo expedita voluptatum possimus rem repellat iste a. Non maxime deserunt hic error soluta. `}
      </p>
    </div>
  );
};

export default ProfileData;
