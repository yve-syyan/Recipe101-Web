/* eslint-disable */
import { FlareSharp } from "@material-ui/icons";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import SingleRecipe from "./SingleRecipe";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginS: false,
    };
    this.getLogin = this.getLogin.bind(this);
    this.getHome = this.getHome.bind(this);
  }

  getHome() {
    if (this.props.loginStatus) {
      return <Home />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  getLogin() {
    console.log(this.props.loginStatus);
    if (this.props.loginStatus) {
      return <Redirect to="/homepage" />;
    } else {
      return <Login handleLogin={this.props.handleLogin} />;
    }
  }

  getSearch() {
    if (Boolean(localStorage.getItem("TOKEN_KEY"))) {
      return <Search />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route exact path="/" render={() => <Login />} /> */}
            <Route exact path="/login" component={this.getLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/homepage" render={this.getHome} />
            <Route exact path="/search" component={this.getSearch} />
            <Route path="/learnmore" component={SingleRecipe} />
          </Switch>
        </Router>
      </div>
    );
  }
}
