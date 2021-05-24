
import React from 'react';
import './Home.scss';
import { ButtonLink } from "../../shared/components/";

const Home = () => {
  return (
    <>
      <h1 className="home-title">
        Title
      </h1>
      <p className="home-text">
        Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit. Nam vestibulum neque
        augue, ac gravida est finibus eget. Sed 
        maximus, nisi at rutrum vehicula, turpis 
      </p>

      <div className="home-container">
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

        <ButtonLink
          classValue="button-link small light"
          name="Chat"
          link="/chat"
          />
        
        <ButtonLink
          classValue="button-link small light"
          name="Match"
          link="/match"
        />
        
      </div>
    </>
  )
}

export default Home;