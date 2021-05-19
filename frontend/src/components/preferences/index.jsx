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

        <Input placeholder="test"/>

        <Slider name="weekdays"/>

        <Slider name="weekends"/>

        <Input placeholder="test"/>

      </div>
    </>
  )
}

export default Preferences
