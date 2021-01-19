import React from 'react';

import classes from './Input.css';


const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.inputElement];
    let validationError = null;

    if (props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.validationError}>{props.validationErrorMessage}</p>
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                key={props.key}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea                 
                key={props.keyy}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case('select'):
            inputElement = (
                <select 
                    key={props.key}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map( option => (
                        <option key={option.name} name={option.name}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input 
                key={props.key}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>

    );
};

export default input;