import React from 'react';
import Aux from '../../../hoc/Auxillary';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(inKey => {
            return <li key={inKey}> 
                        <span 
                            style={{textTransform:'capitalize'}}>{inKey}
                        </span> : {props.ingredients[inKey]}
                    </li>
    });

    return (    
        <Aux>
            <h3> Your Order</h3>
            <p>A delicuous burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default orderSummary;
