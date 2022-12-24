import React from "react";
import "./footer.css";

import logo from "../img/logo.svg";

export default () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="footer__logo">
                <a href="#">
                    <img src={logo} />
                </a>
                <div className="footer__copy">
                    ©️ {year} "Интернет-магазин DogFood.ru"
                </div>
            </div>
            <div className="footer__contacts">
                <div className="contacts">
                    <p>Мы на связи</p>
                    <a className="phone" href="tel: +79450000000">8 (945) 000-00-00</a>
                    <a href="mailto: dogfood.ru@mail.ru">dogfood.ru@mail.ru</a>
                </div>
                <div className="social-media">
                    <a href="#">
                        <i class="fa-brands fa-telegram"></i>
                    </a>
                    <a href="#">
                        <i class="fa-brands fa-vk"></i>
                    </a>
                    <a href="#">
                        <i class="fa-brands fa-skype"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}