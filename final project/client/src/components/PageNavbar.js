import React from "react";
import "../style/PageNavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class PageNavbar extends React.Component {
  constructor(props) {
    props;

    this.state = {
      navDivs: [],
    };
  }

  componentDidMount() {
    const pageList = ["home", "search", "recommendation", "login"];

    let navbarDivs = pageList.map((page, i) => {
      if (this.props.active === page) {
        return (
          <a className="nav-item nav-link active" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      } else {
        return (
          <a className="nav-item nav-link" key={i} href={"/" + page}>
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
              src="https://img.icons8.com/plasticine/100/000000/cupcake.png"
              width="45"
              height="45"
              class="d-inline-block"
              loading="lazy"
            />
            <p>RecipeGo</p>
          </a>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">{this.state.navDivs}</div>
          </div>
        </nav>
      </div>
    );
  }
}
