import React, { useState, useEffect, useCallback } from "react";
import FilterBar from "../layout/FilterBar";
import TodoList from "../layout/TodoList";
import NavButton from "../layout/NavButton";
import services from "../../services";
import Loader from "../layout/Loader";
import ErrorNotif from "../layout/ErrorNotif";
import useFetchData from "../hooks/useFetchData";

function WhatTodo(props) {
    const topics = ["Learning websites", "Crafting", "Cooking"];
    const [topic, setTopic] = useState(topics[0]);

    const fetchFunc = useCallback(async () => {
        const pageNum = props.match.params.pageNum;
        const perPage = 3;
        const queryObj = {
            type: topic.toLowerCase()
        };
        const res = await services.paginateQuery(
            "todos",
            pageNum,
            perPage,
            queryObj
        );
        return res;
    }, [props.match.params.pageNum, topic]);

    const [{ data, isLoading, error }] = useFetchData(
        {
            data: [],
            totalPage: null
        },
        fetchFunc
    );

    const handleTopicChange = e => {
        setTopic(e.target.value);
    };

    const totalPage = data.totalPageRes;
    const todosCollection = data.data;

    if (isLoading) return <Loader />;
    if (error) return <ErrorNotif />;
    return (
        <div className="col l10 offset-l1 whattodo-wrapper">
            <div className="input-field filter-bar">
                <div className="filter col s4 m4 l6 push-l1 push-m1 push-s1">
                    <FilterBar
                        value={topic}
                        title={"topics"}
                        options={topics}
                        onChange={handleTopicChange}
                    />
                </div>
            </div>
            <div className="offset-l1">
                {topics.map(item =>
                    item.toLowerCase() === topic.toLowerCase() ? (
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
            {todosCollection.length !== 0 ? (
                <NavButton
                    totalPage={totalPage}
                    currentPage={props.match.params.pageNum}
                />
            ) : (
                false
            )}
        </div>
    );
}

export default WhatTodo;
