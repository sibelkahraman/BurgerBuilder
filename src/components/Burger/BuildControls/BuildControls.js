import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(3)}</strong></p>
        {controls.map(ctr => (
            <BuildControl 
                key={ctr.label} 
                label={ctr.label}
                added={ () => props.ingredientAdded(ctr.type)}
                removed={ () => props.ingredientRemoved(ctr.type)}
                disabled={props.disabled[ctr.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchasable}>ORDER</button>
    </div>
);

export default buildControls;