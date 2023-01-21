import React, {useContext} from "react";
import Card from "../components/Card/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import "./pages.css";
import Ctx from "../Ctx";

import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default () => {
    const {favorites, PATH} = useContext(Ctx);
    const paginate = usePagination(favorites, 3);
    return (
            <>
               {favorites.length > 0
                    ? <>
                        <p className="catalog-header">Каталог товаров</p>
                        <Pagination paginate={paginate} />
                        <div className="cards">

                            {paginate.setPageData().map((el, i) => <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                    <Card {...el} key={"card_" + i} />
                                </Link>
                                )
                            }
                        </div>
                    </>
                    : 
                    <div className="empty-block">
                        <EmojiFrown />
                        <p>Вы еще не добавили любимые товары</p>
                        <Link to={PATH + "catalog"} className="btn">На главную</Link>
                    </div>
                } 
            </>
    )
}