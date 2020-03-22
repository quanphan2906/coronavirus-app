import React, { useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { SidenavContext } from "../../contexts/SidenavContext";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";

function SignedInLinks(props) {
    const { changeIsOpen } = useContext(SidenavContext);
    const { auth, setIsAuthReady } = useContext(AuthContext);
    const logout = async () => {
        await services.logout();
    };
    return (
        <ul className="right">
            <li className="hide-on-med-and-down">
                <NavLink to="/whattodo"> What todo? </NavLink>
            </li>
            <li className="hide-on-med-and-down">
                <a onClick={logout}>Log Out</a>
            </li>
            <li>
                <NavLink
                    to="/"
                    className="btn btn-floating pink lighten-2"
                    onClick={() => {
                        changeIsOpen(true);
                    }}
                >
                    {auth.initials}
                </NavLink>
            </li>
        </ul>
    );
}

export default withRouter(SignedInLinks);
