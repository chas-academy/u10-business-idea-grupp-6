import React from 'react';
import './ProfileData.scss';
import Showcase from '../showcase';

const ProfileData = ({ data, preferences, offset }) => {

  return (
    <div className="profile-data">

      {data.img_path ? 
        <img src={require(`../../assets/images/${data.img_path}.png`).default}/> : 
        <img src={require('../../assets/images/default_profile_image.png').default}/>
      }

      <h3>
        {data.display_name ||
          "User hasn't selected a display name"}
      </h3>

      <span>
        {preferences.player_types.map((i, idx) => {
          return <h4 key={idx}>{i.player_type}</h4>
        })}
      </span>
      
      <span>
        {preferences.langs.map((i, idx) => {
          return <h5 key={idx}>{i.lang}</h5>
        })}
      </span>

      <p>
        {offset}
      </p>

      <p>
        {data.country}
      </p>

      <div className="showcase-container">
        <p>games</p>

        <Showcase data={preferences.games} type="game" />

        <p>genres</p>

        <Showcase data={preferences.genres} type="genre" />
      </div>


      <p>
        {data.body ||
          `User hasn't chosen a body... Here's some lorem ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero omnis nulla hic quae iste obcaecati, consequuntur velit minus rerum. Non veritatis reiciendis quos magni corrupti enim molestias, dolor fugit ipsum?
          Eligendi expedita dignissimos velit reiciendis nulla amet consectetur harum et, dicta cumque explicabo vel laboriosam. Deleniti nemo expedita voluptatum possimus rem repellat iste a. Non maxime deserunt hic error soluta. `}
      </p>
    </div>
  )
}

export default ProfileData;




