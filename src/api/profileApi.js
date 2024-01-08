import axios from "axios";
const URL = process.env.REACT_APP_BACKEND_URL;

export const newOrder = (token, data) => {
    return axios.post(`${URL}/api/order`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = (token, data) => {
    return axios.post(`${URL}/api/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

//! --------- Payment ------------
export const initPayment = (token, price, order) => {
    return axios.get(`${URL}/api/payment?price=${price}&order=${order}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
