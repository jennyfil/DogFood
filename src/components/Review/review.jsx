import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Rating from "../Rating/Rating";
import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";

import "./style.css";


export default ({ author, rating, text, created_at, product, _id }) => {
    const {api, user, setGoods} = useContext(Ctx);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    
    const deleteReview = () => {
        if(author===user._id) {
            api.deleteReview(product, _id)
            .then(data => {
                if(!data.error) {
                    setGoods(prev => [...prev, data]);
                    navigate(`${PATH}catalog/${product}`);
                }
            })
        }
    }

    useEffect(() => {
        api.getUserById(author)
        .then(data => {
            setName(data.name);
        })
    }, [])

    return (
        <div className="review-container">
            <div className="review">
                {author && <h5>{name}</h5>}
                <Rating rating={rating}/>

                <p className="review__text">{text ? text : ""}</p>
                <div className="review__date">{new Date(created_at).toLocaleString()}</div>
            </div>

            {author===user._id && 
            <button className="btn-del-review" onClick={deleteReview}>Удалить отзыв</button>}
        </div>
    )
}