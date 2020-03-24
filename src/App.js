import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidenav from "./components/layout/Sidenav";
import WhatTodo from "./components/whatTodo/WhatTodo";
import CreateTodo from "./components/createTodo/CreateTodo";
import YourTodos from "./components/yourTodo/YourTodos";
import TodoDetails from "./components/yourTodo/TodoDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { AuthContext } from "./contexts/AuthContext";
import Loader from "./components/layout/Loader";

function App() {
    const { auth, isAuthReady } = useContext(AuthContext);
    return isAuthReady ? (
        <div className="App bg-darken-3">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/whattodo/:pageNum" component={WhatTodo} />
                    <Route
                        path="/tododetail/guest/:todoId"
                        component={TodoDetails}
                    />
                    <Route>
                        {auth ? (
                            <div className="main-wrapper">
                                <Sidenav />
                                <main className="row main">
                                    <Route
                                        path="/tododetail/guest/:todoId"
                                        component={TodoDetails}
                                    />
                                    <Route
                                        path="/whattodo/:pageNum"
                                        component={WhatTodo}
                                    />
                                    <Route exact path="/">
                                        <Redirect to="/yourtodos/1" />
                                    </Route>
                                    <Route
                                        exact
                                        path="/createtodo"
                                        component={CreateTodo}
                                    />
                                    <Route
                                        exact
                                        path="/yourtodos/:pageNum"
                                        component={YourTodos}
                                    />
                                    <Route
                                        exact
                                        path="/tododetail/created/:todoId"
                                        component={CreateTodo}
                                    />
                                </main>
                            </div>
                        ) : (
                            <Redirect to="/signin" />
                        )}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    ) : (
        <Loader />
    );
}

export default App;
