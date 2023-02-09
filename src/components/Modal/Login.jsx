import React, {useState, useContext} from "react";
import { useForm } from "react-hook-form";

import Ctx from "../../context/Ctx";
import { Email_RegExp, PWD_RegExp, Message } from "../../utils/constants";

import "./style.css";

export default ({ change, close }) => {
    const {api, setToken} = useContext(Ctx);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const {register, handleSubmit, formState: { errors }} = useForm({ mode: 'onBlur' });

    const sendForm = () => {
        const body = {
            email: email,
            password: pwd
        }
        api.signIn(body)
        .then(data => {
            localStorage.setItem("user", JSON.stringify(data.data));
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setEmail("");
            setPwd("");
            close(false);
        })
    }

    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <input 
                {...register('email', {
                    required: "Поле обязательно для заполнения",
                    pattern: { 
                        value: Email_RegExp, 
                        message: Message.incorrectEmail 
                    }
                })}
                type="email"
                placeholder="Введите вашу почту"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            { errors?.email && <div className="error">{errors.email.message || "Error!"}</div> }

            <input
                {...register('password', {
                    required: "Поле обязательно для заполнения",
                    pattern: { 
                        value: PWD_RegExp, 
                        message: Message.incorrectPWD 
                    }
                })}
                type="password"
                placeholder="Пароль"
                value={pwd}
                onChange={(e) => {setPwd(e.target.value)}}
            />
            { errors?.password && <div className="error">{errors.password.message || "Error!"}</div> }

            <button className="btn" type="submit">Войти</button>
            
            <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>
                Зарегистрироваться
            </button>
        </form>
    )
}