import React from "react";
import "./ads.css";

import deerAntlersPic from "./img/deer-antlers.png";
import dogToyPic from "./img/dog-toy.png";
import dogFoodWetPic from "./img/dog-food-wet.png";

export default () => {
    return (
            <div className="ad-block second-block">
                <div className="ad-block__item green">
                    <div>
                        <h3>Рога северного оленя</h3>
                        <p>от 10 до 30 кг</p>
                    </div>
                    <img className="second-block__img" src={deerAntlersPic} />
                </div>

                <div className="ad-block__item orange">
                    <div>
                        <h3>Игрушка для собак</h3>
                    </div>
                    <img className="second-block__img" src={dogToyPic} />
                </div>

                <div className="ad-block__item blue">
                    <div>
                        <h3>Влажный корм для собак</h3>
                    </div>
                    <img className="second-block__img" src={dogFoodWetPic} />
                </div>
            </div> 
    )
}