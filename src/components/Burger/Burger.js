import React from 'react';
import {withRouter} from 'react-router-dom'; 

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(inKey => {
            return [...Array(props.ingredients[inKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={inKey +i} type={inKey} />
                });
        }).reduce((prev, curr) => {
            return prev.concat(curr);
        }, []);
        console.log(transformedIngredients);
        if (transformedIngredients.length === 0){
            transformedIngredients = <div>Please Add an Ingredients!</div>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);