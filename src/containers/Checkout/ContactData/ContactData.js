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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationErrorMessage: 'Input Name is not Valid!'
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationErrorMessage: 'E-Mail is not Valid!'
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationErrorMessage: 'Street is not Valid!'
            },
            postalCode: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 5,
                    maxLenght: 5
                },
                valid: false,
                validationErrorMessage: 'ZIP Code is not Valid!'
            },
            deliveryType:{
                elementType:'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true,
                touched: false,
                validationErrorMessage: ''
            }
        },
        price:0,
        loading:false,
        formIsValid:false
        
    }

    checkValidity(rules, value){
        let isValid = true;
        if(rules && rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules && rules.minLenght){
            isValid = value.length >= rules.minLenght && isValid
        }
        if(rules && rules.maxLenght){
            isValid = value.length <= rules.maxLenght && isValid
        }
        return isValid;
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
        updatedOrderElement.touched = true;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.validation, updatedOrderElement.value)
        
        let formIsValid = true;
        for (let identifier in updatedOrderForm){
            formIsValid = updatedOrderForm[identifier].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
        console.log(this.state.formIsValid)
    }


    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]})
        }
        let form = (
        <form onSubmit={this.orderHandlers}>
            {formElementsArray.map(formElement => (
                <Input 
                    keyy={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    validationErrorMessage={formElement.config.validationErrorMessage}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
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