import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import EmptyBlock from "../../components/EmptyBlock/EmptyBlock";
import Sort from "../../components/Sort/Sort";
import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";

import "./catalog.css";


export default () => {
    const {visibleGoods, user} = useContext(Ctx);
    const [sortGoods, setSortGoods] = useState(visibleGoods);
    const paginate = usePagination(sortGoods, 12);
    const noGoods = 'noGoods';
    const noAuth = 'noAuth';

    useEffect (() => {
        if(sortGoods.length === 0) {
            setSortGoods(visibleGoods);
        }
    }, [visibleGoods]);

    return (
        <div className="catalog">
            {user && <> 
                    { visibleGoods.length > 0
                        ? <> <p className="header">Каталог товаров</p>
                            <Sort setSortGoods={setSortGoods} />
                            <Pagination paginate={paginate} />
                            <div className="cards">
                                {paginate.setPageData().map((el, i) => <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                        <Card {...el} key={"card_" + i} />
                                    </Link>
                                    )
                                }
                            </div>
                            <Pagination paginate={paginate} />
                        </>
                        : <EmptyBlock fromPage={noGoods} />
                    } 
            </>}
            
            {!user && <EmptyBlock fromPage={noAuth} />}
        </div>
    )
}