import React from 'react'
import Card from './Card'

function TodoList(props) {
    return (
        <div className="todo-list">
            <div className="container section-title pink-text text-darken-1">
                { props.title }
            </div>
            <div className="more-info pink-text text-darken-1">
                <span> See all </span>
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
