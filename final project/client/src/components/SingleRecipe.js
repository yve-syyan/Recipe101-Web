/* eslint-disable */
import React, { Component } from "react";
import {
  getSingleRecipeIngredient,
  getSingleRecipeInfo,
  getRecommendBasedonSearchedRecipeAuthorandTime,
  getRecommendBaseonSearchRecipeSearchedRecipeIngredients,
  checkfavorite,
  deleteFavorite,
  addFavorite
} from "./getData";

import "../style/Recipe.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination'
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IngredientsTable from './IngredientsTable';
import PageNavbar from "./PageNavbar";
import singleRecipe1 from "../images/SingleRecipe1.png";
import backgroundRecipe from "../images/backgroundRecipe.png";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
class SingleRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theRecepieInfo: [],
      ingredients: [],
      instructionState: "",
      recipeID: "",
      recommendAuthorTime: [],
      recommendBaseOnIngredient: [],
      color: "black",
    };
  }
  hanldeFavoriteChange() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);
    const recipeIDTemp = urlParams.get('id');
    const name = window.localStorage.getItem('user');
    if (this.state.color == "black") {
      this.setState({ color: "red" })
      addFavorite(recipeIDTemp, name);
    } else if (this.state.color == "red") {
      this.setState({ color: "black" })
      deleteFavorite(recipeIDTemp, name);
    }
  }

  componentDidMount() {

    const queryString = window.location.search;
    // const recipeIDTemp = urlArray[urlArray.length - 1];
    // const recipeID = decodeURI(recipeIDTemp);
    // console.log(recipeID);
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);
    const recipeIDTemp = urlParams.get('id');
    const author = urlParams.get('author');
    const totaltime = urlParams.get('totaltime');

    this.setState({ recipeID: recipeIDTemp });
    const name = window.localStorage.getItem('user');
    console.log(name);
    checkfavorite(recipeIDTemp, name).then((res) => {
      if (res.length !== 0) {
        this.setState({ color: "red" })
      };
    })
    getRecommendBasedonSearchedRecipeAuthorandTime(author, totaltime).then((res) => {
      console.log(res);
      const set1 = new Set();
      const recommendAuthorTimeTemp = res.map((ele) => {
        if (!set1.has(ele["Recipe Name"])) {
          set1.add(ele["Recipe Name"]);
          let link = `http://localhost:3000/learnmore/?id=${ele["RecipeID"]}&author=${ele["Author"]}&totaltime=${ele["Total_Time"]}`
          return (
            <div style={{ border: "0px solid white" }}>
              <Card style={{ backgroundColor: "#9E4244", color: "white" }}>
                <CardActionArea style={{}}>
                  <CardMedia>
                    {/* src = "https://images.unsplash.com/photo-1519148246701-3dc1897a7a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" */}
                    <a href={link} >
                      <img style={{ width: "300px", height: "200px", objectFit: "cover" }} src={ele["Recipe Photo"]} />
                    </a>
                  </CardMedia>
                  <CardContent style={{ width: "300px", height: "100px" }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: "Patua One" }}>
                      {ele["Recipe Name"]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              {/* <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}> {ele["Recipe Name"]}</p>      
            <img style={{ marginLeft: "14%", marginTop: "10px", width: "93%", height: "70%", borderRadius: "10%" }} src={ele["Recipe Photo"]} /> */}
            </div >
          )
        }
      })

      this.setState({ recommendAuthorTime: recommendAuthorTimeTemp });
    });
    getRecommendBaseonSearchRecipeSearchedRecipeIngredients(recipeIDTemp).then((res) => {
      console.log(res);
      const set1 = new Set();

      const recommendBaseOnIngredientTemp = res.map((ele) => {
        if (!set1.has(ele["RecipeName"])) {
          set1.add(ele["RecipeName"]);
          let link = `http://localhost:3000/learnmore/?id=${ele["ID"]}&author=${ele["Author"]}&totaltime=${ele["Total_Time"]}`
          return (
            <div>
              {/* <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}> {ele["RecipeName"]}</p>
              <a href={link} >
                <img style={{ marginLeft: "14%", marginTop: "10px", width: "93%", height: "70%", borderRadius: "10%", "min-width": "200px", "min-height": "200px" }} src={ele["RecipePhoto"]} />
              </a> */}
              <Card style={{ backgroundColor: "#9E4244", color: "white" }}>
                <CardActionArea style={{}}>
                  <CardMedia>
                    {/* src = "https://images.unsplash.com/photo-1519148246701-3dc1897a7a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" */}
                    <a href={link} >
                      <img style={{ width: "300px", height: "200px", objectFit: "cover" }} src={ele["RecipePhoto"]} />
                    </a>
                  </CardMedia>
                  <CardContent style={{ width: "300px", height: "100px" }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ fontFamily: "Patua One" }}>
                      {ele["RecipeName"]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div >
          )
        }
      })

      this.setState({ recommendBaseOnIngredient: recommendBaseOnIngredientTemp });

    })



    getSingleRecipeInfo(recipeIDTemp).then((res) => {
      if (res == undefined || res[0] == undefined) {
        return;
      }
      const instruction = res[0].Directions.split("**");
      // console.log(instruction);
      // backgroundImage: `url(${singleRecipe1})`
      const theRecepieInfoTemp = (
        <div>
          <div style={{ fontFamily: "Patua One" }}>
            <div style={{ marginBottom: "2px, solid, red", color: "#FEF2F2", paddingTop: "49px", paddingLeft: "5%", paddingBottom: "10px", fontSize: "30px" }}>{`${res[0]["Recipe Name"]}`}</div>
          </div>
          <Grid container style={{ marginLeft: "10px", marginTop: "30px", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", width: "100%" }}>
            <Grid item xs={4}>
              <img style={{ marginLeft: "14%", marginTop: "12px", width: "93%", height: "300px", borderRadius: "10%" }} src={res[0]["Recipe Photo"]} />
              <div style={{ color: "white", marginLeft: "15%", marginTop: "30px", fontSize: "20px", fontFamily: "Patua One" }}>{`Recipe Name: ${res[0]["Recipe Name"]}`}</div>
              <div style={{ color: "white", marginLeft: "15%", fontSize: "20px", fontFamily: "Patua One" }}>{`Author: ${res[0].Author}`}</div>
            </Grid>
            <Grid item xs={8}>
              <IngredientsTable recipeID={this.state.recipeID} />
            </Grid>
          </Grid>
        </div>
      );
      const instructionDiv = instruction
        .slice(0, instruction.length - 1)
        .map((ele) => <li>{ele}</li>);
      this.setState({ theRecepieInfo: theRecepieInfoTemp });
      this.setState({ instructionState: instructionDiv });
    });
  }

  render() {
    const { theRecepieInfo, ingredients, instructionState } = this.state;
    return (
      <body>
        <PageNavbar />
        <div className="content" style={{}}>
          <p>Favorite: </p> <button onClick={() => { this.hanldeFavoriteChange() }}><FavoriteIcon style={{ color: `${this.state.color}` }} /></button>
          <div>{theRecepieInfo}</div>
          <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}>Direction:</p>
          <ol className="directions" style={{ marginBorrom: "0px" }}>{instructionState}</ol>
          <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}> Recommendations based on  Same Author and Similar Cooking Time</p>
          <div id="recommendAuthorTime" style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}>
            {this.state.recommendAuthorTime}
          </div>
          <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}> Recommendations base on 90% Matching Ingredients</p>
          <div id="recommendAuthorTime" style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}>
            {this.state.recommendBaseOnIngredient}
          </div>
        </div>
      </body >
    );
  }
}

export default SingleRecipe;
