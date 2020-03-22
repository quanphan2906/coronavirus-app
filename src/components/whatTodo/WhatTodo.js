import React from 'react'
import FilterBar from './FilterBar'
import TodoList from '../layout/TodoList'

function WhatTodo() {
    const filters = {
        topics: ["Learning websites", "Craft", "Cooking"],
        filterBy: ["Most popular", "Most recent"]
    }
    return (
        <div className="col s12 m8 l10 offset-l1 whattodo-wrapper">
            <div className="input-field filter-bar">
                { Object.entries(filters).map(([key, value]) => {
                    let multiple = key === "topics" ? true : false;
                    return (
                        <div className="filter col s4 m4 l6 push-l1 push-m1 push-s1">
                            <FilterBar key={key} title={key} options={value} multiple={multiple}/>
                        </div>
                    )
                })}
            </div>
            <div className="s10 offset-m1 offset-l1">
                {
                    filters.topics.map( topic => <TodoList title={topic} key={topic} /> )
                }
            </div>
        </div>
    )
}

export default WhatTodo
