import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/ThemeButton/themeButtonReducer';

const ThemeButton = () => {
    const {theme} = useSelector(state => state.themeButton)
    const dispatch = useDispatch()

    return (
        <>
            <button
                className='change-theme'
                onClick={() => dispatch(changeTheme())}
            >
                {theme === 'ligth'? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} /> }
            </button>
        </>
    );
};

export default ThemeButton;