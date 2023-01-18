import React from "react";
import "./ads.css";

import dogFoodMixedPic from "./img/dog-food-mixed.png";
import butterPic from "./img/butter.png";

export default () => {
    return (
        <div className="ad-block">
            <div className="ad-block__item blue">
                <div>
                    <h3>Сухой корм для щенков</h3>
                    <p>Мясной микс для здоровья шерсти</p>
                </div>
                <img className="ad-block__img" src={dogFoodMixedPic} />
            </div>
            <div className="ad-block__item">
                <div>
                    <h3>Масло дикого лосося</h3>
                    <p>
                        Укрепляет имунную систему,
                        <br />
                        улучшает состояние кожи и шерсти
                    </p>
                </div>
                <img className="ad-block__img" src={butterPic} />
            </div>
        </div>
    )
}