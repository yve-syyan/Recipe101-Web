/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable */
import React from "react";
import "../style/Dashboard.css";
import "jquery/dist/jquery.js";
import Carousel from 'react-bootstrap/Carousel'
import CarouselItem from 'react-bootstrap/Carousel'
import CarouselCaption from 'react-bootstrap/Carousel'
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import image0 from "../images/Picture5.png"
import image1 from "../images/Picture4.png"
import image2 from "../images/Picture3.png"
import image3 from "../images/Picture2.png"
import image4 from "../images/Picture1.png"
import image5 from "../images/Picture6.png"

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="home" />
        <div className="container-fluid2">
          <div>
            <Carousel>
              <CarouselItem interval={2000}>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="First slide"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  alt="Second slide"
                />
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                  alt="Third slide"
                />
              </CarouselItem>         
            </Carousel>
            <div
              id="carouselExampleIndicators"
              className="carousel slide carousel-fade"
              data-ride="carousel"
              data-interval="5000"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                />
                <li data-target="#carouselExampleIndicators" data-slide-to="1" />
                <li data-target="#carouselExampleIndicators" data-slide-to="2" />
                <li data-target="#carouselExampleIndicators" data-slide-to="3" />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item">
                  <img
                    // className="cover-image2 fullpage2"
                    src={image0}
                    // className="d-block h-30""
                  />
                   <img
                    // className="cover-image2 fullpage2"
                    src="https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                    // className="d-block h-30"
                    alt="2"
                  />
                </div>
                <div className="carousel-item justify-content-center">
                  <img
                    // className="cover-image2 fullpage2"
                    src="https://images.unsplash.com/photo-1543573852-1a71a6ce19bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                    // className="d-block h-30"
                    alt="2"
                  />
                </div>
                <div className="carousel-item justify-content-center">
                  <img
                    // className="cover-image2 fullpage2"
                    src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
                    // className="d-block h-50"
                    alt="3"
                  />
                </div>
                <div className="carousel-item justify-content-center">
                  <img
                    // className="cover-image2 fullpage2"
                    src="https://images.unsplash.com/photo-1599333521738-7c21be2d7283?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                    // className="d-block h-50"
                    alt="4"
                  />
                </div>

                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div> 
          <div className="button-container container-fluid">
            <img src={image0} className="fullpage2" />
          </div>
          <div className="button-container container-fluid">
            <img src={image1} className="fullpage2" />
            <a className="right-pic" href="/search" alt="Buy Tickets">Find More</a>
          </div>
          <div className="button-container container-fluid">
            <img src={image2} className="fullpage2" />
            <a className="left-pic" href="/search" alt="Buy Tickets">Find More</a>
          </div>
          <div className="button-container container-fluid">
            <img src={image3} className="fullpage2" />
            <a className="right-pic" href="/search" alt="Buy Tickets">Find More</a>
          </div>
          <div className="button-container container-fluid">
            <img src={image4} className="fullpage2" />
            <a className="left-pic" href="/search" alt="Buy Tickets">Find More</a>
          </div>
        </div>
        <img className="bottom-pic" src={image5} />
      </div>
    );
  }
}
