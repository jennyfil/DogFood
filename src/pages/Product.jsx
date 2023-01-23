import React, {useState, useEffect, useContext} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Review from "../components/Review/Review";
import Ctx from "../Ctx";
import { Row, Col, Form } from "react-bootstrap";
import { Trash3, Truck, Check2Circle, PencilSquare } from "react-bootstrap-icons";

export default () => {
    const {api, PATH, user, setGoods} = useContext(Ctx);
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const productDiscountPrice = Math.round(product.price - (product.price * product.discount) / 100);

    useEffect(() => {
        api.getProductById(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

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


    const handlerSubmit = (e) => {
        e.preventDefault();
        let body = {
            rating: rating,
            text: text || " ",
        };

        api.addReview(id, body)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(!data.error) {
                setGoods(prev => [...prev, data]);
                clear();
                navigate(`${PATH}catalog/${data._id}`);
            }
        })
    };

    const clear = (e) => {
        setRating(0);
        setText("");
    };

    return (
        <div className="product-container">
            <Link className="product-card__link" to={PATH + "catalog"}>
                <i className="fa-solid fa-angle-left"></i>  Назад
            </Link>

            {product && product.author && product.author._id === user._id && 
                <div className="btn-block">
                    <Link className="btn-change" to={`${PATH}modify/${id}`}>
                        <PencilSquare />
                    </Link>

                    <button 
                    onClick={remove} 
                    className="btn-change">
                        <Trash3 />
                    </button>
                </div>}

            <h2>{product.name || "Страница товара"}</h2>

            <div className="product-card">
                <div className="product__info-pic">
                    <div className="product-card__sticky card__sticky_top-left">
                        {product.discount > 0 && <span className="product-card__discount">{product.discount} %</span>}
                    </div>

                    <img src={product.pictures} alt="Здесь будет фотография товара" />

                    <div className="product__info-price">
                        <div className="product__price-and-price-discount">
                            {product.discount > 0 && <span className="product__old-price">{product.price} руб</span>}            
                            <span 
                                className={product.discount > 0 
                                    ? 
                                    "product__price product__price_type_discount" 
                                    : 
                                    "product__price"}>{productDiscountPrice} руб
                            </span>
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
                    <div className="reviews">
                        <button className="btn-review" 
                        onClick={() => setActive(!active)}
                        >Оставить отзыв</button>

                        <Form 
                        className={active ? "active" : "add-review"}
                        onSubmit={handlerSubmit}
                        >
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Оценка</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            value={rating} 
                                            required
                                            onChange={e => setRating(e.target.value)}
                                            min="1"
                                            max="5" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Отзыв</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={4}
                                            value={text}
                                            onChange={e => setText(e.target.value)} />
                                    </Form.Group>
                                    <button className="product__btn-card" type="submit">
                                        Отправить
                                    </button>
                                </Col>
                            </Row>
                        </Form>

                        {product.reviews && 
                            product.reviews.length > 0 &&
                            product.reviews.map((el, i) =>
                                <Review {...el} key={i} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}