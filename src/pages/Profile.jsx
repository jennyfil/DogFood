import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";

import Ctx from "../Ctx";

import "./pages.css";

export default () => {
    const {user, setUser, PATH} = useContext(Ctx);
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("user");
        navigate(PATH);
    } 
    return (
        <>
            <h3 className="profile-header">Личный кабинет</h3>

            <div className="profile">
                <img src={user.avatar} alt="Фото пользователя" />
                <div>
                    <p>Привет, {user && user.name}!</p>
                    <div className="profile__info">
                        <p>Обо мне: {user.about}</p>
                        <p>Почта: {user.email}</p>
                    </div>
                    <a className="profile__btn" href="#" onClick={logOut} style={{color: "orange"}}>Выйти из аккаунта</a>
                </div>
            </div>
        </>
    )
}