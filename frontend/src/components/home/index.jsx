import React from 'react';
import './Home.scss';
import { ButtonLink } from '../../shared/components/';
import logo from '../../shared/assets/images/logo.png';

const Home = () => {
  return (
    <div className='home'>
      <div className='title-container'>
        <h1>
          Gamer
          <span>
            Hub
          </span>
        </h1>

        <p>
          Your place to find new gamers to play with based on personal
          preferences and gamer style. Totally anonymous.
        </p>

        <img className='logo' src={logo} alt='GamerHub logo' />
      </div>

      <div className='buttons-container'>
        <ButtonLink
          classValue='button-link small light'
          name='Register'
          link='/register'
        />

        <ButtonLink
          classValue='button-link small dark'
          name='Login'
          link='/login'
        />
      </div>
    </div>
  );
};

export default Home;
