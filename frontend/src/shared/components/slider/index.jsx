import React, { useEffect, useState } from 'react';
import { TIME } from '../../services/preferences';
import './Slider.scss';

const Slider = ({ name, defaults }) => {
  const [sliderValue, setSliderValue] = useState({ start: 0, end: 24 }),
        [toggle, setToggle] = useState(false);

  useEffect(() => {
    const inputStart = document.getElementById(`${name}-start`),
      inputEnd = document.getElementById(`${name}-end`),
      thumbStart = document.querySelector(`.${name}-start`),
      thumbEnd = document.querySelector(`.${name}-end`),
      range = document.querySelector(`.${name}-range`),
      filter = defaults?.find((elem) => elem.interval === name);

    inputStart.value = Math.round((filter?.from / 24) * 100);
    inputEnd.value = Math.round((filter?.to / 24) * 100);

    const setStartValue = () => {
      inputStart.value = Math.min(
        parseInt(inputStart.value),
        parseInt(inputEnd.value) - 1
      );
      thumbStart.style.left = inputStart.value + '%';
      range.style.left = inputStart.value + '%';

      setSliderValue((prevState) => ({
        ...prevState,
        start: Math.round(24 * (inputStart.value / 100)),
      }));
    };

    const setEndValue = () => {
      inputEnd.value = Math.max(
        parseInt(inputEnd.value),
        parseInt(inputStart.value) + 1
      );
      thumbEnd.style.right = 100 - inputEnd.value + '%';
      range.style.right = 100 - inputEnd.value + '%';

      setSliderValue((prevState) => ({
        ...prevState,
        end: Math.round(24 * (inputEnd.value / 100)),
      }));
    };

    if (filter?.available) {
      document.getElementById(name).checked = true;
      setToggle(true);
    }

    setSliderValue({
      start: filter?.from,
      end: filter?.to,
    });

    setStartValue();
    setEndValue();

    addEventListeners(inputStart, thumbStart);
    addEventListeners(inputEnd, thumbEnd);

    inputStart.addEventListener('input', setStartValue);
    inputEnd.addEventListener('input', setEndValue);
  }, [defaults, name]);

  const addEventListeners = (input, thumb) => {
    input.addEventListener('mouseover', () => {
      thumb.classList.add('hover');
    });
    input.addEventListener('mouseout', () => {
      thumb.classList.remove('hover');
    });
    input.addEventListener('mousedown', () => {
      thumb.classList.add('active');
    });
    input.addEventListener('mouseup', () => {
      thumb.classList.remove('active');
    });
  };

  const submit = () => {
    TIME(sliderValue.start, sliderValue.end, name, true);
  };

  const toggleHandler = () => {
    if (toggle) TIME(sliderValue.start, sliderValue.end, name, false);
    if (!toggle) TIME(sliderValue.start, sliderValue.end, name, true);
  };

  const toggleInputType = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="slider">
      <div>
        <label htmlFor={name}></label>
        <input
          type="checkbox"
          id={name}
          onChange={toggleInputType}
          onClick={toggleHandler}
        />

<label
          className="slider-checkbox-label"
          htmlFor={name}
        >
          {name}
        </label>

        <p>
          {toggle
            ? `${sliderValue.start}:00 to ${sliderValue.end}:00`
            : `never`}
        </p>
      </div>

      <div className={!toggle && "hidden"}>
        <label htmlFor={`${name}-start`}></label>
        <input
          type="range"
          id={`${name}-start`}
          defaultValue="0"
          onMouseUp={submit}
        />

        <label htmlFor={`${name}-end`}></label>
        <input
          type="range"
          id={`${name}-end`}
          defaultValue="100"
          onMouseUp={submit}
        />

        <span className="slider-container">
          <span className="slider-track" />
          <span className={`slider-range ${name}-range`} />
          <span className={`slider-thumb start ${name}-start`} />
          <span className={`slider-thumb end ${name}-end`} />
        </span>
      </div>
    </div>
  );
};

export default Slider;
