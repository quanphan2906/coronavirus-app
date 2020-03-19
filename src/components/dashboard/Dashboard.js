import React from 'react'
import TodoList from "./TodoList"

function Dashboard() {
    return (
        <div className="col s10 m8 l8 offset-s1">
            <TodoList title="Your Todo List"/>
            <div className="divider"></div>
            <TodoList title="Todos you created"/>
        </div>
    )
}

export default Dashboard
