import React, { useContext, useState } from "react";
import { PencilSquare, XSquare, CheckSquare } from "react-bootstrap-icons";

import Ctx from "../../context/Ctx";
import './profile.css';

export default () => {
    const {user, setUser, api} = useContext(Ctx);
    const [nameFlag, setNameFlag] = useState(false);
    const [name, setName] = useState(user.name);
    const [textFlag, setTextFlag] = useState(false);
    const [text, setText] = useState(user.about);
    const [imgFlag, setImgFlag] = useState(false);
    const [img, setImg] = useState(user.avatar);

    const updUser = () => {
        api.updUserInfo({
            name: name,
            about: text
        })
        .then(data => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setNameFlag(false);
            setTextFlag(false);
        })
    }

    const updImg = () => {
        api.updUserInfo({avatar: img}, true)
        .then(data => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setImgFlag(false);
        })
    }

    return (
        <div className="profile">
            <h3>Личный кабинет</h3>

            <div className="profile-container">
                <div>
                    {!nameFlag 
                    ? <>
                        <p>Имя: <span>{name}</span></p>
                        <PencilSquare className="bootstrap-icons" onClick={() => setNameFlag(true)} />
                      </>
                    : <>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        <CheckSquare className="bootstrap-icons" onClick={updUser} />
                        <XSquare className="bootstrap-icons" onClick={() => {
                            setName(user.name);
                            setNameFlag(false);
                        }} />
                    </>
                    }

                    <div className="profile__info">
                        {!textFlag 
                        ? <>
                            <p>Статус: {text}</p>
                            <PencilSquare className="bootstrap-icons" onClick={() => setTextFlag(true)} />
                          </>
                        : <>
                            <input type="text" value={text} onChange={e => setText(e.target.value)} />
                            <CheckSquare className="bootstrap-icons" onClick={updUser} />
                            <XSquare className="bootstrap-icons" onClick={() => {
                                setText(user.about);
                                setTextFlag(false);
                            }} />
                        </>
                        }

                        <div>
                            Почта: <a href={`mailto:${user.email}`}>{user.email}</a>
                        </div>
                    </div>
                </div>

                <div className="profile__img">
                    <img src={user.avatar} alt="Фото пользователя" />
                    {!imgFlag 
                        ? <PencilSquare className="bootstrap-icons" onClick={() => setImgFlag(true)} />
                        : <div className="input-upd-img">
                            <input type="text" value={img} required
                                onChange={e => setImg(e.target.value)}
                            />
                            <CheckSquare className="bootstrap-icons" onClick={updImg} />
                            <XSquare className="bootstrap-icons" onClick={() => {
                                setImg(user.avatar);
                                setImgFlag(false);
                            }} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}