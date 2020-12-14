import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]

    if(props.showBackdrop){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
            <Backdrop 
                show={props.showBackdrop} 
                clicked={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
        
    );
}

export default sideDrawer;