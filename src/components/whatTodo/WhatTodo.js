import React, { useState, useEffect } from "react";
import FilterBar from "../layout/FilterBar";
import TodoList from "../layout/TodoList";
import NavButton from "../layout/NavButton";
import services from "../../services";
import Loader from "../layout/Loader";

function WhatTodo(props) {
    const topics = ["Learning websites", "Crafting", "Cooking"];
    const [topic, setTopic] = useState(topics[0]);
    const [todosCollection, setTodosCollection] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [isTodoReady, setIsTodoReady] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const pageNum = props.match.params.pageNum;
            const perPage = 3;
            const queryObj = {
                type: topic.toLowerCase()
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
        setIsTodoReady(false);
        setTopic(e.target.value);
    };
    if (!isTodoReady) return <Loader />;
    return (
        <div className="col l12 offset-l1 whattodo-wrapper">
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
