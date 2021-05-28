import React, { useState, useEffect } from 'react';
import './ProfileData.scss';
import defaultProfileImg from '../../assets/images/default_profile_image.png';
import Showcase from '../showcase';

const ProfileData = ({ data, preferences, offset }) => {

  return (
    <div className="profile-data">
      <img src={data.img_path || defaultProfileImg} />

      <h3>
        {data.display_name ||
          "User hasn't selected a display name"}
      </h3>

      <span>
        {preferences.player_types.map((i) => {
          return <h4>{i.player_type}</h4>
        })}
      </span>
      
      <span>
        {preferences.langs.map((i) => {
          return <h5>{i.lang}</h5>
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




