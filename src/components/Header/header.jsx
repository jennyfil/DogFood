import React, {useState} from "react";
import Search from "../Search/search";
import {Link} from "react-router-dom";
import "./header.css";

import logo from "../img/logo.svg";

export default ({user, setUser, products, setModalActive}) => {
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
            <Link className="logo" to="/">
                <img src={logo} />
            </Link>
            <Search data={products} />
            <nav className="menu">
                {user && <Link to="/profile">{user}</Link>}
                {!user && <a href="" onClick={logIn}>Войти</a>}
                {user && <a href="" onClick={logOut}>Выйти</a>}
            </nav>

        </header>
    )
}