import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

function TodoList({ title, tabId, auth }) {
    return (
        <div className="todo-list">
            <div className="section-title pink-text text-darken-1">{title}</div>
            <div className="more-info text-darken-1">
                <Link to={`/yourtodos/${tabId}/1`}>
                    <span className="pink-text"> See all </span>
                </Link>
            </div>
            <div className="divider"></div>
            <div className="row section">
                {/* {auth.todos[tabId].map(todoId => (
                    <div
                        className="col s12 m3 l3 offset-l1 offset-m1"
                        key={todoId}
                    >
                        <Card todoId={todoId} />
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default TodoList;
