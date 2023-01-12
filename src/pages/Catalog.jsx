import React, {useContext} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import "./pages.css";
import Ctx from "../Ctx";

export default ({data}) => {
    const {visibleGoods, user, PATH} = useContext(Ctx);
    return (
            <>
            {user &&
                <> {visibleGoods.length > 0
                        ? <>
                            <h1>Каталог товаров</h1>
                            <div className="cards">

                                {visibleGoods.map((el, i) => <Link to={`${PATH}catalog/${el._id}`} key={el._id}>
                                                        <Card 
                                                            key={"card_" + i}
                                                            text={el.name}
                                                            like={(i+1) % 2 === 0}
                                                            price={el.price}
                                                            pictures={el.pictures}
                                                            weight={el.wight}
                                                        />
                                                    </Link>)}
                            </div>
                        </>
                        : 
                        <div className="empty-block">
                            <EmojiFrown />
                            <p style={{width: 250}}>Простите, по вашему запросу товаров не найдено</p>
                            <Link to={PATH} className="btn">На главную</Link>
                        </div>
                    } 
                </>}
                {!user && <div className="empty-block">
                            <EmojiFrown />
                            <p style={{width: 250}}>Простите, у вас нет доступа к товарам без авторизации</p>
                            <Link to={PATH} className="btn">На главную</Link>
                        </div>
                }
            </>
    )
}