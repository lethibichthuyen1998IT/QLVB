﻿import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";

import Error from "components/Error";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", errors: {} };
    }
    handleForm = e => {
        e.preventDefault();
        const data = {username : this.state.username, password: this.state.password };

        axios
            .post("/Login/Index", data)
            .then(res => {
                cookie.set("token", res.data.access_token);
                this.props.setLogin(res.data.user);
                this.props.history.push("/admin/dashboard");
            })
            .catch(e => this.setState({ errors: e.response.data.errors }));
    };
    handleInput = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="flex">
                <div className="w-1/3" />
                <div className="w-1/3 mt-10 p-4 bg-white">
                    <form className="border border-gray-500" onSubmit={this.handleForm}>
                        <div className="p-4">
                            <h1 className="text-lg border-b border-gray-500">Ping Here</h1>
                            <Error
                                error={
                                    this.state.errors["result"]
                                        ? this.state.errors["result"]
                                        : null
                                }
                            />
                            <div className="mt-4">
                                <label>username</label>
                                <input
                                    type="username"
                                    name="username"
                                    placeholder="Your Username"
                                    onChange={this.handleInput}
                                    className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                                />
                                <Error
                                    error={
                                        this.state.errors["username"]
                                            ? this.state.errors["username"]
                                            : null
                                    }
                                />
                            </div>
                            <div className="mt-4">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleInput}
                                    placeholder="Super Duper Secret Password"
                                    className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                                />
                                <Error
                                    error={
                                        this.state.errors["password"]
                                            ? this.state.errors["password"]
                                            : null
                                    }
                                />
                            </div>
                            <div className="mt-4">
                                <input
                                    type="submit"
                                    className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
    };
};
export default Login;
