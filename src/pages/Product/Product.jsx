import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Trash3, Truck, Check2Circle, PencilSquare } from "react-bootstrap-icons";

import Review from "../../components/Review/Review";
import { productDiscountPrice } from "../../utils/constants";
import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";
import AddReview from "../../components/AddReview/AddReview";

import "./product.css";

export default () => {
    const {api, user, setGoods, setVisibleGoods, setBasket} = useContext(Ctx);
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.getProductById(id)
            .then(data => {
                setProduct(data);
            })
    }, []);

    const remove = () => {
        api.deleteProduct(id)
        .then(data => {
            if(!data.error) {
                setGoods(prev => prev.filter(el => el._id !== data._id));
                setVisibleGoods(prev => prev.filter(el => el._id !== data._id));
                navigate(`${PATH}catalog`);
            }
        })
    };

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === id);
            if(test.length) {
                return prev.map(el => {
                    if(el.id === id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else {
                return [...prev, {id: id, cnt: 1}];
            }
        })
    }

    return (
        <div className="product-container">
            <Link className="product-card__link" to={PATH + "catalog"}>
                <i className="fa-solid fa-angle-left" />  Назад
            </Link>

            {product && product.author && product.author._id === user._id && 
                <div className="btn-block">
                    <Link className="btn-change" to={`${PATH}modify/${id}`}>
                        <PencilSquare />
                    </Link>

                    <button onClick={remove} className="btn-change">
                        <Trash3 />
                    </button>
                </div>
            }

            <div className="product-card">
                <h2>{product.name || "Страница товара"}</h2>
                
                <HashLink to={`${PATH}catalog/${id}#allreviews`}>
                    <span className="reviews_quantity">Oтзывов: {product.reviews?.length}</span>
                </HashLink>

                <div className="product__info-top">
                    <div className="product-card__sticky card__sticky_top-left">
                        {product.discount > 0 && 
                            <span className="product-card__discount">{product.discount} %</span>
                        }
                    </div>
                    
                    <div className="product___img-container">
                        <img src={product.pictures} alt="Здесь будет фотография товара" />
                    </div>

                    <div className="product__info-price">
                        <div className="product__price-and-price-discount">
                            {product.discount > 0 && 
                                <span className="product__old-price">{product.price} руб</span>
                            }            
                            <span className={product.discount > 0 
                                ? "product__price product__price_type_discount" 
                                : "product__price"}>
                                    {productDiscountPrice(product.price, product.discount)} руб
                            </span>
                        </div>
                        <div className="product__cart">
                            <button className="product__btn-card" onClick={buy}>В корзину</button>
                        </div>

                        <div className="product__about">
                            <Truck className="about-icon"/>
                            <div className="about-block__info">
                                <p>Доставка по всему миру!</p>
                                <p>Доставка курьером - <span className="bold">от 399 руб</span></p>
                                <p>Доставка в пункт выдачи - <span className="bold">от 199 руб</span></p>
                            </div>
                        </div>
                        <div className="product__about">
                            <Check2Circle className="about-icon check-circle" />

                            <div className="about-block__info">
                                <p>Гарантия качества</p>
                                <p>Если вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем всё возможное, чтобы удовлетворить ваши нужды</p>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className="product-description">
                    <span>Описание</span>
                    <p>{product.description}</p>

                    <span>Характеристики</span>
                    <div className="product-description__table">
                        <div>Вес</div>
                        <div>{product.wight}</div>
                        <div>Количество</div>
                        <div>{product.stock} шт</div>
                    </div>

                    <span id="allreviews">Отзывы</span>
                    <div className="reviews">
                        <AddReview id={id} setProduct={setProduct} />

                        {product.reviews && product.reviews.length > 0 &&
                            product.reviews.map((el, i) => <Review {...el} key={i} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}