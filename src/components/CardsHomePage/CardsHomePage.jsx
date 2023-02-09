import React from "react";

import Card from "../Card/Card";

import "./style.css";

export default ({ data }) => {
    const flag = "true";
    
    return (
        <div className="cards">
            {data.map((el, i) => <Card {...el} flag={flag} key={"card_" + i} />)}
        </div>
    )
}