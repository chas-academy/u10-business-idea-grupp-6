import React, { useEffect, useState } from 'react';
import './Slider.scss';

const Slider = ({name}) => {
  const [startValue, setStartValue] = useState(0),
        [endValue, setEndValue] = useState(24),
        [toggle, setToggle] = useState(false);

  useEffect(() => {
    const inputLeft = document.getElementById(`${name}-left`),
          inputRight = document.getElementById(`${name}-right`),
          thumbLeft = document.querySelector(`.${name}-left`),
          thumbRight = document.querySelector(`.${name}-right`),
          range = document.querySelector(`.${name}-range`);

    const setLeftValue = () => {
      const elem = inputLeft,
            min = parseInt(elem.min),
            max = parseInt(elem.max);
    
      elem.value = Math.min(parseInt(elem.value), parseInt(inputRight.value) - 1);
      let percent = ((elem.value - min) / (max - min)) * 100;
    
      thumbLeft.style.left = percent + "%";
      range.style.left = percent + "%";
      setStartValue(Math.round(24 * ((percent)/100)));
    }
    
    const setRightValue = () => {
      const elem = inputRight,
            min = parseInt(elem.min),
            max = parseInt(elem.max);
    
      elem.value = Math.max(parseInt(elem.value), parseInt(inputLeft.value) + 1);
      let percent = ((elem.value - min) / (max - min)) * 100;
    
      thumbRight.style.right = (100 - percent) + "%";
      range.style.right = (100 - percent) + "%";
      setEndValue(Math.round(24 * ((percent)/100)));
    }

    setLeftValue();
    setRightValue();
    
    inputLeft.addEventListener("input", setLeftValue);
    inputRight.addEventListener("input", setRightValue);

    addEventListeners(inputLeft, thumbLeft);
    addEventListeners(inputRight, thumbRight);
  }, []);

  // useEffect(() => {
  //   console.log({startValue, endValue});
  // }, [startValue, endValue]);

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

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="slider">
      <input 
        type="checkbox" 
        name={name} 
        onChange={toggleInputType}
      />
      <label htmlFor={name}>
        {name}
      </label>

      <div className={(toggle) ? 'slider-middle' : 'slider-middle hidden'}>
        <p className="slider-data">
          [ start: {startValue} end: {endValue} ]
        </p>

        <input 
          type="range" 
          id={`${name}-left`} 
          min="0" 
          max="100" 
          defaultValue="0"
        />

        <input 
          type="range" 
          id={`${name}-right`}
          min="0" 
          max="100" 
          defaultValue="100"
        />

        <div className="slider-container">
          <div className="slider-track"/>
          <div className={`slider-range ${name}-range`}/>
          <div className={`slider-thumb left ${name}-left`}/>
          <div className={`slider-thumb right ${name}-right`}/>
        </div>
      </div>
    </div>
  )
}

export default Slider
