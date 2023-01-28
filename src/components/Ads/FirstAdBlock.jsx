import React from "react";

import "./ads.css";

import presentPic from "./img/present.jpg";

export default () => {
    return (
            <div className="first-block">
                <div className="first-block__item">
                    <h2>Подарок за
                        <br />
                        первый заказ!</h2>
                    <p>Сухой корм "Мясное изобилие"</p>
                </div>
                <img src={presentPic} />
            </div>  
    )
}