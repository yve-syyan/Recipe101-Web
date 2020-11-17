/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import Button from "@material-ui/core/Button";
// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSubmit(e) {
    const { handleLogin } = this.props;
    e.preventDefault();

    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
      if (document.getElementById("loginErrorMessage") !== null) {
        document
          .getElementById("loginErrorMessage")
          .setAttribute("style", "display: none;");
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      };

      console.log(requestOptions);

      await fetch("http://localhost:8080/login", requestOptions)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            const loginMessage = document.createElement("p");
            loginMessage.innerHTML = "Hello!";
            loginMessage.setAttribute("id", "loginMessage");
            loginMessage.setAttribute("style", "color: green;");
            const login = document.getElementById("login");
            login.appendChild(loginMessage);

            handleLogin("tokens");

            // document.getElementById("loginMessage").remove();
          } else {
            let loginErrorMessage = null;
            if (document.getElementById("loginErrorMessage") === null) {
              loginErrorMessage = document.createElement("p");
              loginErrorMessage.innerHTML =
                "Your username or password is incorrect";
              loginErrorMessage.setAttribute("id", "loginErrorMessage");
              loginErrorMessage.setAttribute("style", "color: red;");
              const login = document.getElementById("login");
              login.appendChild(loginErrorMessage);
            } else {
              document
                .getElementById("loginErrorMessage")
                .setAttribute("style", "display: inline; color: red ");
            }
          }
        })
        .catch(() => {
          console.log("Unable to connect to server");
        });
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <header id="App-header" />
        <div id="RegisterDiv" />
        <div className="loginMain">
          <div className="login" id="login">
            <div>
              <label htmlFor="fname">Username :</label>
              <input
                type="text"
                id="LoginUsername"
                className="loginEle"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="fname">Password :</label>

              <input
                type="password"
                id="loginPassword"
                className="loginEle"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>

            <Button
              onClick={this.handleSubmit}
              type="button"
              id="loginButton"
              className="loginEle"
              color="primary"
              size="large"
            >
              Login In
            </Button>
          </div>
          <div id="JumpLink">
            <span> Or you could </span>
            <Link to="/register" id="loginLink">
              {" "}
              register now!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
