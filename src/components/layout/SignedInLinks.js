import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";

function SignedInLinks() {
    const { auth } = useContext(AuthContext);
    const logout = async () => {
        await services.logout();
    };
    return (
        <ul className="right">
            <li className="hide-on-med-and-down">
                <NavLink to="/whattodo/1"> What Todo? </NavLink>
            </li>
            <li className="hide-on-med-and-down">
                <a onClick={logout}>Log Out</a>
            </li>
            <li>
                <NavLink to="/" className="btn btn-floating pink lighten-2">
                    {auth.initials}
                </NavLink>
            </li>
        </ul>
    );
}

export default SignedInLinks;
