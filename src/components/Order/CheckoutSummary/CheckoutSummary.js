import React from 'react';

import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%',  margin:'auto'}}></div>
            <Burger ingredients={props.ingredients}/>
        </div>
    );
}

export default CheckoutSummary;