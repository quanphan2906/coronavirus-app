import React from "react";
import Card from "./Card";

function TodoList({ title, todosCollection }) {
    return (
        <div className="todo-list">
            <div className="section-title pink-text text-darken-1">{title}</div>
            <div className="divider"></div>
            <div className="row section">
                {todosCollection.map(todo => (
                    <div
                        className="col s12 m3 l3 offset-l1 offset-m1"
                        key={todo.id}
                    >
                        <Card todo={todo} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
