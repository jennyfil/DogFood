import React from "react";
import { Link } from "react-router-dom";

import { PATH } from"../../utils/constants";
import "./style.css";


export default () => {

    return (
        <div className="block-to-catalog">
            <h2>Крафтовые лакомства для собак</h2>
            <p>Всегда свежие лакомства ручной работы с доставкой на дом по России и всему миру</p>
            <Link className="btn-link" to={PATH + "catalog"}>
                Каталог
                <i className="fa-solid fa-angle-right" />
            </Link>
        </div>
    )
}