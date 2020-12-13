/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import "../style/Dashboard.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/Carousel';
import PageNavbar from "./PageNavbar";
import image0 from "../images/Picture5.png"
import image1 from "../images/Picture4.png"
import image2 from "../images/Picture3.png"
import image3 from "../images/Picture2.png"
import image4 from "../images/Picture1.png"
import image5 from "../images/Picture6.png"
import image6 from "../images/homepic.png"

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
          <div className="button-container container-fluid">
            <img src={image6} className="fullpage2" />
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
            <a className="left-pic" href="/best" alt="Buy Tickets">Find More</a>
          </div>
          <div className="button-container container-fluid">
            <img src={image3} className="fullpage2" />
            <a className="right-pic" href="/search" alt="Buy Tickets">Find More</a>
          </div>
          <div className="button-container container-fluid">
            <img src={image4} className="fullpage2" />
            <a className="left-pic" href="/collection" alt="Buy Tickets">Find More</a>
          </div>
        </div>
        <img className="bottom-pic" src={image5} />
      </div>
    );
  }
}
