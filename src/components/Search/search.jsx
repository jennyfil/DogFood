import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

import {ReactComponent as SearchImg} from "./img/magnifying-glass-solid.svg";
import {ReactComponent as CloseImg} from "./img/circle-xmark-regular.svg";
import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";

import "./search.css";


export default () => {
    const navigate = useNavigate();
    const {goods, setVisibleGoods, visibleGoods} = useContext(Ctx);
    const [text, setText] = useState("");

    const clearSearch = () => {
        setText("");
        setVisibleGoods(goods);
    }

    const search = (e) => {
        navigate(PATH + "catalog");
        setText(e.target.value);
        let arr = goods.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setVisibleGoods(arr);
    }

    return (
        <div className="search-block">
            <input placeholder="Поиск..." value={text} onChange={search} maxLength="50" />
            <button>
                {text ? <CloseImg onClick={clearSearch} /> : <SearchImg />}
            </button>
            {text && <div className="search-result">
                По запросу <b>{text}</b>&nbsp;
                {visibleGoods.length > 0 
                    ? `найдено ${visibleGoods.length} товаров`
                    : "не найдено ни одного товара"
                }
            </div>}
        </div>
    )
    
}
