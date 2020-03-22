import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

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
import { AuthContext } from "./contexts/AuthContext";

function App() {
    const { auth, isAuthReady } = useContext(AuthContext);
    return isAuthReady ? (
        <SidenavContextProvider>
            <div className="App bg-darken-3">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        {}
                        <Route>
                            {auth ? (
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
                            ) : (
                                <Redirect to="/signin" />
                            )}
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </SidenavContextProvider>
    ) : (
        <div className="loading-container">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default App;
