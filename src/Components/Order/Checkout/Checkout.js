import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";
import { Navigate } from "react-router-dom";
import { updateProfile, initPayment, newOrder } from "../../../api/profileApi";

const mapStateTopProps = (sate) => {
    return {
        ingredients: sate.Ingredients,
        totalPrice: sate.totalPrice,
        purchasable: sate.purchasable,
        userId: sate.userId,
        token: sate.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    };
};

class Checkout extends Component {
    state = {
        values: {
            phone: "",
            address1: "",
            address2: "",
            city: "",
            postcode: "",
            country: "",
            paymentType: "Cash on Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
        goBack: false,
        sessionSuccess: false,
        redirectUrl: "",
        failed: false,
    };

    //?--------- this function doesn't work -----------

    goBack = () => {
        this.setState({
            goBack: true,
        });
    };

    //? ------------------------------------------------

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
                //* deliveryAddress: value
            },
        });
    };

    submitHandler = () => {
        updateProfile(this.props.token, this.state.values)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
            orderStatus: "Cash on delivery",
        };

        const order2 = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
            orderStatus: "Payment completed by online payment system",
        };

        const orderJsonString = JSON.stringify(order2);

        if (this.state.values.paymentType === "Online Payment") {
            initPayment(
                this.props.token,
                this.props.totalPrice,
                orderJsonString
            )
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === "SUCCESS") {
                        this.setState({
                            sessionSuccess: true,
                            redirectUrl: response.data.GatewayPageURL,
                            failed: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        failed: true,
                        sessionSuccess: false,
                    });
                });
        } else {
            newOrder(this.props.token, order)
                .then((res) => {
                    if (res.status === 201) {
                        this.setState({
                            isModalOpen: true,
                            modalMsg: "Order Placed Successfully",
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            isModalOpen: true,
                            modalMsg: "Something Went Wrong! Order Again!",
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    render() {
        let form = (
            <div>
                <h4
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderRadius: "5px",
                        padding: "20px",
                    }}
                >
                    Payment:{this.props.totalPrice} BDT
                </h4>
                <form
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderRadius: "5px",
                        padding: "20px",
                    }}
                >
                    <input
                        name="phone"
                        className="form-control"
                        value={this.state.values.phone}
                        placeholder="Your Phone Number"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <textarea
                        name="address1"
                        value={this.state.values.address1}
                        className="form-control"
                        placeholder="address1"
                        onChange={(e) => this.inputChangerHandler(e)}
                    ></textarea>
                    <br />
                    <textarea
                        name="address2"
                        value={this.state.values.address2}
                        className="form-control"
                        placeholder="address2"
                        onChange={(e) => this.inputChangerHandler(e)}
                    ></textarea>
                    <br />
                    <input
                        type="text"
                        name="city"
                        value={this.state.values.city}
                        placeholder="City"
                        className="form-control"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <input
                        type="text"
                        name="postcode"
                        value={this.state.values.postcode}
                        placeholder="postcode"
                        className="form-control"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <input
                        type="text"
                        name="country"
                        value={this.state.values.country}
                        placeholder="country"
                        className="form-control"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <select
                        name="paymentType"
                        className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(e) => this.inputChangerHandler(e)}
                    >
                        
                        <option value="Cash On Delivery">
                            Cash On Delivery
                        </option>
                        <option value="Online Payment">Online Payment</option>
                    </select>
                    <br />
                    <Button
                        style={{ backgroundColor: "#D70F64" }}
                        className="mr-auto"
                        onClick={this.submitHandler}
                        disabled={!this.props.purchasable}
                    >
                        Place Order
                    </Button>

                    <Button
                        color="secondary"
                        className="ms-1"
                        onClick={this.goBack}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                {this.state.sessionSuccess
                    ? (window.location = this.state.redirectUrl)
                    : ""}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>

                {this.state.goBack && <Navigate to="/" replace={true} />}
            </div>
        );
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Checkout);

