import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import services from "../../services";

const SignIn = () => {
    const { auth } = useContext(AuthContext);
    const [state, setState] = useState({
        email: "",
        password: "",
        error: ""
    });
    const handleChange = e => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
            error: ""
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();

        const res = await services.login(state.email, state.password);
        if (!res.isSuccess) {
            setState({
                ...state,
                error: res.error
            });
        }
    };

    if (auth) return <Redirect to="/yourtodos/1" />;
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                        Login
                    </button>
                </div>
                <div className="red-text center"> {state.error} </div>
            </form>
        </div>
    );
};

export default SignIn;
