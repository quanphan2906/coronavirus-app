import React from 'react'
import Card from './Card'

function TodoList() {
    return (
        <div className="todo-list">
            <div className="more-info pink-text text-darken-1">
                <span> See all </span>
                <span> <i className="material-icons"> navigate_next </i> </span>
            </div>
            <div className="row">
                <div className="col s12 m3 l3 offset-l1">
                    <Card />
                </div>
                <div className="col s12 m3 l3 offset-l1">
                    <Card />
                </div>
                <div className="col s12 m3 l3 offset-l1">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default TodoList
