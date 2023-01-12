import React, {useContext} from "react";
import Search from "../Search/search";
import {Link} from "react-router-dom";
import "./header.css";
import Ctx from "../../Ctx";

import logo from "../img/logo.svg";

export default () => {
    const {user, setUser, setModalActive, PATH} = useContext(Ctx);
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setUser("");
    }

    return (
        <header>
            <div className="header-top">
                <Link className="logo" to={PATH}>
                    <img src={logo} />
                </Link>
                <Search />
                <nav className="menu">
                    {user && user.name && <Link to={PATH + "profile"}>{user.name}</Link>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {user && <a href="" onClick={logOut}>Выйти</a>}
                </nav>
            </div>
            <div className="header-bottom">
                <h2>Крафтовые лакомства для собак</h2>
                <p>Всегда свежие лакомства ручной работы с доставкой на дом по России и всему миру</p>
                <Link className="btn-link" to={PATH + "catalog"}>
                    Каталог
                    <i className="fa-solid fa-angle-right"></i>
                </Link>
            </div>

        </header>
    )
}