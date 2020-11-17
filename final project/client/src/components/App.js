/* eslint-disable  */
// import { FlareSharp } from "@material-ui/icons";
import React from "react";
import Main from "./Main";
//sdfadf
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginStatus: Boolean(localStorage.getItem("TOKEN_KEY")),
    };
    this.handleLogink = this.handleLogink.bind(this);
  }

  handleLogink(token) {
    // console.log("******");
    localStorage.setItem("TOKEN_KEY", token);
    this.setState({ loginStatus: true });
    console.log("******");
  }

  render() {
    return (
      <div className="App">
        <Main
          loginStatus={this.state.loginStatus}
          handleLogin={this.handleLogink}
        />
      </div>
    );
  }
}
