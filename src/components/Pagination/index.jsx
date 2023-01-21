import React, { useState } from "react";
import "./style.css";
import {CaretRightFill, CaretLeftFill} from "react-bootstrap-icons";

export default ({paginate}) => {
    const max = paginate.maxPage;
    const current = paginate.currentPage;
    const pages = [];
    for(let i=0; i<max; i++) {
        pages.push(i+1);
    }
    return (
        <div className="page-container">
            <button className="btn page" disabled={current === 1} onClick={paginate.previous}><CaretLeftFill /></button>

            {pages.map(p => <button 
                className="btn page"
                key={p}
                style={{
                    backgroundColor: p === current && "#222",
                    color: p === current && "yellow",
                }}
                onClick={e => paginate.step(p)}>{p}</button>)}

            <button className="btn page" disabled={current === max} onClick={paginate.next}><CaretRightFill /></button>

        </div>
    )
}