import React, {useState, useContext} from "react";

import Signup from "./Signup";
import Login from "./Login";
import { XLg } from "react-bootstrap-icons";
import Ctx from "../../context/Ctx";

import "./style.css";

export default () => {
    const {modalActive, setModalActive} = useContext(Ctx);
    const [auth, setAuth] = useState(true);
 
    return (
        <div className={modalActive ? "modal-container d-flex" : "modal-container"}>
            <div className="modal">
                <XLg className="modal-close" onClick={() => setModalActive(false)} />
                <h2>{auth 
                        ? "Войти"
                        : "Зарегистрироваться"
                    }
                </h2>
                {auth 
                    ? <Login change={setAuth} close={setModalActive} /> 
                    : <Signup change={setAuth} close={setModalActive} />
                }
            </div>
        </div>
    )
}