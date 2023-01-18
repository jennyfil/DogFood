import React from "react";
import "./style.css";


export default ({ flag, name, like, price, pictures, wight, discount }) => {
    const discountPrice = Math.round(price - (price * discount) / 100);
    return (
        <div className="card">
            <div className="card__sticky card__sticky_top-left">
                {discount > 0 && <span className="card__discount">{discount} %</span>}
            </div>

            <span className="card__sticky card__sticky_top-right">
                {
                like
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
                }
            </span>

            <div className="card__pic">
                <img src={pictures} alt="Здесь будет фотография товара" />
            </div>
            
            {discount > 0 && <span className="card__price card__old-price">{price} руб</span>}            
            <span className={discount > 0 ? "card__price card__price_type_discount" : "card__price"}>{discountPrice} руб</span>
            <div className="card__weight">{wight}</div>
            <h3>{name}</h3>

            {!flag ? <button className="btn-card">Купить</button> : ""}
        </div>
    )
}