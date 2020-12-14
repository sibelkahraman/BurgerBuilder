import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType='Danger'
                clicked={props.purchaseCanceled}
                >CANCEL</Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinued}
                >CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;
