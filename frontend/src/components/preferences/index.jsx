import React from 'react';
import './Preferences.scss'
import { Slider, InputDropdown, Input, Switch } from "../../shared/components/";

const Preferences = () => {
  return (
    <>
      <h1 className="preferences-title">
        Setup Preferences
      </h1>

      <div className="preferences-container" >

        <InputDropdown placeholder="Search Games"/>
       
        <Input placeholder="test" />

        <Slider name="weekdays"/>

        <Slider name="weekends"/>

        <InputDropdown placeholder="Search Genres"/>

        <Switch name="Flexible Times"/>
        
        <Switch name="No Harsh Language"/>

      </div>
    </>
  )
}

export default Preferences
