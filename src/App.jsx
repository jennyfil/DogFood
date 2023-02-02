import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product.jsx";
import AddForm from "./pages/AddForm";
import ModifyForm from "./pages/ModifyForm";
import Favorites from "./pages/Favorites";
import Basket from "./pages/Basket";

import {Api} from "./Api.js";
import dataLocal from "./assets/data.json";
import Ctx from "./Ctx";

// const PATH = "/";
const PATH = "/godfood/";

const dataHome = [];
for(let i=0; i < 6;) {
    let j = Math.floor(Math.random() * 16);
    if(!dataHome.includes(dataLocal[j])) {
        dataHome.push(dataLocal[j]);
        i++;
    }
}

const App = () => {
    let usr = localStorage.getItem("user");
    if(usr) {
        usr = JSON.parse(usr);
    }
    
    const [user, setUser] = useState(usr);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);
    const [visibleGoods, setVisibleGoods] = useState(goods);
    const [favorites, setFavorites] = useState([]);
    const [basket, setBasket] = useState(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []);

    useEffect(() => {
        if(token) {
            api.getProducts()
            .then(res => res.json())
            .then(data => {
                setGoods(data.products);
            })
        }
    }, [])

    useEffect(() => {
        let usr = localStorage.getItem("user");
        setApi(new Api(token));
        if(usr) {
            usr = JSON.parse(usr);
        }
        setUser(usr);
    }, [token])

    useEffect(() => {
        if(!user) {
            localStorage.removeItem("token");
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        if(token) {
            api.getProducts()
            .then(res => res.json())
            .then(data => {
                setVisibleGoods(data.products);
                setGoods(data.products);
            })
        }
    }, [api])

    useEffect(() => {
        setFavorites(goods.filter(el => {
            return el.likes && el.likes.includes(user._id)
        }))
    }, [goods])

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    return (
        <Ctx.Provider value={{
            user,
            token,
            api,
            modalActive,
            goods,
            visibleGoods,
            favorites,
            setUser,
            setToken,
            setApi,
            setModalActive,
            setGoods,
            setVisibleGoods,
            setFavorites,
            PATH,
            basket,
            setBasket
        }}>
            <div className="wrapper">
                <Header />
                <main>
                    <Routes>
                        <Route path={PATH} element={<Home data = {dataHome} />} />
                        <Route path={PATH + "catalog"} element={<Catalog />} />
                        <Route path={PATH + "profile"} element={<Profile />} />
                        <Route path={PATH + "catalog/:id"} element={<Product />} />
                        <Route path={PATH + "add"} element={<AddForm />} />
                        <Route path={PATH + "modify/:id"} element={<ModifyForm />} />
                        <Route path={PATH + "favorites"} element={<Favorites />} />
                        <Route path={PATH + "basket"} element={<Basket />} />
                    </Routes>
                </main>
                <Footer />
            </div>
            <Modal />
        </Ctx.Provider>
    )
}

export default App;