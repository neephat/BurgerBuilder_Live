import * as actionTypes from "./actionTypes";
//!------------------------------------------------
const INGREDIENTS_PRICE = {
    salad: 20,
    meat: 90,
    cheese: 40,
};

const INITIAL_STATE = {
    Ingredients: [
        { type: "salad", amount: 0 },
        { type: "cheese", amount: 0 },
        { type: "meat", amount: 0 },
    ],
    Orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchasable: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.Ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    item.amount++;
                }
            }
            return {
                ...state,
                Ingredients: ingredients,
                totalPrice:
                    state.totalPrice + INGREDIENTS_PRICE[action.payload],
            };

        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                Ingredients: ingredients,
                totalPrice:
                    state.totalPrice - INGREDIENTS_PRICE[action.payload],
            };

        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.Ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0);
            return {
                ...state,
                purchasable: sum > 0,
            };
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: "salad", amount: 0 },
                    { type: "cheese", amount: 0 },
                    { type: "meat", amount: 0 },
                ],
                totalPrice: 80,
                purchasable: false,
            };

        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                });
            }
            // console.log(orders);
            return {
                ...state,
                Orders: orders,
                orderLoading: false,
            };
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            };

        //* ----------- Auth Cases --------------
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        //* ----------- Logout --------------
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null,
            };
        //* ----------- authLoading --------------
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            };
        //* ----------- authFailed --------------
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            };

        default:
            return state;
    }
};
