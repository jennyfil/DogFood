import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import EmptyBlock from "../../components/EmptyBlock/EmptyBlock";
import Ctx from "../../context/Ctx";
import { PATH } from"../../utils/constants";

import "./favorites.css";


export default () => {
    const {favorites} = useContext(Ctx);
    const paginate = usePagination(favorites, 3);
    const fromPage = 'fav';

    return (
        <div className="favorites-content">
            {favorites.length > 0
                ? <>
                    <p className="header">Избранные товары</p>
                    <Pagination paginate={paginate} />
                    <div className="cards">
                        {paginate.setPageData().map((el, i) => <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                <Card {...el} key={"card_" + i} />
                            </Link>
                            )
                        }
                    </div>
                </>
                : <EmptyBlock fromPage={fromPage} />
            } 
        </div>
    )
}