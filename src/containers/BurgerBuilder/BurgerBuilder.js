import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const ingredientsPrice = {
    salad: 0.5,
    meat: 1,
    bacon: 0.8,
    cheese:0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        spinner: false,
        error:false
    }

    componentDidMount(){
        axiosInstance.get('http://firebase.com/ingredients')
                     .then(response => {
                        this.setState({
                            ingredients:{
                                salad: 0,
                                bacon: 1,
                                cheese: 0,
                                meat: 0
                            }
                        })
                       })
                       .catch(error => {
                          this.setState({
                              error:false
                          })
                      }
                          
                      )
                     
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(inKey => {
                return ingredients[inKey]
            })
            .reduce((sum, el) => {
                    return sum + el
            }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        const newCount = oldCount + 1;
        updatedIngredients[type] = newCount;
        const newTotalPrice = this.state.totalPrice + ingredientsPrice[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newTotalPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }
    lessIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        const newCount = oldCount - 1;
        updatedIngredients[type] = newCount;
        const newTotalPrice = this.state.totalPrice - ingredientsPrice[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newTotalPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.state.error ? <p style={{'text-align':'center'}}>Ingredients are not Loaded</p> : <Spinner/>
        let orderSummary = <Spinner/>
        
        if(this.state.ingredients){
            burger = (
                <Aux>   
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.lessIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading) {
            orderSummary= <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    };
}

export default withErrorHandler(BurgerBuilder, axiosInstance);