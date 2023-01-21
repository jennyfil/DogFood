import React, {useContext} from "react";
import Card from "../components/Card/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import "./pages.css";
import Ctx from "../Ctx";

import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

export default () => {
    const {visibleGoods, user, PATH} = useContext(Ctx);
    const paginate = usePagination(visibleGoods, 12);

    return (
            <>
            {user && 
                <> {visibleGoods.length > 0
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
                            <p style={{width: 250}}>Простите, по вашему запросу товаров не найдено</p>
                            <Link to={PATH} className="btn">На главную</Link>
                        </div>
                    } 
                </>
            }

                {!user && <div className="empty-block">
                            <EmojiFrown />
                            <p style={{width: 250}}>Простите, у вас нет доступа к товарам без авторизации</p>
                            <Link to={PATH} className="btn">На главную</Link>
                        </div>
                }
            </>
    )
}