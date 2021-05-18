import React, { useEffect, useState } from 'react';
import './Slider.scss';

const Slider = () => {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(24);

  useEffect(() => {
    const inputLeft = document.getElementById("input-left"),
          inputRight = document.getElementById("input-right"),
          thumbLeft = document.querySelector(".left"),
          thumbRight = document.querySelector(".right"),
          range = document.querySelector(".slider-range");

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

  return (
    <>
      <div className="slider-middle">
        <p className="slider-data">start: {startValue} end: {endValue}</p>

        <input type="range" id="input-left" min="0" max="100" defaultValue="0"/>
        <input type="range" id="input-right" min="0" max="100" defaultValue="100"/>

        <div className="slider-container">
          <div className="slider-track"/>
          <div className="slider-range"/>
          <div className="slider-thumb left"/>
          <div className="slider-thumb right"/>
        </div>
      </div>
    </>
  )
}

export default Slider
