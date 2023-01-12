import React from "react";
import "./style.css";
import Card from "../Card";

export default ({data}) => {
    return (
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
    )
}