import React, { useState, useContext, useEffect } from "react";
import Ctx from "../../Ctx";
import "./style.css";
import noimg from "../img/no-image.png";

export default ({ flag, name, likes, price, pictures, wight, discount, _id }) => {
    const {user, setFavorites, api, setGoods} = useContext(Ctx);
    const discountPrice = Math.round(price - (price * discount) / 100);
    const [like, setLike] = useState(likes && likes.includes(user._id));
    
    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLike(!like);

        api.setLike(_id, like)
        .then(res => res.json())
        .then(data => {
            setFavorites(prev => {
                let arr = prev.filter(el => el._id === _id)
                return arr.length > 0 ? 
                prev.filter(el => el._id !== _id) : 
                [...prev, data]
            })
        })
    }

    useEffect(() => {
        api.getProducts()
        .then(res => res.json())
        .then(data => {
            if(!data.error) {
                setGoods(data.products);
            }
        })
    }, [like])

    return (
        <div className="card">
            <div className="card__sticky card__sticky_top-left">
                {discount > 0 && <span className="card__discount">{discount} %</span>}
            </div>

            <span className="card__sticky card__sticky_top-right" onClick={update}>
                {
                like
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
                }
            </span>

            <div className="card__pic">
                <img src={pictures} alt={noimg} />
            </div>
            
            {discount > 0 && <span className="card__price card__old-price">{price} руб</span>}            
            <span className={discount > 0 ? "card__price card__price_type_discount" : "card__price"}>{discountPrice} руб</span>
            <div className="card__weight">{wight}</div>
            <h3>{name}</h3>

            {!flag ? <button className="btn-card">Купить</button> : ""}
        </div>
    )
}