import React, { useState, useEffect } from 'react'
import './InputDropdown.scss';
import AsyncSelect from 'react-select/async';
import { POST, GET } from "../../services/requests";

const InputDropdown = ({placeholder, type}) => {
  const [selectedOption, setSelectedOption] = useState([]),
        [selectValue, setSelectValue] = useState([]),
        [options, setOptions] = useState([]);

  useEffect(() => {
    
    GET('user/prefs').then(response => {
      const values = response.data.data.preferences[type].reduce((acc, curr) => {
        const value = {
          value: curr[type.slice(0, -1)],
          label: curr[type.slice(0, -1)],
          id: curr.id
        }
        acc.push(value)
        return acc;
      }, []);
      
      console.log(values);
      setSelectValue(values);
    }).catch(error => {
      console.log(error);
    })

    POST('prefs-payload', {model: type}).then(response => {
      const values = response.data.reduce((acc, curr) => {
        const value = {
          value: curr[type.slice(0, -1)],
          label: curr[type.slice(0, -1)],
          id: curr.id
        }
        acc.push(value)
        return acc;
      }, []);

      setOptions(values);

    }).catch(error => {
      console.log(error);
    })
  }, [])


  const promiseOptions = (inputValue) =>
    new Promise(resolve => resolve(filterOptions(inputValue))
  );

  const filterOptions = (inputValue) =>
    options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleChange = (elem) => {
    console.log(elem);
    if(elem.length !== selectedOption.length) {
      const data = {
        model: type,
        model_id: elem
        .filter(item => !selectedOption.includes(item))
        .concat(selectedOption.filter(item => !elem.includes(item))).pop().id
      }
      setSelectedOption(elem);
      setSelectValue(elem);
      
      POST('prefs', data).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      })
    };
  }

  return (
    <>
      <AsyncSelect
        cacheOptions
        value={selectValue}
        placeholder={placeholder}
        loadOptions={promiseOptions}
        styles={customStyles}
        isMulti
        closeMenuOnSelect={false}
        className="input-dropdown"
        onChange={(e) => handleChange(e)}
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