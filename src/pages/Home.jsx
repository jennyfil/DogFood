import React from "react";

import "./pages.css";

import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data}) => {
    return (
        <div className="home">
            <Link className="link-home" to="/catalog">Перейти в каталог</Link>
            <Ads data={data}/>           
        </div>
    )
}