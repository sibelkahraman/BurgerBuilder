import React from 'react';
import Logo from '../../assests/images/burger-logo.png';
import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img 
            src={Logo} 
            alt='BurgerLogo'/>
    </div>
);

export default logo;