import React, { useContext, useState } from "react";
import { SortNumericDown, SortNumericUp  } from "react-bootstrap-icons";

import Ctx from "../../context/Ctx";
import { productDiscountPrice } from "../../utils/constants";

import "./sort.css";

export default ({ setSortGoods }) => {
    const {visibleGoods} = useContext(Ctx);
    const [btnType, setBtnType] = useState("");


    const updSort = (e) => {
        let el = e.currentTarget;
        let flag = false;
        if(el.classList.contains("sort")) {
            el.classList.remove("sort");
            setBtnType("");
            flag = true;
        } else {
            el.classList.add("sort");
            setBtnType(el.title);
        }
        if(flag) {
            setSortGoods(visibleGoods);
        } else {
            let data = [...visibleGoods];
            switch (el.title) {
                case "down": 
                    console.log(data)
                    data.sort((a, b) => productDiscountPrice(a.price, a.discount) - productDiscountPrice(b.price, b.discount));
                    break;
                case "up": 
                    data.sort((a, b) => productDiscountPrice(b.price, b.discount) - productDiscountPrice(a.price, a.discount));
                    break;
                case "new": 
                    data = data.filter(d => d.tags.includes("new"));
                    break;
                case "sale": 
                    data = data.filter(d => d.discount > 0)
                    break;
            }
            setSortGoods(data);
        }
    }

    return (
        <div className="sort-block">
            <button 
                className={`btn ${btnType === "up" ? "sort" : ""}`}
                title="up"
                onClick={updSort}>
                    <SortNumericUp /> цены
            </button>

            <button 
                className={`btn ${btnType === "down" ? "sort" : ""}`}
                title="down"
                onClick={updSort}>
                    <SortNumericDown /> цены
            </button>

            <button
                className={`btn ${btnType === "new" ? "sort" : ""}`}
                title="new"
                onClick={updSort}>
                    новинки
            </button>

            <button
                className={`btn ${btnType === "sale" ? "sort" : ""}`}
                title="sale"
                onClick={updSort}>
                    скидка
            </button>

        </div>
    )
}