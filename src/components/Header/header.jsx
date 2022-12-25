import React, {useState} from "react";
import Search from "../Search/search";
import {Link} from "react-router-dom";
import "./header.css";

import logo from "../img/logo.svg";

export default ({user, setUser, goods, searchGoods, setModalActive}) => {
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
            <Link className="logo" to="/godfood/">
                <img src={logo} />
            </Link>
            <Search data={goods} searchGoods={searchGoods} />
            <nav className="menu">
                {user && <Link to="/profile">{user}</Link>}
                {!user && <a href="" onClick={logIn}>Войти</a>}
                {user && <a href="" onClick={logOut}>Выйти</a>}
            </nav>

        </header>
    )
}