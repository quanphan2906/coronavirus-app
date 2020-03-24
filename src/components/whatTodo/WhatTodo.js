import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import TodoList from "../layout/TodoList";
import NavButton from "../layout/NavButton";
import services from "../../services";

function WhatTodo(props) {
    const filters = {
        topics: ["Learning websites", "Crafting", "Cooking"]
        // filterBy: ["Most popular", "Most recent"]
    };
    const [topic, setTopic] = useState(filters.topics[0]);
    const [todosCollection, setTodosCollection] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [isiTodoReady, setIsTodoReady] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const pageNum = props.match.params.pageNum;
            const perPage = 3;
            const queryObj = {
                type: topic
            };
            const { totalPageRes, data } = await services.paginateQuery(
                "todos",
                pageNum,
                perPage,
                queryObj
            );
            setTodosCollection(data);
            setTotalPage(totalPageRes);
            setIsTodoReady(true);
        };
        fetchData();
    }, [topic]);
    const handleTopicChange = e => {
        setTopic(e.target.value);
        setIsTodoReady(false);
    };
    return isiTodoReady ? (
        <div className="col s12 m8 l10 offset-l1 whattodo-wrapper">
            <div className="input-field filter-bar">
                {Object.entries(filters).map(([key, value]) => {
                    return (
                        <div
                            className="filter col s4 m4 l6 push-l1 push-m1 push-s1"
                            key={key}
                        >
                            <FilterBar
                                value={topic}
                                title={key}
                                options={value}
                                onChange={handleTopicChange}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="s10 offset-m1 offset-l1">
                {filters.topics.map(item =>
                    item.toLowerCase() == topic.toLowerCase() ? (
                        <TodoList
                            title={item}
                            key={item}
                            todosCollection={todosCollection}
                        />
                    ) : (
                        false
                    )
                )}
            </div>
            {todosCollection.length != 0 ? (
                <NavButton
                    totalPage={totalPage}
                    currentPage={props.match.params.pageNum}
                />
            ) : (
                false
            )}
        </div>
    ) : (
        <div className="loading-container">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default WhatTodo;
