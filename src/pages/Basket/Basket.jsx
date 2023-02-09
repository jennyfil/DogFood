import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";

import Row from "../../components/Row/Row";
import EmptyBlock from "../../components/EmptyBlock/EmptyBlock";
import { productDiscountPrice } from "../../utils/constants";
import Ctx from "../../context/Ctx";

import './basket.css';

export default () => {
    const [gds, setGds] = useState([]);
    const {basket, goods} = useContext(Ctx);
    const fromPage = 'bask';
    
    useEffect(() => {
        let arr = [];
        if (goods.length) {
            basket.forEach(el => {
                arr.push(goods.filter(g => g._id === el.id)[0])
            })
        }
        setGds(arr);
    }, [basket, goods])

    useEffect(() => {
        if(basket.length === 0) {
            localStorage.removeItem("basket");
        }
    })

    return (
        <div className="basket">
            { basket.length > 0 && gds.length > 0 && <span>Корзина</span> }

            { basket.length > 0 && gds.length > 0 
                ?  <> <div className="basket-left">
                        <Table hover>
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

                        </Table>
                    </div>

                    <div className="basket-right">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="2">
                                        <span>Ваша корзина</span>
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr>
                                    <td>Товары</td>
                                    <td>{ basket.reduce((acc, el, i) => {
                                            acc += el.cnt * gds[i].price
                                            return acc;
                                        }, 0) } ₽
                                    </td>
                                </tr>

                                <tr>
                                    <td>Скидка</td>
                                    <td className="product__price_type_discount"> { basket.reduce((acc, el, i) => {
                                            acc += el.cnt * (gds[i].price - productDiscountPrice(gds[i].price, gds[i].discount))
                                            return acc;
                                        }, 0) } ₽
                                    </td>
                                </tr>

                            </tbody>

                            <tfoot>
                                <tr className="bolder">
                                    <td >Общая стоимость</td>
                                    <td>{ basket.reduce((acc, el, i) => {
                                            acc += el.cnt * productDiscountPrice(gds[i].price, gds[i].discount)
                                            return acc;
                                        }, 0) } ₽
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </>
            : <EmptyBlock fromPage={fromPage} />
            }
        </div>
    )
}