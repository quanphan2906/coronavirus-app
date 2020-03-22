import React from 'react'
import TodoList from "../layout/TodoList"

function Dashboard() {
    const tabs = [
        {id: "created", name: "Todos you created"}, 
        {id: "chosen", name: "Your list of Chosen todos"}
    ]
    return (
        <div className="col s10 offset-m1 offset-l1">
            {
                tabs.map( item => <TodoList title={item.name} key={item.id} tabId={item.id} />)
            }
        </div>
    )
}

export default Dashboard
