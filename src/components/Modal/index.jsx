import React, {useState, useContext} from "react";
import "./style.css";
import Ctx from "../../Ctx";

import Signup from "./Signup";
import Login from "./Login";

export default () => {
    const {modalActive, setModalActive} = useContext(Ctx);
    const [auth, setAuth] = useState(true);
    let style = {
        display: modalActive && "flex",
    }
    return (
        <div className="modal-container" style={style}>
            <div className="modal">
                <div className="modal-close" onClick={() => setModalActive(false)} />
                <h2>{auth ? "Войти": "Зарегистрироваться"}</h2>
                {auth 
                    ? 
                    <Login change={setAuth} close={setModalActive} /> 
                    : 
                    <Signup change={setAuth} close={setModalActive} />
                }
            </div>
        </div>
    )
}