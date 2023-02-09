import React from "react";

import deerAntlersPic from "./img/deer-antlers.png";
import dogToyPic from "./img/dog-toy.png";
import dogFoodWetPic from "./img/dog-food-wet.png";
import "./secondAdBlock.css";

export default () => {
    return (
        <div className="second-block">
            <div className="ad-item green">
                <div>
                    <h3>Рога северного оленя</h3>
                    <p>от 10 до 30 кг</p>
                </div>
                <img className="second-ad-img" src={deerAntlersPic} />
            </div>

            <div className="ad-item orange">
                <h3>Игрушка для собак</h3>
                <img className="second-ad-img" src={dogToyPic} />
            </div>

            <div className="ad-item blue">
                <h3>Влажный корм для собак</h3>
                <img className="second-ad-img" src={dogFoodWetPic} />
            </div>
        </div> 
    )
}