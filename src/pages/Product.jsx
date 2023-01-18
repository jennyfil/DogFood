import React, {useState, useEffect, useContext} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import { Trash3, Truck, Check2Circle, PencilSquare } from "react-bootstrap-icons";

export default () => {
    const {api, PATH, user, setGoods} = useContext(Ctx);
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        api.getProductById(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    // if(product.author) {
        // console.log(product.author)
        // console.log(typeof product)
    // }

    const productDiscountPrice = Math.round(product.price - (product.price * product.discount) / 100);

    const remove = () => {
        api.deleteProduct(id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(!data.error) {
                setGoods(prev => prev.filter(g => g._id !== data._id));
                navigate(`${PATH}catalog`);
            }
        })
    };

    return (
        <>
            <Link className="product-card__link" to={PATH + "catalog"}>
                <i className="fa-solid fa-angle-left"></i>  Назад
            </Link>

            {product && product.author && product.author._id === user._id && <button 
                    onClick={remove} 
                    className="btn-change">
                        <PencilSquare />
                        <Trash3 />
                </button>
            }

            <h2>{product.name || "Страница товара"}</h2>
            
            <div className="product-card">

                <div className="product__info-pic">

                    <div className="product-card__sticky card__sticky_top-left">
                        {product.discount > 0 && <span className="product-card__discount">{product.discount} %</span>}
                    </div>

                    <div className="info-pic">
                        <img src={product.pictures} alt="Здесь будет фотография товара" />
                    </div>

                    <div className="product__info-price">
                        <div className="product__price-and-price-discount">
                            {product.discount > 0 && <span className="product__old-price">{product.price} руб</span>}            
                            <span 
                                className={product.discount > 0 
                                    ? 
                                    "product__price product__price_type_discount" 
                                    : 
                                    "product__price"}>{productDiscountPrice} руб</span>
                        </div>


                        <div className="product__cart">
                            <div className="product__number"></div>
                            <button className="product__btn-card">В корзину</button>

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
            
                    <span>Отзывы</span>
                    <button className="btn-review">Написать отзыв</button>
                    <div className="reviews">
                        {product.reviews && product.reviews.length > 0 &&
                        product.reviews.map((el, i) =>
                            <Review {...el} key={i} />
                        )}
                    </div>
                </div>
            </div>




            {/* <h1>{product.name || "Страница товара"}</h1> */}
            {/* <p>{id}</p> */}

            {/* <p>Отзывы</p>
            <div className="reviews">
                {product.reviews && product.reviews.length > 0 &&
                product.reviews.map((el, i) =>
                    <Review {...el} key={i} />
                )}
            </div> */}
        </>


    )
}