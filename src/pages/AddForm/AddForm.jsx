import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";

import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";

import './addForm.css';

export default () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState("");
    const [stock, setStock] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [pictures, setPictures] = useState("");

    const {api, setGoods} = useContext(Ctx);
    const navigate = useNavigate();
    const {id} = useParams();

    
    const modifyData = (data) => {
        if(!data.error) {
            setGoods(prev => [...prev, data]);
            clear();
            navigate(`${PATH}catalog/${data._id}`);
        }
    }

    const handler = (e) => {
        e.preventDefault();
        let body = {
            name: name || "Название отсутствует",
            price: price || 0,
            wight: weight || "unknown",
            stock: stock || 0,
            description: description || "Тут скоро появится описание товара",
            discount: discount,
            pictures: pictures,
        }

        if(id) {
            api.modifyProduct(id, body)
            .then(data => modifyData(data))
        } else {
            api.addProduct(body)
            .then(data => modifyData(data))
        }
        
    }

    useEffect(() => {
        if(id) {
            api.getProductById(id)
            .then(data => {
                setName(data.name)
                setPrice(data.price)
                setWeight(data.wight)
                setStock(data.stock)
                setDiscount(data.discount)
                setDescription(data.description)
                setPictures(data.pictures)
            })
        }
    }, [])

    const clear = () => {
        setName("");
        setPrice(0);
        setWeight("");
        setStock(0);
        setDiscount(0);
        setDescription("");
        setPictures("");
    }

    return (
        <div className="addForm">
            <Link className="product-card__link" to={id ? `${PATH}catalog/${id}` : `${PATH}catalog`}>
                <i className="fa-solid fa-angle-left" />  Назад
            </Link>
            <p className="form-header">
                {id ? "Изменить товар" : "Добавить товар"}
            </p>

            <Form onSubmit={handler}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Название товара</Form.Label>
                            <Form.Control
                                type="text"
                                value={name} 
                                onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number" 
                                value={price} 
                                onChange={e => setPrice(e.target.value)}
                                step="10" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Вес</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={weight} 
                                onChange={e => setWeight(e.target.value)} 
                                placeholder="100 г" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Скидка</Form.Label>
                            <Form.Select value={discount}  onChange={e => setDiscount(e.target.value)}>
                                <option value={0}>Без скидки</option>
                                <option value={5}>5%</option>
                                <option value={10}>10%</option>
                                <option value={15}>15%</option>
                                <option value={20}>20%</option>
                                <option value={25}>25%</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="number" 
                                value={stock} 
                                onChange={e => setStock(e.target.value)} 
                                min={0} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <div 
                            className="form-preview mb-2" 
                            style={{backgroundImage: pictures 
                                ? `url(${pictures})`
                                : "url(https://www.chanchao.com.tw/images/default.jpg)"}}
                        />

                        <Form.Group className="mb-3">
                            <Form.Label>Изображение</Form.Label>
                            <Form.Control
                                type="url"
                                value={pictures}
                                onChange={e => setPictures(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </Form.Group>

                        <button className="product__btn-card" type="submit">
                            {id ? "Изменить" : "Добавить"}
                        </button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}