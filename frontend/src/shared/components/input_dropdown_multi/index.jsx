import React, { useState, useEffect } from 'react';
import './InputDropdownMulti.scss';
import AsyncSelect from 'react-select/async';
import { DROPDOWNMULTI } from '../../services/preferences';

const InputDropdownMulti = ({ placeholder, type, data, defaults, id }) => {
  const [selectedOption, setSelectedOption] = useState([]),
        [defaultValue, setDefaultValue] = useState([]),
        [options, setOptions] = useState();

  useEffect(() => { 
    const formatted = data?.map(i => ({
      value: i[type],
      label: i[type],
      id: i.id
    }));
    setOptions(formatted);
  }, [data, type]);

  useEffect(() => { 
    const formatted = defaults?.map(i => ({
      value: i[type],
      label: i[type],
      id: i.id
    }));
    
    setDefaultValue(formatted);
    setSelectedOption(formatted);
  }, [defaults, type]);

  const promiseOptions = (inputValue) =>
    new Promise(resolve => resolve(filterOptions(inputValue))
  );

  const filterOptions = (inputValue) =>
    options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleChange = (elem) => {
    DROPDOWNMULTI(elem, selectedOption, type);
    setSelectedOption(elem);
    setDefaultValue(elem);
  }

  return (
    <div className="dropdown-multi">
      <label htmlFor={id}>
        {placeholder}
      </label>
      <AsyncSelect
        cacheOptions
        value={defaultValue}
        placeholder={placeholder}
        loadOptions={promiseOptions}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        className="input-dropdown-multi"
        onChange={(e) => handleChange(e)}
        id={id}
      />
    </div>
  );
};

export default InputDropdownMulti;

// Styling
const customStyles = {
  control: base => ({
    ...base,
    background: '#24212E',
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
    indicatorSeparator: () => ({
  }),
  option: () => ({
    color: 'black',
    margin: '10px',
  }),
  input: () => ({
    color: 'white',
  }),
  clearIndicator: () => ({
    display: 'none'
  }),
  multiValue: base => ({
    ...base,
    height: '25px',
    borderRadius: '7px',
    background: '#454556',
    color: 'white',
  }),
  multiValueLabel: base => ({
    ...base,
    marginTop: '3px',
    height: '40px',
    color: 'white',
  }),
  multiValueRemove: base => ({
    ...base,
    cursor: 'pointer',
    ':hover': {
      color: 'white',
      opacity: '0.5'
    },
  }),
  NoOptionsMessage: base => ({
    content: 'text'
  })
}
