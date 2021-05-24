import React, { useState, useEffect } from 'react'
import defaultProfileImg from '../../assets/images/default_profile_image.png'

const ProfileData = ({ data, preferences }) => {

  // useEffect(() => {

  // }, [])

  return (
    <div>
      {/* <img src={data.img_path || defaultProfileImg}/> */}
      <h3>{data.display_name || "User hasn't selected a display name"}</h3>
      <section>
        {preferences.games?.map(game =>
          <span>{game.game}</span>
        )}
      </section>
      <section>
        {preferences.genres?.map(genre =>
          <span>{genre.genre}</span>
        )}
      </section>
      <p>{data.body
        // ||
        //  `User hasn't chosen a body... Here's some lorem ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero omnis nulla hic quae iste obcaecati, consequuntur velit minus rerum. Non veritatis reiciendis quos magni corrupti enim molestias, dolor fugit ipsum?
        // Eligendi expedita dignissimos velit reiciendis nulla amet consectetur harum et, dicta cumque explicabo vel laboriosam. Deleniti nemo expedita voluptatum possimus rem repellat iste a. Non maxime deserunt hic error soluta. `
      }</p>
    </div>
  )
}

export default ProfileData;




