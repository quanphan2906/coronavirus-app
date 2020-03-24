import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import TodoSummary from "./TodoSummary";
import NavButton from "../layout/NavButton";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../layout/Loader";

function YourTodos(props) {
    const { auth } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [isTodosReady, setIsTodosReady] = useState(false);
    useEffect(() => {
        setIsTodosReady(false);
        const fetchData = async () => {
            if (auth) {
                const queryObj = {
                    author: auth.id
                };
                const pageNum = props.match.params.pageNum;
                const perPage = 6;
                const { totalPageRes, data } = await services.paginateQuery(
                    "todos",
                    pageNum,
                    perPage,
                    queryObj
                );
                setTodos(data);
                setTotalPage(totalPageRes);
                setIsTodosReady(true);
            }
        };
        fetchData();
    }, [props.match.params.pageNum]);
    if (!auth) return <Redirect to="/signin" />;
    if (isTodosReady === false) return <Loader />;
    return (
        <div className="your-todos row">
            {todos.length ? (
                <React.Fragment>
                    <div className="col l10 offset-l1 section">
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
                    <NavButton
                        totalPage={totalPage}
                        currentPage={props.match.params.pageNum}
                    />
                </React.Fragment>
            ) : (
                <div className="container">You havent had any todo</div>
            )}
        </div>
    );
}

export default YourTodos;
