import React from "react";
import "./ads.css";

import Card from "../Card";

import presentPic from "./img/present.jpg";
import deerAntlersPic from "./img/deer-antlers.png";
import dogToyPic from "./img/dog-toy.png";
import dogFoodWetPic from "./img/dog-food-wet.png";
import dogFoodMixedPic from "./img/dog-food-mixed.png";
import butterPic from "./img/butter.png";

export default ({data}) => {
    return (
        <>
            <a href="" className="first-block">
                <div className="first-block__item">
                    <h2>Подарок за
                        <br />
                        первый заказ!</h2>
                    <p>Сухой корм "Мясное изобилие"</p>
                </div>
                <img src={presentPic} />
            </a>

            <div className="ad-block second-block">
                <a href="" className="ad-block__item green">
                    <div>
                        <h3>Рога северного оленя</h3>
                        <p>от 10 до 30 кг</p>
                    </div>
                    <img className="second-block__img" src={deerAntlersPic} />
                </a>
                <a href="" className="ad-block__item orange">
                    <div>
                        <h3>Игрушка для собак</h3>
                    </div>
                    <img className="second-block__img" src={dogToyPic} />
                </a>
                <a href="" className="ad-block__item blue">
                    <div>
                        <h3>Влажный корм для собак</h3>
                    </div>
                    <img className="second-block__img" src={dogFoodWetPic} />
                </a>
            </div>

            <div className="cards">
                    {data.map((el, i) => <Card
                                            key={"card_" + i}
                                            text={el.name}
                                            like={(i+1) % 2 === 0}
                                            price={el.price}
                                            pictures={el.pictures}
                                            weight={el.wight}
                                            />)}
            </div>

            <div className="ad-block">
                <a href="" className="ad-block__item blue">
                    <div>
                        <h3>Сухой корм для щенков</h3>
                        <p>Мясной микс для здоровья шерсти</p>
                    </div>
                    <img className="ad-block__img" src={dogFoodMixedPic} />
                </a>
                <a href="" className="ad-block__item">
                    <div>
                        <h3>Масло дикого лосося</h3>
                        <p>
                            Укрепляет имунную систему,
                            <br />
                            улучшает состояние кожи и шерсти
                        </p>
                    </div>
                    <img className="ad-block__img" src={butterPic} />
                </a>
            </div>
        </>   
    )
}