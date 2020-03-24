import React, { useContext } from "react";
import { Link } from "react-router-dom";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
    const { auth } = useContext(AuthContext);
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">
                    CoronaVibes
                </Link>
                {auth !== null ? <SignedInLinks /> : <SignedOutLinks />}
            </div>
        </nav>
    );
}

export default Navbar;
