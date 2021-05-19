import React, { useEffect, useState } from 'react';
import './Slider.scss';

const Slider = ({name}) => {
  const [sliderValue, setSliderValue] = useState({start: 0, end: 24}),
        [toggle, setToggle] = useState(false);

  useEffect(() => {
    const inputStart = document.getElementById(`${name}-start`),
          inputEnd = document.getElementById(`${name}-end`),
          thumbStart = document.querySelector(`.${name}-start`),
          thumbEnd = document.querySelector(`.${name}-end`),
          range = document.querySelector(`.${name}-range`);

    const setStartValue = () => {
      inputStart.value = Math.min(parseInt(inputStart.value), parseInt(inputEnd.value) - 1);
      thumbStart.style.left = inputStart.value + "%";
      range.style.left = inputStart.value + "%";
      
      setSliderValue(prevState => ({
        ...prevState,
        start: Math.round(24 * ((inputStart.value)/100))
      }));
    }
    
    const setEndValue = () => {
      inputEnd.value = Math.max(parseInt(inputEnd.value), parseInt(inputStart.value) + 1);
      thumbEnd.style.right = (100 - inputEnd.value) + "%";
      range.style.right = (100 - inputEnd.value) + "%";
      
      setSliderValue(prevState => ({
        ...prevState,
        end: Math.round(24 * ((inputEnd.value)/100))
      }));
    }
   
    setStartValue();
    setEndValue();

    addEventListeners(inputStart, thumbStart);
    addEventListeners(inputEnd, thumbEnd);
    
    inputStart.addEventListener("input", setStartValue);
    inputEnd.addEventListener("input", setEndValue);
  }, []);

  const addEventListeners = (input, thumb) => {
    input.addEventListener("mouseover", () => {
      thumb.classList.add("hover");
    });
    input.addEventListener("mouseout", () => {
      thumb.classList.remove("hover");
    });
    input.addEventListener("mousedown", () => {
      thumb.classList.add("active");
    });
    input.addEventListener("mouseup", () => {
      thumb.classList.remove("active");
    });
  }

  const submit = () => {
    console.log(sliderValue);
  }

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="slider">
      <input 
        className="slider-checkbox"
        type="checkbox" 
        id={name} 
        onChange={toggleInputType}
      />

      <label 
        htmlFor={name}
        className="slider-checkbox-label"
      >
        {name}
      </label>

      <div className={(toggle) ? 'slider-middle' : 'slider-middle hidden'}>
       
        <input 
          type="range" 
          id={`${name}-start`} 
          defaultValue="0"
          onMouseUp={submit}
        />

        <input 
          type="range" 
          id={`${name}-end`}
          defaultValue="100"
          onMouseUp={submit}
        />

        <div className="slider-container">
          <div className="slider-track"/>
          <div className={`slider-range ${name}-range`}/>
          <div className={`slider-thumb start ${name}-start`}/>
          <div className={`slider-thumb end ${name}-end`}/>
        </div>

        <p className="slider-data">
          [ start: {sliderValue.start}:00 end: {sliderValue.end}:00 ]
        </p>
      </div>
    </div>
  )
}

export default Slider
