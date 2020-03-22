import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { SidenavContext } from "../../contexts/SidenavContext";
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
    const {
        isOpen,
        windowDimensions,
        updateWindowDimensions,
        changeIsOpen
    } = useContext(SidenavContext);

    useEffect(() => {
        window.addEventListener("resize", updateWindowDimensions);
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    useEffect(() => {
        if (windowDimensions.width <= 768) {
            changeIsOpen(false);
        } else {
            changeIsOpen(true);
        }
    }, [windowDimensions]);

    const screenNames = [
        { name: "Dashboard", url: "/dashboard" },
        { name: "Your Todos", url: "/yourtodos/created/1" },
        { name: "Create New Todo", url: "/createtodo" },
        { name: "What Todo?", url: "/whattodo" }
    ];

    const [activeScreen, setActiveScreen] = useState(screenNames[0].name);
    // TODO: setActiveScreen by url, do not

    const changeActiveScreen = screenName => {
        setActiveScreen(screenName.name);
        props.history.push(screenName.url);
    };

    const { auth } = useContext(AuthContext);

    const logout = () => {
        services.logout();
    };

    return isOpen ? (
        <div className="white lighten-4 side-nav">
            <div className="hide-on-med-and-up right close-icon">
                <i
                    className="material-icons"
                    onClick={() => {
                        changeIsOpen(false);
                    }}
                >
                    close
                </i>
            </div>

            <div className="container">
                <div className="initials-container">
                    <NavLink
                        to="/"
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
                {screenNames.map(screenName => {
                    const activeClass =
                        activeScreen === screenName.name
                            ? "current-screen-name"
                            : "";
                    return (
                        <div
                            className={`screen-name ${activeClass}`}
                            key={screenName.name}
                            onClick={() => {
                                changeActiveScreen(screenName);
                            }}
                        >
                            <NavItem screenName={screenName.name} />
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
    ) : (
        <div />
    );
}

export default withRouter(Sidenav);
