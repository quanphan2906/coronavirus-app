import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TodoSummary from "./TodoSummary";
import { TodosContext } from "../../contexts/TodosContext";

function YourTodos(props) {
    const tabs = [
        { id: "created", name: "Todos you created" },
        { id: "chosen", name: "Your list of Chosen todos" }
    ];
    const tabId = props.match.params.tabId;
    const { createdTodos, chosenTodos, isTodosReady } = useContext(
        TodosContext
    );
    const todos = tabId === "created" ? createdTodos : chosenTodos;
    if (isTodosReady === false)
        return (
            <div className="loading-container">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    const renderTodos = tabs.map(item => {
        return tabId === item.id ? (
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
    });
    return (
        <div className="your-todos row">
            <div className="tabs col l8 offset-l3 row">
                <div className="offset-l1"></div>
                {tabs.map(item => {
                    const isActive = tabId === item.id ? "active" : "";
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
            {todos.length ? (
                <React.Fragment>
                    {renderTodos}
                    <div className="button-container col l12 center">
                        <button className="btn btn-floating pink">
                            <i className="material-icons"> navigate_before </i>
                        </button>
                        <span className="page-num-container">1/2</span>
                        <button className="btn btn-floating pink">
                            <i className="material-icons"> navigate_next </i>
                        </button>
                    </div>
                </React.Fragment>
            ) : (
                <div className="container">You havent had any todo</div>
            )}
        </div>
    );
}

export default YourTodos;
