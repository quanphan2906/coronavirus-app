import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

function TodoList(props) {
    return (
        <div className="todo-list">
            <div className="section-title pink-text text-darken-1">
                {props.title}
            </div>
            <div className="more-info text-darken-1">
                <Link to={`/yourtodos/${props.tabId}/1`}>
                    <span className="pink-text"> See all </span>
                </Link>
            </div>
            <div className="divider"></div>
            <div className="row section">
                <div className="col s12 m3 l3 offset-l1 offset-m1">
                    <Card />
                </div>
                <div className="col s12 m3 l3 offset-l1 offset-m1">
                    <Card />
                </div>
                <div className="col s12 m3 l3 offset-l1 offset-m1">
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default TodoList;
