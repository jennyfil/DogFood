import React, {useContext} from "react";
import {Link} from "react-router-dom";
import { Badge } from "react-bootstrap";
import { HeartFill, PlusCircle, Basket3 } from "react-bootstrap-icons";

import "./header.css";

import Ctx from "../../Ctx";
import Search from "../Search/search";
import logo from "../img/logo.svg";

export default () => {
    const {user, setUser, setModalActive, favorites, PATH, basket} = useContext(Ctx);
    
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
                <nav className="menu">
                    {user && <Link to={PATH + "add"}><PlusCircle style={{fontSize: "20px"}}/></Link>}
                    
                    {user && <Link to={PATH + "favorites"} className="badge-link">
                        <HeartFill style={{fontSize: "20px"}}/>
                        <Badge bg="light" text="dark">{favorites.length}</Badge>
                    </Link>}

                    {user && <Link to={PATH + "basket"} className="badge-link">
                        <Basket3 style={{fontSize: "20px"}}/>
                        <Badge bg="light" text="dark">
                            {basket.reduce((acc, el) => acc + el.cnt, 0)}
                        </Badge>
                    </Link>}

                    {user && user.name && <Link to={PATH + "profile"}>{user.name}</Link>}
                    {!user && <a href="" onClick={logIn}>Войти</a>}
                    {/* {user && <a href="" onClick={logOut}>Выйти</a>} */}
                </nav>
            </div>

            <Search />

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