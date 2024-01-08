import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import SingleOrder from "./SingleOrder/SingleOrder";
import Spinner from "../Spinner/Spinner";

const mapStateToProps = (state) => {
    return {
        Orders: state.Orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    };
};

class Order extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
        console.log(this.props);
    }

    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = (
                <p
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderRadius: "5px",
                        padding: "20px",
                        marginBottom: "10px",
                    }}
                >
                    Sorry Failed to Load Orders!
                </p>
            );
        } else {
            if (this.props.Orders.length === 0) {
                orders = (
                    <p
                        style={{
                            border: "1px solid grey",
                            boxShadow: "1px 1px #888888",
                            borderRadius: "5px",
                            padding: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        You have no Orders!
                    </p>
                );
            } else {
                orders = this.props.Orders.map((order) => {
                    return <SingleOrder order={order} key={order.id} />;
                });
            }
        }

        return <div>{this.props.orderLoading ? <Spinner /> : orders}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
