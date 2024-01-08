import React from "react";
import "./Ingredient.css";
import BreadTop from "../../../assets/images/top.png";
import BreadBottom from "../../../assets/images/bottom.png";
import Meat from "../../../assets/images/meat.png";
import Salad from "../../../assets/images/salad.png";
import Cheese from "../../../assets/images/cheese.png";

const Ingredint = (props) => {
    let ingeredient = null;

    switch (props.type) {
        case "bread-bottom":
            ingeredient = (
                <div>
                    <img src={BreadBottom} alt="Bottom bread" />
                </div>
            );

            break;
        case "bread-top":
            ingeredient = (
                <div>
                    <img src={BreadTop} alt="Top bread" />
                </div>
            );

            break;
        case "meat":
            ingeredient = (
                <div>
                    <img src={Meat} alt="Top bread" />
                </div>
            );

            break;
        case "cheese":
            ingeredient = (
                <div>
                    <img src={Cheese} alt="Top bread" />
                </div>
            );

            break;
        case "salad":
            ingeredient = (
                <div>
                    <img src={Salad} alt="Top bread" />
                </div>
            );

            break;
        default:
            ingeredient = null;
    }
    return <div className="Ingredient">{ingeredient}</div>;
};

export default Ingredint;
