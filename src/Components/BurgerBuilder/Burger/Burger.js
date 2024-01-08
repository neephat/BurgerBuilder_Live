import React from "react";
import Ingredint from "../Ingredient/Ingredint";
import "./Burger.css";
const Burger = (props) => {
    let ingerdientsArr = props.ingerdients
        .map((item) => {
            let amountArr = [...Array(item.amount).keys()];
            // console.log(amountArr)
            return amountArr.map((_) => {
                return <Ingredint type={item.type} key={Math.random()} />;
            });
        })
        .reduce((arr, element) => {
            // console.log(arr);
            // console.log(element)
            return arr.concat(element);
        }, []);
    if (ingerdientsArr.length === 0) {
        ingerdientsArr = <p>Please add some indgredients</p>
    }
        return (
            <div className="Burger">
                <Ingredint type="bread-top" />
                {ingerdientsArr}
                <Ingredint type="bread-bottom" />
            </div>
        );
};

export default Burger;
