import React, { useEffect, useState } from 'react';
import './Showcase.scss';

const Showcase = ({ data, type }) => {
  const [items, setItems] = useState(),
        [position, setPosition] = useState(0)

  useEffect(() => {

    const filtered = data.filter((i, index) => index >= position && index < position + 3);

    setItems(filtered);
  }, [])

  return (
    <div className="showcase" >
      <button>&#9664;</button>
      {items?.map(item =>
        <div className="item">{item[type]}</div>
      )}
      <button>&#9654;</button>
    </div>
  )
}

export default Showcase;
