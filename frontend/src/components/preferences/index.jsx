import React, { useEffect, useState } from 'react';
import './Preferences.scss'
import { Slider, InputDropdown, Input, Switch } from "../../shared/components/";
import { OPTIONS, PREFERENCES } from "../../shared/services/preferences";

const Preferences = () => {
  const [options, setOptions] = useState(),
        [defalts, setDefalts] = useState();

  useEffect(() => {
    OPTIONS().then(options => setOptions(options));
    PREFERENCES().then(options => setDefalts(options));
  }, [])

  return (
    <>
      <h1 className="preferences-title">
        Setup Preferences
      </h1>

      <div className="preferences-container" >

        <InputDropdown 
          placeholder="Search Games" 
          type="game" 
          data={options?.games}
          defalts={defalts?.games}
        />

        <Slider name="weekdays"/>

        <Slider name="weekends"/>

        <InputDropdown 
          placeholder="Search Genres" 
          type="genre" 
          data={options?.genres}
          defalts={defalts?.genres}
        />

        <Switch name="Non-aggressive Language" type="miscs" moduleId="1"/>
        
        <Switch name="Flexible Times" type="miscs" moduleId="2"/>

        <InputDropdown 
          placeholder="Search Languages" 
          type="lang" 
          data={options?.langs}
          defalts={defalts?.langs}
        />

        <Switch name="medium" type="miscs" moduleId="1"/>
        
        <Switch name="Competetive" type="miscs" moduleId="2"/>

        <Switch name="Casual" type="miscs" moduleId="2"/>

      </div>
    </>
  )
}

export default Preferences
