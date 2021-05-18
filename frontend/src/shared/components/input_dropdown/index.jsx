import React, { useState, useEffect } from 'react'
import './InputDropdown.scss';
import AsyncSelect from 'react-select/async';

const InputDropdown = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);

    const games = [
        {id: 1, game: 'World Of Warcraft', genre_id: 4},
        {id: 2, game: 'Minecraft', genre_id: 6},
        {id: 3, game: 'Five Nights At Freddys', genre_id: 3},
        {id: 4, game: 'Call Of Duty World At War', genre_id: 7},
        {id: 5, game: 'Call Of Duty Black Ops 1', genre_id: 4},
        {id: 6, game: 'Call Of Duty Black Ops 2', genre_id: 8},
        {id: 7, game: 'Counter Strike Global Offensive', genre_id: 2},
    ]

    useEffect(() => {  
        const values = games.reduce((acc, curr) => {
            const value = {
                value: curr.game,
                label: curr.game,
                id: curr.id
            }
            acc.push(value)
            return acc;
        }, []);

        setOptions(values);
    },[]);

    useEffect(() => {  
        const log = selectedOption.map(i => i.id);
        console.log(log);
    },[selectedOption]);
    
    const promiseOptions = (inputValue) =>
        new Promise(resolve => resolve(filterOptions(inputValue))
    );

    const filterOptions = (inputValue) => 
        options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    const customStyles = {
        option: () => ({
          padding: 7,  
          color: 'black',
          height: 35,
          width: 300,
          backgroundColor: 'white'
        }),
    }
    
    return (
        <>
            <AsyncSelect 
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