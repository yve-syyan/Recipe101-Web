import React from "react";
import "../style/Dashboard.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import PageNavbar from "./PageNavbar";
import GenreButton from "./GenreButton";
import DashboardMovieRow from "./DashboardMovieRow";

export default class Dashboard extends React.Component {
  constructor(props) {
    props;

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: [],
    };

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((genreList) => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) => (
          <GenreButton
            id={"button-" + genreObj.genre}
            onClick={() => this.showMovies(genreObj.genre)}
            genre={genreObj.genre}
          />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch(`http://localhost:8081/genres/${genre}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((topMovieList) => {
        console.log(topMovieList); //displays your JSON object in the console
        // let DashboardMovieRow = topMovieList.map((movie, i) => (

        // 		<div key={i} className="movie">
        // 		  <div className="title">{movie.title}</div>
        // 		  <div className="rating">{movie.rating}</div>
        //       <div className="vote_count">{movie.vote_count}</div>
        // 		</div>
        // ));
        let movieRow = topMovieList.map((movie, i) => (
          <DashboardMovieRow key={i} movie={movie} />
        ));

        //This saves our HTML representation of the data into the state, which we can call in our render function
        this.setState({
          movies: movieRow,
        });
      })
      .catch((err) => console.log(err));
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
