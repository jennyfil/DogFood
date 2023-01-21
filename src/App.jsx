import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product.jsx";
import AddForm from "./pages/AddForm";
import ModifyForm from "./pages/ModifyForm";

import {Api} from "./Api.js";
import dataLocal from "./assets/data.json";

import Ctx from "./Ctx";
import Favorites from "./pages/Favorites";

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

// const smiles = [<span>^_^</span>, "=)", "O_o", ";(", "^_0", "@_@", "–_–"];

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
                setGoods(data.products);
            })
        }
    }, [api])

    useEffect(() => {
        setVisibleGoods(goods);
        setFavorites(goods.filter(el =>{
            return el.likes && el.likes.includes(user._id);
        }))
    }, [goods])

    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            modalActive: modalActive,
            goods: goods,
            visibleGoods: visibleGoods,
            favorites: favorites,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            setModalActive: setModalActive,
            setGoods: setGoods,
            setVisibleGoods: setVisibleGoods,
            setFavorites: setFavorites,
            PATH: PATH
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
                        {/* <Route path={PATH + "fake/:n/:title"} element={<Fake />} />*/}

                    </Routes>
                    {/* <ul>
                        {smiles.map((el, i) => <li key={el}>
                                <Link to={`${PATH}fake/${i+1}/${el}`}>{el}</Link>
                            </li>
                        )}
                    </ul> */}
                </main>
                <Footer />
            </div>
            <Modal />
        </Ctx.Provider>
    )
}

export default App;