import React, { useContext, useCallback } from "react";
import { Redirect } from "react-router-dom";
import TodoSummary from "./TodoSummary";
import NavButton from "../layout/NavButton";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../layout/Loader";
import useFetchData from "../hooks/useFetchData";
import ErrorNotif from "../layout/ErrorNotif";
import NoTodoNotif from "./NoTodoNotif";

function YourTodos(props) {
    const { auth, isAuthReady } = useContext(AuthContext);

    const fetchFunc = useCallback(async () => {
        if (auth) {
            const pageNum = props.match.params.pageNum;
            const perPage = 6;
            const queryObj = {
                author: auth.id
            };
            const res = await services.paginateQuery(
                "todos",
                pageNum,
                perPage,
                queryObj
            );
            return res;
        } else {
            return null;
        }
    }, [props.match.params.pageNum, auth.id]);

    const [{ data, isLoading, error }] = useFetchData(
        {
            data: [],
            totalPageRes: null
        },
        fetchFunc
    );
    const todos = data.data;
    const totalPage = data.totalPageRes;

    if (isLoading || !isAuthReady) return <Loader />;
    if (!auth) return <Redirect to="/signin" />;
    if (error) return <ErrorNotif />;
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
                <NoTodoNotif />
            )}
        </div>
    );
}

export default YourTodos;
