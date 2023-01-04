import React from "react";

import "./pages.css";

import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data}) => {
    return (
        <div className="home">
            <Ads data={data}/>           
        </div>
    )
}