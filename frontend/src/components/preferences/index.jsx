import React from 'react';
import './Preferences.scss'
import { Slider, InputDropdown } from "../../shared/components/";

const Preferences = () => {
  return (
    <>
      <h1 className="preferences-title">
        Setup Preferences
      </h1>

      <div className="preferences-container" >

        <Slider name="weekday" />

        <Slider name="weekend"/>

        <InputDropdown />

      </div>
    </>
  )
}

export default Preferences
