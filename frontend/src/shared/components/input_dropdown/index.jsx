import React, { useState, useEffect } from 'react'
import './InputDropdown.scss';
import AsyncSelect from 'react-select/async';

const InputDropdown = ({placeholder, type}) => {
  const [selectedOption, setSelectedOption] = useState([]),
        [verifyRequest, setVerifyRequest] = useState([]),
        [options, setOptions] = useState([]);

  const data = [
    { id: 1, game: 'World Of Warcraft', genre_id: 4 },
    { id: 2, game: 'Minecraft', genre_id: 6 },
    { id: 3, game: 'Five Nights At Freddys', genre_id: 3 },
    { id: 4, game: 'Call Of Duty World At War', genre_id: 7 },
    { id: 5, game: 'Call Of Duty Black Ops 1', genre_id: 4 },
    { id: 6, game: 'Call Of Duty Black Ops 2', genre_id: 8 },
    { id: 7, game: 'Counter Strike Global Offensive', genre_id: 2 },
  ]

  useEffect(() => {
    const values = data.reduce((acc, curr) => {
      const value = {
        value: curr[type],
        label: curr[type],
        id: curr.id
      }
      acc.push(value)
      return acc;
    }, []);

    setOptions(values);
  }, []);

  useEffect(() => {
    const data = selectedOption.map(i => i.id);
    if(data.length !== verifyRequest.length) console.log(data);
    setVerifyRequest(data);

  }, [selectedOption]);

  const promiseOptions = (inputValue) =>
    new Promise(resolve => resolve(filterOptions(inputValue))
    );

  const filterOptions = (inputValue) =>
    options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        placeholder={placeholder}
        loadOptions={promiseOptions}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        className="input-dropdown"
        onChange={setSelectedOption}
      />
    </>
  )
}

export default InputDropdown;

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