import React from "react";

import dogFoodMixedPic from "./img/dog-food-mixed.png";
import butterPic from "./img/butter.png";
import "./thirdBlock.css";

export default () => {
    return (
        <div className="third-block">
            <div className="ad-item blue">
                <div>
                    <h3>Сухой корм для щенков</h3>
                    <p>Мясной микс для здоровья шерсти</p>
                </div>
                <img className="ad-img" src={dogFoodMixedPic} />
            </div>
            <div className="ad-item orange">
                <div>
                    <h3>Масло дикого лосося</h3>
                    <p>
                        Укрепляет имунную систему,
                        <br />
                        улучшает состояние кожи и шерсти
                    </p>
                </div>
                <img className="ad-img" src={butterPic} />
            </div>
        </div>
    )
}