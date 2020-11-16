import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login.js";
import Register from "./Register.js";
import Search from "./Search.js";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/homepage" render={() => <Home />} />
            <Route exact path="/search" render={() => <Search />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
