import React, { useEffect } from 'react';
import './Preferences.scss'
import { Slider, InputDropdown, Input, Switch } from "../../shared/components/";
import { GET, POST } from '../../shared/services/requests';

const Preferences = () => {


  return (
    <>
      <h1 className="preferences-title">
        Setup Preferences
      </h1>

      <div className="preferences-container" >

        <InputDropdown placeholder="Search Games" type="games" options=""/>

        <Slider name="weekdays"/>

        <Slider name="weekends"/>

        <Input placeholder="test" />

        <Switch name="Flexible Times"/>
        
        <Switch name="No Harsh Language"/>

      </div>
    </>
  )
}

export default Preferences
