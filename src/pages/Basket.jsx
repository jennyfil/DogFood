import React, {useState, useEffect, useContext} from "react";
import {Table} from "react-bootstrap";

import Ctx from "../Ctx";
import Row from "../components/Row/Row";

export default () => {
    const [gds, setGds] = useState([]);
    const {basket, goods} = useContext(Ctx);
    
    useEffect(() => {
        let arr = [];
        if (goods.length) {
            basket.forEach(el => {
                arr.push(goods.filter(g => g._id === el.id)[0])
            })
        }
        setGds(arr);
        console.log(basket)
    }, [basket, goods])

    return (
        <div className="basket">
            
            <p>Корзина</p>
            {basket.length > 0 && gds.length > 0 && <Table hover>
                <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {basket.map((el, i) => <Row key={el.id} {...gds[i]} {...el} />)}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="text-end fw-bold fs-4">ИТОГО:</td>
                        <td className="fw-bold fs-4">
                            {basket.reduce((acc, el, i) => {
                                acc += el.cnt * gds[i].price;
                                return acc;
                            }, 0)} ₽
                        </td>
                    </tr>
                </tfoot>
            </Table>}
        </div>
    )
}

/*
    1) Создать массив корзины как контекст Ctx
    2) Сохранять корзину в localStorage
    3) Создать страницу Cart и подключить к ней роутер
    4) Создать ссыоку на страницу корзины (header)
    5) Научиться добавлять товары в корзину
    6) Отобразить инфу о корзине
    7) Изменять количество товаров в корзине и пересчитывать сумму
    [{
        id: '',
        cnt: ''
    }]
    */