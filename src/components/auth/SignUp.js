import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import services from "../../services";
import { AuthContext } from "../../contexts/AuthContext";

const SignUp = props => {
    const { auth } = useContext(AuthContext);
    const [state, setState] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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

        const res = await services.signup(state);
        if (!res.isSuccess) {
            setState({
                ...state,
                error: res.error
            });
        } else {
            props.history.push("/yourtodos/1");
        }
    };
    if (auth) return <Redirect to="/yourtodos/1" />;
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
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
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={handleChange} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                        Signup
                    </button>
                </div>
                <div className="red-text center"> {state.error} </div>
            </form>
        </div>
    );
};

export default SignUp;
