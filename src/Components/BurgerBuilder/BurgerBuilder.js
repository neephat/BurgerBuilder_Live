//! This component will control all the logics of the app

import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
    addIngredient,
    removeIngredient,
    updatePurchasable,
} from "../../redux/actionCreators";

//!_____________________________________________________________________________________

//!------------------- Redux -------------------------
const maoStateToProps = (state) => {
    return {
        ingredients: state.Ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddIngredient: (igType) => dispatch(addIngredient(igType)),
        RemoveIngredient: (igType) => dispatch(removeIngredient(igType)),
        UpdatePurchasable: () => dispatch(updatePurchasable()),
    };
};

//!------------------- X -------------------------

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
        onClickCheckout: false,
    };

    addIngredientHandle = (type) => {
        this.props.AddIngredient(type);
        this.props.UpdatePurchasable();
    };

    removeIngredientHandle = (type) => {
        this.props.RemoveIngredient(type);
        this.props.UpdatePurchasable();
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    };

    handCheckout = () => {
        this.setState({
            onClickCheckout: true,
        });
    };

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingerdients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        toggleModal={this.toggleModal}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order summary </ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice}</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            style={{
                                backgroundColor: "#D70f64",
                            }}
                            onClick={this.handCheckout}
                        >
                            Continue to Checkout
                        </Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {this.state.onClickCheckout && (
                    <Navigate to="/checkout" replace={true} />
                )}
            </div>
        );
    }
}


export default connect(maoStateToProps, mapDispatchToProps)(BurgerBuilder);
