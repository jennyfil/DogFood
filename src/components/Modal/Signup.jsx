import React, {useState} from "react";

export default ({change, api, close, setToken}) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [testPwd, setTestPwd] = useState(true);

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
            // group: "group-8",
            password: pwd
        }
        api.signUp(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(!data.err) {
                    api.signIn(body)
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem("user", data.data.name);
                            localStorage.setItem("token", data.token);
                            setToken(data.token);
                        })
                    setEmail("");
                    setPwd("");
                    setConfirmPwd("");
                    close(false);
                } else {
                    alert(data.message); //в идеале сделать popup!
                }
            })
    }

    return (
        <form onSubmit={sendForm}>
            <input 
                type="email"
                placeholder="Введите вашу почту"
                value={email}
                required
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={pwd}
                onChange={(e) => {checkPwd(e.target.value)}}
            />
            <input
                type="password"
                placeholder="Повторить пароль"
                value={confirmPwd}
                onChange={(e) => {checkPwd(e.target.value, "secondary")}}
            />

            <button className="btn" type="submit" disabled={testPwd}>Зарегистрироваться</button>
            <button className="btn link" type="button" onClick={() => {change(prev => !prev)}}>Войти</button>
        </form>
    )
}