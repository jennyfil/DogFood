import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg";
import { PATH } from"../../utils/constants";

import "./footer.css";

export default () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="footer__logo">
                <Link to={PATH}>
                    <img src={logo} alt="Логотип сайта"/>
                </Link>
                <div className="footer__copy">
                    ©️ {year} "Интернет-магазин DogFood.ru"
                </div>
            </div>
            <div className="footer__contacts">
                <div className="contacts">
                    <p>Мы на связи</p>
                    <a className="phone" href="tel:+79450000000">8 (945) 000-00-00</a>
                    <a href="mailto:dogfood.ru@mail.ru">dogfood.ru@mail.ru</a>
                </div>
                <div className="social-media">
                    <Link><i className="fa-brands fa-telegram" /></Link>
                    <Link><i className="fa-brands fa-vk" /></Link>
                    <Link><i className="fa-brands fa-skype" /></Link>
                </div>
            </div>
        </footer>
    )
}