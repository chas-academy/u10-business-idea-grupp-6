import React, { useEffect, useState } from 'react';
import './Showcase.scss';

const Showcase = ({ data, type }) => {
  const [items, setItems] = useState(),
        [adder, setAdder] = useState(0),
        [position, setPosition] = useState({
          min: 0, 
          max: 2,
        })
  
  useEffect(() => {
    const filtered = data
      .filter((i, index) => index >= position.min && index < position.max + adder);

    setItems(filtered);
  }, [position])

  useEffect(() => {
    window.addEventListener('resize', event => {
      if(window.innerWidth <= 380) return console.log('0');
      if(window.innerWidth <= 768) return console.log('1');
      if(window.innerWidth <= 1365) return console.log('2');
      if(window.innerWidth > 1366) return console.log('3');
    });
  }, [])

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
      {items?.map(item =>
        <div className="item">{item[type]}</div>
      )}
      <button onClick={right}>&#9654;</button>
    </div>
  )
}

export default Showcase;
