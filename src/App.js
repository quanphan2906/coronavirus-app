import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import SidenavContextProvider from "./contexts/SidenavContext";
import Dashboard from "./components/dashboard/Dashboard";
import WhatTodo from "./components/whatTodo/WhatTodo";
import CreateTodo from "./components/createTodo/CreateTodo";
import YourTodos from "./components/yourTodo/YourTodos";
import TodoDetails from "./components/yourTodo/TodoDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
    return (
        <SidenavContextProvider>
            <div className="App bg-darken-3">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route>
                            <div className="main-wrapper">
                                <Sidenav />
                                <main className="row main">
                                    <Route
                                        exact
                                        path={["/", "/dashboard"]}
                                        component={Dashboard}
                                    />
                                    <Route
                                        path="/whattodo"
                                        component={WhatTodo}
                                    />
                                    <Route
                                        path={[
                                            "/createtodo",
                                            "/tododetail/created/:todoId"
                                        ]}
                                        component={CreateTodo}
                                    />
                                    <Route
                                        path="/yourtodos/:tabId/:pageNum"
                                        component={YourTodos}
                                    />
                                    <Route
                                        path="/tododetail/chosen/:todoId"
                                        component={TodoDetails}
                                    />
                                </main>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </SidenavContextProvider>
    );
}

export default App;
