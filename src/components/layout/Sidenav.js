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

const NavList = ({ screens, activeScreen, changeActiveScreen }) => {
    return (
        <section className="section">
            {screens.map(screen => {
                const activeClass =
                    activeScreen === screen.name ? "current-screen-name" : "";
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
    );
};

const PersonalInfo = ({ title, value }) => {
    return (
        <div className="section">
            <div>
                <b> {title}: </b>
            </div>
            <div> {value} </div>
        </div>
    );
};

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
    const personalInfo = [
        { title: "Username", value: auth.firstName + auth.lastName },
        { title: "Email", value: auth.email }
    ];

    const logout = () => {
        services.logout();
    };

    if (!auth) return <div></div>;
    return (
        <div className="white lighten-4 side-nav">
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
                    {personalInfo.map(({ title, value }) => {
                        return (
                            <PersonalInfo
                                key={title}
                                title={title}
                                value={value}
                            />
                        );
                    })}
                </section>
            </div>

            <div className="divider" />

            <NavList
                screens={screens}
                activeScreen={activeScreen}
                changeActiveScreen={changeActiveScreen}
            />

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
