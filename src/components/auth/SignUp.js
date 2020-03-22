import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import services from "../../services";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            error: ""
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
            error: ""
        });
    };
    handleSubmit = async e => {
        e.preventDefault();

        const res = await services.signup(this.state);
        if (!res.isSuccess)
            this.setState({
                error: res.error
            });
    };
    render() {
        if (this.props.user) return <Redirect to="/" />;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Signup
                        </button>
                    </div>
                    <div className="red-text center"> {this.state.error} </div>
                </form>
            </div>
        );
    }
}
