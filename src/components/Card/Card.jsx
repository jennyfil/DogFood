import React, { useState, useContext, useEffect } from "react";

import noimg from "../../assets/img/no-image.png";
import Ctx from "../../context/Ctx";
import { productDiscountPrice } from "../../utils/constants";

import "./style.css";

export default ({ flag, name, likes, price, pictures, wight, discount, _id }) => {
    const {user, setFavorites, api, setGoods, setVisibleGoods, setBasket} = useContext(Ctx);
    const [like, setLike] = useState(likes && likes.includes(user._id));
    const [mark, setMark] = useState(false);
    
    const dataFilter = (prev, data) => {
        return prev.map(el => {
            if(el._id === data._id){
                return data;
            } else {
                return el;
            }
        })
    }

    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setMark(true);
        setLike(!like);

        api.setLike(_id, like)
        .then(data => {
            setFavorites(prev => {
                let arr = prev.filter(el => el._id === _id)
                return arr.length > 0 ? 
                prev.filter(el => el._id !== _id) : 
                [...prev, data]
            });

            setGoods(prev => dataFilter(prev, data));
            setVisibleGoods(prev => dataFilter(prev, data));
        })
    
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === _id);
            if(test.length) {
                return prev.map(el => {
                    if(el.id === _id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else return [...prev, {id: _id, cnt: 1}]; 
        })
    }

    return (
        <div className="card">
            <div className="card__sticky card__sticky_top-left">
                {discount > 0 && <span className="card__discount">{discount} %</span>}
            </div>

            <span className="card__sticky card__sticky_top-right" onClick={update}>
                {like
                ? <i className="fa-solid fa-heart" />
                : <i className="fa-regular fa-heart" />
                }
            </span>

            <div className="card__pic">
                <img src={pictures} alt={noimg} />
            </div>
            
            {discount > 0 && <span className="card__price card__old-price">{price} руб</span>}            
            <span className={discount > 0 
                ? "card__price card__price_type_discount"
                : "card__price"}>
                    {productDiscountPrice(price, discount)} руб
            </span>
            <div className="card__weight">{wight}</div>
            <h3>{name}</h3>

            {!flag && <button className="btn-card" onClick={buy}>Купить</button>}
        </div>
    )
}