import React, { useEffect, useState } from 'react';
import './Showcase.scss';

const Showcase = ({ data, type }) => {
  const [items, setItems] = useState(),
        [position, setPosition] = useState({
          min: 0,
          max: 4
        });
  
  useEffect(() => {
    const filtered = data
      .filter((i, index) => index >= position.min && index < position.max);

    setItems(filtered);
  }, [position]);

  const left = () => {
    if(position.min > 0) setPosition(prevState => ({
      ...prevState,
      min: position.min--,
      max: position.max--
    }));
  }

  const right = () => {
    if(position.max < data.length) setPosition(prevState => ({
      ...prevState,
      min: position.min++,
      max: position.max++
    }));
  }

  return (
    <div className="showcase" >
      <button onClick={left}>&#9664;</button>
      <div className="item-container">
        {items?.map(item =>
          <div className="item">{item[type]}</div>
        )}
      </div>
      <button onClick={right}>&#9654;</button>
    </div>
  )
}

export default Showcase;
