import React, { useEffect, useState } from 'react';
import './Showcase.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    if (position.min > 0) setPosition(prevState => ({
      ...prevState,
      min: position.min--,
      max: position.max--
    }));
  }

  const right = () => {
    if (position.max < data.length) setPosition(prevState => ({
      ...prevState,
      min: position.min++,
      max: position.max++
    }));
  }

  return (
    <div className="showcase">

      <FontAwesomeIcon
        className={`${!(position.min > 0) && 'disabled'} arrow-icon`}
        onClick={left}
        icon={faChevronLeft}
      />

      <div>
        {(items?.length) ? 
          items.map((i, idx) => <span key={idx}>{i[type]}</span>) :
          <span>{`No ${type}s added`}</span>
        }
      </div>

      <FontAwesomeIcon
        className={`${!(position.max < data.length) && 'disabled'} arrow-icon`}
        onClick={right}
        icon={faChevronRight}
      />
    </div>
  )
}

export default Showcase;
