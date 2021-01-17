import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address:{
            street: '',
            postalCode: ''
        },
        price:0,
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({
            loading:true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer:{
                name: 'sibel kahraman',
                email: 's@gmail.com',
                address: {
                    street: 'world',
                    city: 'logo',
                    countary: 'heaven'
                },
                paymentType: 'cash'
            }
        }
        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading:false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading:false
                });
            });
    }


    render(){
        let form = (<form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
            <input className={classes.Input} type='email' name='email' placeholder='Your Mail'/>
            <input className={classes.Input} type='text' name='street' placeholder='Your Street'/>
            <input className={classes.Input} type='text' name='postalCode' placeholder='Your PostalCode'/>
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );

    }
}

export default ContactData;