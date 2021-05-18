import React from 'react';
import './Preferences.scss'
import { Slider, Input } from "../../shared/components/";

const Preferences = () => {
  return (
    <>
      <h1 className="preferences-title">
        Setup Preferences
      </h1>

      <div className="preferences-container" >
        <Input
          type="text"
          placeholder="Games"
        />

        <Slider />
      </div>
    </>
  )
}

export default Preferences
