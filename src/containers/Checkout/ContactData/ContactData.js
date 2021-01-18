import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{
    state = {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            postalCode: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            deliveryType:{
                elementType:'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        price:0,
        loading:false
        
    }

    orderHandler = (event) =>{
        event.preventDefault();
        const orderData = [];
        for (let formElementIdentifier in this.state.orderForm){
            orderData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({
            loading:true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            orderData: orderData
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

    inputChangedHandler(event, inputIdentifier){
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderElement = {...updatedOrderForm[inputIdentifier]}
        updatedOrderElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        this.setState({
            orderForm: updatedOrderForm
        })
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]}
            )
        }
        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input 
                    key= {formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
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