import React, { useContext } from "react";
import TodoList from "../layout/TodoList";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";

function Dashboard() {
    const tabs = [
        { id: "created", name: "Todos you created" },
        { id: "chosen", name: "Your list of Chosen todos" }
    ];
    const { auth } = useContext(AuthContext);
    return (
        <div className="col s10 offset-m1 offset-l1">
            {tabs.map(item => (
                <TodoList
                    title={item.name}
                    key={item.id}
                    tabId={item.id}
                    auth={auth}
                />
            ))}
        </div>
    );
}

export default Dashboard;
