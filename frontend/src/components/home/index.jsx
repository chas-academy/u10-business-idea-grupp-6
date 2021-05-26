import React from 'react';
import './Home.scss';
import { ButtonLink } from '../../shared/components/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

const Home = () => {
  return (
    <div className="home">
      
      <h1>
        Title
      </h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit. Nam vestibulum neque
        augue, ac gravida est finibus eget. Sed 
        maximus, nisi at rutrum vehicula, turpis 
      </p>

      <div>
        <ButtonLink 
          classValue="button-link small light" 
          name="Register" 
          link="/register"
        />

        <ButtonLink
          classValue="button-link small dark"
          name="Login"
          link="/login"
        />
      </div>
    </div>
  );
};

export default Home;
