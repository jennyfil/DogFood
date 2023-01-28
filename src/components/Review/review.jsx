import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Star, StarFill} from "react-bootstrap-icons";

import "./style.css";

import Ctx from "../../Ctx";

export default ({ author, rating, text, created_at, product, _id }) => {
    const {api, user, PATH, setGoods} = useContext(Ctx);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const setRating = (n) => {
        let stars = [];
        for(let i = 0; i < n; i++) {
            stars.push(<StarFill key={i} />);
        }
        for(let i=stars.length; i<5; i++) {
            stars.push(<Star key={i} />);
        }
        return stars;
    }
    
    const deleteReview = () => {
        if(author===user._id) {
            api.deleteReview(product, _id)
            .then(res =>res.json())
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
        .then(res =>res.json())
        .then(data => {
            setName(data.name);
        })
    }, [])

    return (
        <div className="review-container">
            <div className="review">
                <p>{author ? name : ""}</p>
                <div className="review__rating">{setRating(rating)}</div>
                <p className="review__text">{text ? text : ""}</p>
                <div className="review__date">{new Date(created_at).toLocaleString()}</div>
            </div>

            {author===user._id && <button className="btn-del-review" onClick={deleteReview}>Удалить отзыв</button>}
        </div>


    )
}