import React, {useState, useContext} from "react";
import { useForm } from "react-hook-form";

import Ctx from "../../context/Ctx";
import { Email_RegExp, PWD_RegExp, Message } from "../../utils/constants";

import "./style.css";

export default ({ change, close }) => {
    const {api, setToken} = useContext(Ctx);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [testPwd, setTestPwd] = useState(true);

    const {register, handleSubmit, formState: { errors }} = useForm({ mode: 'onBlur' });


    const checkPwd = (val, type="main") => {
        type === "main" ? setPwd(val) : setConfirmPwd(val);
        if(val) {
            if(type === "main") {
                setTestPwd(val !== confirmPwd);
            } else {
                setTestPwd(val !== pwd);
            }
        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: email,
            password: pwd
        }
        api.signUp(body)
        .then(data => {
            if(!data.err) {
                api.signIn(body)
                .then(data => {
                    localStorage.setItem("user", JSON.stringify(data.data));
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                })
                setEmail("");
                setPwd("");
                setConfirmPwd("");
                close(false);
            } else {
                alert(data.message);
            }
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
                required
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
                onChange={(e) => {checkPwd(e.target.value)}}
            />
            { errors?.password && <div className="error">{errors.password.message || "Error!"}</div> }

            <input
                {...register('checkPassword', {
                    required: "Поле обязательно для заполнения",
                })}
                type="password"
                placeholder="Повторить пароль"
                value={confirmPwd}
                onChange={(e) => {checkPwd(e.target.value, "secondary")}}
            />
            { errors?.checkPassword && <div className="error">{errors.checkPassword.message || "Error!"}</div> }

            <button className="btn" type="submit" disabled={testPwd}>
                Зарегистрироваться
            </button>

            <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>
                Войти
            </button>
        </form>
    )
}