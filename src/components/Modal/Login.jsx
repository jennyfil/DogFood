import React, {useState, useContext} from "react";

import Ctx from "../../Ctx";

export default ({change, close}) => {
    const {api, setToken} = useContext(Ctx);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: pwd
        }
        api.signIn(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.data));
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setEmail("");
                setPwd("");
                close(false);
            })
    }

    return (
        <form onSubmit={sendForm}>
            <input 
                type="email"
                placeholder="Введите вашу почту"
                value={email}
                required
                onChange={(e) => {setEmail(e.target.value)}} />
            <input
                type="password"
                placeholder="Пароль"
                value={pwd}
                onChange={(e) => {setPwd(e.target.value)}} />


            <button className="btn" type="submit">Войти</button>
            <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>Зарегистрироваться</button>
        </form>
    )
}