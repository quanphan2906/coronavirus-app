import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";

function NavItem(props) {
    return (
        <div className="container">
            <b> {props.screenName} </b>
        </div>
    );
}

function Sidenav(props) {
    const screens = [
        { name: "Your Todos", url: "/yourtodos/1", id: "yourtodos" },
        { name: "Create New Todo", url: "/createtodo", id: "createtodo" },
        { name: "What Todo?", url: "/whattodo/1", id: "whattodo" }
    ];

    const [activeScreen, setActiveScreen] = useState(screens[0].name);

    useEffect(() => {
        const activeScreenId = props.location.pathname.split("/")[1];
        if (activeScreenId !== "tododetail") {
            const currentActiveScreen = screens.filter(screen => {
                return screen.id === activeScreenId;
            });
            setActiveScreen(currentActiveScreen[0].name);
        }
    }, [props.location.pathname, screens]);

    const changeActiveScreen = screenName => {
        props.history.push(screenName.url);
    };

    const { auth } = useContext(AuthContext);

    const logout = () => {
        services.logout();
    };

    if (!auth) return <div></div>;
    return (
        <div className="white lighten-4 side-nav">
            <div className="right close-icon">
                <i className="material-icons"> close </i>
            </div>

            <div className="container">
                <div className="initials-container">
                    <NavLink
                        to="/yourtodos/1"
                        className="btn btn-floating pink lighten-2 initials"
                    >
                        {auth.initials}
                    </NavLink>
                </div>
                <section className="section">
                    <div className="section">
                        <div>
                            <b> Username: </b>
                        </div>
                        <div> {auth.firstName + auth.lastName} </div>
                    </div>
                    <div className="section">
                        <div>
                            <b> Email </b>
                        </div>
                        <div> {auth.email} </div>
                    </div>
                </section>
            </div>

            <div className="divider" />

            <section className="section">
                {screens.map(screen => {
                    const activeClass =
                        activeScreen === screen.name
                            ? "current-screen-name"
                            : "";
                    return (
                        <div
                            className={`screen-name ${activeClass}`}
                            key={screen.name}
                            onClick={() => {
                                changeActiveScreen(screen);
                            }}
                        >
                            <NavItem screenName={screen.name} />
                        </div>
                    );
                })}
            </section>

            <div className="divider" />

            <section className="section" onClick={logout}>
                <div className="container logout">
                    <div className="red-text text-darken-2"> Log out </div>
                </div>
            </section>
        </div>
    );
}

export default withRouter(Sidenav);
