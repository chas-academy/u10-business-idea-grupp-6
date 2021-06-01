import React, { useState, useEffect } from 'react';
import './InputDropdown.scss';
import Select from 'react-select';

const InputDropdown = ({ placeholder, data, defaults, getState }) => {
  const [options, setOptions] = useState();

  useEffect(() => {
    const formatted = data?.map((i, index) => ({
      value: i.name,
      label: i.name,
      id: index,
    }));
    setOptions(formatted);
  }, [data]);

  const handleChange = (elem) => {
    getState(elem.value);
  };

  return (
    <>
      {<Select
        defaultInputValue={defaults}
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        className="input-dropdown"
        onChange={(e) => handleChange(e)}
      />}
    </>
  );
};

export default InputDropdown;

// Styling
const customStyles = {
  control: (base) => ({
    ...base,
    background: '#24212E',
    color: 'white',
    border: 'solid 1px #ffffff1f',
    borderRadius: '17px',
    padding: '10px',
    fontWeight: '300',
    fontSize: '14px',
    boxShadow: 'none',
    ':hover': {
      border: 'solid 1px white',
    },
  }),
  indicatorSeparator: () => ({}),
  option: () => ({
    color: 'black',
    margin: '10px',
    zIndex: 9999
  }),
  input: () => ({
    color: 'white',
  }),
  multiValueRemove: (base) => ({
    ...base,
    cursor: 'pointer',
    ':hover': {
      color: 'white',
      opacity: '0.5',
    },
  }),
  NoOptionsMessage: (base) => ({
    content: 'text',
  }),
  singleValue: (base) => ({
      color: 'white',
  }),
};
