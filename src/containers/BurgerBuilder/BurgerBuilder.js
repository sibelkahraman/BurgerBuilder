import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const ingredientsPrice = {
    salad: 0.5,
    meat: 1,
    bacon: 0.8,
    cheese:0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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

    render(){
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.lessIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        )
    };
}

export default BurgerBuilder;