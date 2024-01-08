import React from "react";

const SingleOrder = (props) => {
    const ingredientSummary = props.order.ingredients.map((item) => {
        return (
            <span
                style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "5px",
                    marginRight: "10px",
                }}
                key={item.type}
            >
                {item.amount}x{" "}
                <span style={{ textTransform: "capitalize" }}>{item.type}</span>
            </span>
        );
    });

    let orderStatus = null;
    if (props.order.customer.paymentType === "Online Payment") {
        orderStatus = <span>Payment completed by online payment system</span>;
    } else {
        orderStatus = <span>Cash on Delivery</span>;
    }
    
    return (
        <div
            style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
            }}
        >
            <p>Order Number: {props.order._id}</p>
            <p>Delivery Address: {props.order.customer.address1}</p>
            <p>Order status: {orderStatus}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Total: {props.order.price} BDT</p>
        </div>
    );
};

export default SingleOrder;
