import React from "react";
import { Link } from "react-router-dom";
import { EmojiFrown } from "react-bootstrap-icons";

import { PATH } from"../../utils/constants";

import './style.css';

export default ({ fromPage }) => {

    return (
        <div className="empty-block">
            <EmojiFrown />
            {fromPage === 'fav' && <>
                <p>Вы еще не добавили любимые товары</p>
                <Link to={PATH + "catalog"} className="product__btn-card">В каталог</Link>
            </>}
            {fromPage === 'bask' && <>
                <span>В корзине нет товаров</span>
                <p>Добавьте товар, нажав кнопку "Купить" в карточке товара</p>
                <Link to={PATH + "catalog"} className="product__btn-card">В каталог</Link>
            </>}
            {fromPage === 'noGoods' && <>
                <p>Простите, по вашему запросу товаров не найдено</p>
                <Link to={PATH} className="product__btn-card">На главную</Link>
            </>}
            {fromPage === 'noAuth' && <>
                <p>Авторизируйтесь, чтобы получить доступ к товарам</p>
                <Link to={PATH} className="product__btn-card">На главную</Link>
            </>}

        </div>
    )
}

