import React, { useEffect, useState } from 'react';
import './Showcase.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Showcase = ({ data, type }) => {
  const [items, setItems] = useState(),
        [min, setMin] = useState(0),
        [max, setMax] = useState(4);

  useEffect(() => {
    const filtered = data.filter(
      (i, index) => index >= min && index < max
    );

    setItems(filtered);
  }, [min, max]);

  const left = () => {
    if (min > 0) {
      setMin(min - 1);
      setMax(max - 1);
    }
  }

  const right = () => {
    if (max < data.length) {
      setMin(min + 1);
      setMax(max + 1);
    }
  }

  return (
    <div className="showcase">
      <FontAwesomeIcon
        className={`${!(min > 0) && 'disabled'} arrow-icon`}
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
        className={`${!(max < data.length) && 'disabled'} arrow-icon`}
        onClick={right}
        icon={faChevronRight}
      />
    </div>
  );
};

export default Showcase;
