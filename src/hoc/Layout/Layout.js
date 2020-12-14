import React,{Component} from 'react';
import Aux from '../Auxillary/Auxillary';
import  classes from './Layout.css';
import Toolbar from  '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState({ 
            showSideDrawer: true
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar open={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    close={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;