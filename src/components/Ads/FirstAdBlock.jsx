import React from "react";

import presentPic from "./img/present.jpg";
import "./firstAdBlock.css";

export default () => {
    return (
        <div className="first-block">
            <div>
                <h2>Подарок за
                    <br />
                    первый заказ!</h2>
                <p>Сухой корм "Мясное изобилие"</p>
            </div>
            <img src={presentPic} />
        </div>  
    )
}