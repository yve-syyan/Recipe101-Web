import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // ]
    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
      if (document.getElementById("loginErrorMessage") !== null) {
        document
          .getElementById("loginErrorMessage")
          .setAttribute("style", "display: none;");
      }

      /// lockout/////////////////////////////////////////////////////////
      if (localStorage.getItem(this.state.username) !== null) {
        const arrayTemp = localStorage.getItem(this.state.username).split(" ");
        const loginAttempt = parseInt(arrayTemp[0]);
        const lockoutTime = arrayTemp[1];

        console.log(`loginAttempt = ${loginAttempt}`);
        console.log(`lockoutTime = ${lockoutTime}`);
        if (
          loginAttempt >= 3 &&
          lockoutTime !== "undefined" &&
          (Date.now() - parseInt(lockoutTime)) / 1000 < 30
        ) {
          console.log("lockout in effect!");
          // document.getElementById("loginButton").innerHTML = "Lockout 30sec";
          return;
        }
      }
      document.getElementById("loginButton").innerHTML = "Login";

      /// lockout/////////////////////////////////////////////////////////

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      };
      console.log(requestOptions);
      fetch("http://localhost:8080/login", requestOptions)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            const loginMessage = document.createElement("p");
            loginMessage.innerHTML = "Welcome back buddy!";
            loginMessage.setAttribute("id", "loginMessage");
            loginMessage.setAttribute("style", "color: green;");
            const login = document.getElementById("login");
            login.appendChild(loginMessage);

            /// lockout/////////////////////////////////////////////////////////
            localStorage.setItem(this.state.username, `${0} undefined`);
            /// lockout/////////////////////////////////////////////////////////

            setTimeout(() => {
              window.top.location = "http://localhost:3000/homepage";
            }, 2000);

            this.props.saveUserNameAndPassWord(
              this.state.username,
              this.state.password
            );
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

            /// lockout//////////////////////////////////////////////////////////////////
            let loginAttemptTemp = 1;

            if (localStorage.getItem(this.state.username) === null) {
              localStorage.setItem(this.state.username, `${1} undefined`);
              console.log(`${this.state.username} not in map`);
            } else {
              loginAttemptTemp =
                parseInt(
                  localStorage.getItem(this.state.username).split(" ")[0]
                ) + 1;

              console.log(`A loginAttemptTemp = ${loginAttemptTemp}`);

              if (loginAttemptTemp >= 3) {
                const timeTemp = Date.now();
                // localStorage.setItem(this.state.username, [loginAttemptTemp, timeTemp]);
                localStorage.setItem(
                  this.state.username,
                  `${loginAttemptTemp} ${timeTemp}`
                );

                document.getElementById("loginButton").innerHTML =
                  "Lockout 30sec";
              } else {
                localStorage.setItem(
                  this.state.username,
                  `${loginAttemptTemp} undefined`
                );
              }
            }
            /// lockout//////////////////////////////////////////////////////////////////
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
        <header id="App-header"></header>
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
  saveUserNameAndPassWord: PropTypes.func.isRequired,
};

export default Login;
