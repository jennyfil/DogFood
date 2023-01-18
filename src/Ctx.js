import React from "react";

export default React.createContext({
    user: {},
    token: "",
    api: {},
    modalActive: false,
    goods: [],
    visibleGoods: [],
    setUser: () => {},
    setToken: () => {},
    setApi: () => {},
    setModalActive: () => {},
    setGoods: () => {},
    setVisibleGoods: () => {},
});