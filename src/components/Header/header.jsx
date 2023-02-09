import React, {useContext} from "react";
import {Link} from "react-router-dom";
import { Badge } from "react-bootstrap";
import { HeartFill, PlusCircle, Basket3, BoxArrowRight } from "react-bootstrap-icons";

import Search from "../Search/Search";
import logo from "../../assets/img/logo.svg";
import { PATH } from"../../utils/constants";
import Ctx from "../../context/Ctx";

import "./header.css";


export default () => {
    const {user, setUser, setModalActive, favorites, basket} = useContext(Ctx);
    
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
                    {user && <Link to={PATH + "add"}>
                        <PlusCircle style={{fontSize: "20px"}}/>
                    </Link>}
                    
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
                    {!user && <Link onClick={logIn}>Войти</Link>}
                    {user && <Link onClick={logOut}>
                        <BoxArrowRight style={{fontSize: "20px"}} />
                    </Link>}
                </nav>
            </div>

            <Search />
        </header>
    )
}