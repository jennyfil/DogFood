import React from "react";
import Card from "../components/Card";
import "./pages.css";

export default ({data}) => {
    console.log(data);
    return (
        <>
            <h1>Каталог товаров</h1>
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
        </>
    )
}