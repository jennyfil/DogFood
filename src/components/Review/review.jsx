import React from "react";
import {Star, StarFill} from "react-bootstrap-icons";
import "./style.css";

export default ({author, rating, created_at}) => {
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

    // console.log(typeof author)
    // console.log(author)

    return (
        <div className="review">
            {/* <p>{author ? author.name : ""}</p> */}
            <div className="review__author">{author || ""}</div>
            <div className="review__rating">{setRating(rating)}</div>
            <div className="review__date">{new Date(created_at).toLocaleString()}</div>
        </div>
    )
}