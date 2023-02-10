import React, { useState, useEffect, useContext } from "react";
import { Image, Button, ButtonGroup } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";

import {productDiscountPrice} from "../../utils/constants";
import Ctx from "../../context/Ctx";

import './style.css';


export default ({ name, pictures, cnt, price, id, discount }) => {
    const {setBasket} = useContext(Ctx);
    const [n, setN] = useState(cnt);
    const [flag, setFlag] = useState(false);
   
    const increment = () => {
        setFlag(true);
        setN(n + 1);
    }

    const decrement = () => {
        setFlag(true);
        setN(n - 1);
    }

    const filter = (prev) => {
        return prev.filter(el => el.id !== id);
    }

    const removeFromBasket = () => {
        setN(0);
        setBasket(prev => {
            return filter(prev);
        })
    }
    
    useEffect(() => {
        if (flag) {
            setBasket(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.cnt = n;
                        }
                        return el;
                    })
                } else {
                    return filter(prev);
                }
            })
        }
    }, [n]);


    return (
        <tr className="align-middle">
            <td>
                <Image className="row_img" src={pictures} alt={name} 
                // height="100" 
                />
            </td>
            <td>{name}</td>
            <td>
                <ButtonGroup>
                    <Button className="btn_row" variant="warning" onClick={decrement}>-</Button>
                    <Button variant="light" disabled>{n}</Button>
                    <Button className="btn_row" variant="warning" onClick={increment}>+</Button>
                </ButtonGroup>
            </td>
            <td className="position-relative">
                <div className="row__price-block">
                    <div className={discount 
                            ? "row__price product__price_type_discount" 
                            : "row__price"}>
                        {productDiscountPrice(price, discount) * n} ₽
                    </div>
                    {discount > 0 && <div className="row__old-price">{price * n} ₽</div>}
                </div>
            </td>
            <td>
                <button onClick={removeFromBasket} className="btn-change">
                    <Trash3 />
                </button>
            </td>
        </tr>
    )
}

