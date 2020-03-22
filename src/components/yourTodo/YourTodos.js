import React from "react";
import { Link } from "react-router-dom";
import TodoSummary from "./TodoSummary";

function YourTodos(props) {
    const tabs = [
        { id: "created", name: "Todos you created" },
        { id: "chosen", name: "Your list of Chosen todos" }
    ];
    const todos = [
        {
            id: 1,
            name: "Create a React app",
            type: "Crafting",
            content: "Lorem ipsum"
        },
        {
            id: 2,
            name: "Create a React app",
            type: "Crafting",
            content: "Lorem ipsum"
        },
        {
            id: 3,
            name: "Create a React app",
            type: "Crafting",
            content: "Lorem ipsum"
        }
    ];
    return (
        <div className="your-todos row">
            <div className="tabs col l8 offset-l3 row">
                <div className="offset-l1"></div>
                {tabs.map(item => {
                    const isActive =
                        props.match.params.tabId === item.id ? "active" : "";
                    return (
                        <Link to={`/yourtodos/${item.id}/1`} key={item.id}>
                            <div
                                className={`tab-item col l4 offset-l1 pink-text text-darken-1 ${isActive}`}
                            >
                                {item.name}
                            </div>
                        </Link>
                    );
                })}
            </div>
            {tabs.map(item => {
                return props.match.params.tabId === item.id ? (
                    <div
                        className="col l10 offset-l1 section"
                        id={item.id}
                        key={item.id}
                    >
                        {todos.map(todo => {
                            return (
                                <div
                                    key={todo.id}
                                    className="your-todo-container section"
                                >
                                    <TodoSummary todo={todo} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    false
                );
            })}
            <div className="button-container col l12 center">
                <button className="btn btn-floating pink">
                    <i className="material-icons"> navigate_before </i>
                </button>
                <span className="page-num-container">1/2</span>
                <button className="btn btn-floating pink">
                    <i className="material-icons"> navigate_next </i>
                </button>
            </div>
        </div>
    );
}

export default YourTodos;
