import * as actionTypes from "./actionTypes";
import axios from "axios";
//!------------------------------------------------

export const addIngredient = (ingType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: ingType,
    };
};

export const removeIngredient = (ingType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: ingType,
    };
};

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    };
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    };
};

export const loadOrders = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    };
};

export const orderLoadFailed = () => {
    return {
        type: actionTypes.LOAD_ORDERS,
    };
};

export const fetchOrders = (token, userId) => (dispatch) => {
    let url = process.env.REACT_APP_BACKEND_URL;
    axios
        .get(`${url}/api/order`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            dispatch(loadOrders(response.data));
            console.log(response.data);
        })
        .catch((err) => {
            dispatch(orderLoadFailed());
        });
};
