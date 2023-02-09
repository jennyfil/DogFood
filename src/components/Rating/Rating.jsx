import React from "react";
import { Star, StarFill } from "react-bootstrap-icons";

import "./rating.css";


export default ({ rating }) => {

    const setRating = (n) => {
        let stars = [];
        for (let i = 0; i < n; i++) {
            stars.push(<StarFill key={i} />);
        }
        for (let i=stars.length; i<5; i++) {
            stars.push(<Star key={i} />);
        }
        return stars;
    }

    return (
        <div className="rating">
            {setRating(rating)}
        </div>
    )
}