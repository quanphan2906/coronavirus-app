import React from "react";
import { Link } from "react-router-dom";

export default function Card({ todo }) {
    return (
        <div className="card">
            <div className="card-img">
                <img src={todo.imgUrl} width="100%" height="auto" />
            </div>
            <div className="card-title"> {todo.title} </div>
            <div className="card-content">
                <p>{todo.description}</p>
                <Link to={`/tododetail/guest/${todo.id}`} className="right">
                    <i className="material-icons pink-text text-lighten-2">
                        more_horiz
                    </i>
                </Link>
            </div>
        </div>
    );
}
