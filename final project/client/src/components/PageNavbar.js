/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable */
import React from "react";
import "../style/PageNavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDivs: [],
    };
  }
  handleLogout() {
    console.log("xx");
    localStorage.clear();
    window.top.location = "http://localhost:3000/login";
  }

  componentDidMount() {
    const pageList = ["home", "search", "best", "collection", "logout"];

    const navbarDivs = pageList.map((page, i) => {
      // eslint-disable-next-line react/prop-types
      if (this.props.active === page) {
        return (
          <a className="nav-item nav-link active" key={i} href={`/${page}`}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      } 
      if (page === "logout") {
        return (
          <button className="nav-item nav-link" style={{border:"0px solid transparent", backgroundColor:"transparent", fontFamily:"Patua One"}} onClick={() => this.handleLogout()}>
            Logout
          </button>
        );
      } else {
        return (
          <a className="nav-item nav-link" key={i} href={`/${page}`}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      }
    });

    this.setState({
      navDivs: navbarDivs,
    });
  }

  render() {
    return (
      <div className="PageNavbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand center">
            <img
              src="https://img.icons8.com/cotton/64/000000/bread-and-rye--v1.png"
              width="45"
              height="45"
              className="d-inline-block icon"
              loading="lazy"
            />
            <p className="web-name">RecipeGo</p>
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">{this.state.navDivs}</div>
          </div>

        </nav>
      </div>
    );
  }
}
