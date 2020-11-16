import React from "react";
import "../style/Dashboard.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import PageNavbar from "./PageNavbar";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="home" />
        <div
          id="carouselExampleIndicators"
          class="carousel slide carousel-fade"
          data-ride="carousel"
          data-interval="5000"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item justify-content-center">
              <img
                class="cover-image"
                src="https://images.unsplash.com/photo-1601409751311-cbecfe223af4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                class="d-block h-30"
                alt="1"
              />
            </div>
            <div class="carousel-item active justify-content-center">
              <img
                class="cover-image"
                src="https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                class="d-block h-30"
                alt="2"
              />
            </div>
            <div class="carousel-item justify-content-center">
              <img
                class="cover-image"
                src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
                class="d-block 3-50"
                alt="3"
              />
            </div>
            <div class="carousel-item justify-content-center">
              <img
                class="cover-image"
                src="https://images.unsplash.com/photo-1599333521738-7c21be2d7283?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                class="d-block 3-50"
                alt="4"
              />
            </div>

            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <br></br>
        <img src="../images/breakline.png" class="img-fluid" />
        <br></br>
        <p> Recipe Go </p>
      </div>
    );
  }
}
