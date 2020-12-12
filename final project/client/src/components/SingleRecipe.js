/* eslint-disable */
import React, { Component } from "react";
import { getSingleRecipeIngredient, getSingleRecipeInfo, getRecommendBasedonSearchedRecipeAuthorandTime, getRecommendBaseonSearchRecipeSearchedRecipeIngredients } from "./getData";
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
class SingleRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theRecepieInfo: [],
      ingredients: [],
      instructionState: "",
      recipeID: "",
      recommendAuthorTime: [],
      recommendBaseOnIngredient: []
    };
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
    getRecommendBasedonSearchedRecipeAuthorandTime(author, totaltime).then((res) => {
      console.log(res);
      const recommendAuthorTimeTemp = res.map((ele) => {
        let link = `http://localhost:3000/learnmore/?id=${ele["RecipeID"]}&author=${ele["Author"]}&totaltime=${ele["Total_Time"]}`
        return (
          <div>
            <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}> {ele["Recipe Name"]}</p>
            <a href={link} >
              <img style={{ marginLeft: "14%", marginTop: "10px", width: "93%", height: "70%", borderRadius: "10%", "min-width": "200px", "min-height": "200px" }} src={ele["Recipe Photo"]} />
            </a>
          </div >
        )
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
              <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px", color: "white", fontSize: "20px" }}> {ele["RecipeName"]}</p>
              <a href={link} >
                <img style={{ marginLeft: "14%", marginTop: "10px", width: "93%", height: "70%", borderRadius: "10%", "min-width": "200px", "min-height": "200px" }} src={ele["RecipePhoto"]} />
              </a>
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
      const theRecepieInfoTemp = (
        <div>
          <div style={{ fontFamily: "Patua One" }}>
            <div style={{ marginBottom: "2px, solid, red", color: "#FEF2F2", paddingTop: "49px", paddingLeft: "5%", paddingBottom: "10px", fontSize: "30px" }}>{`${res[0]["Recipe Name"]}`}</div>
          </div>
          <Grid container style={{ marginLeft: "10px", marginTop: "30px", backgroundImage: `url(${singleRecipe1})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", width: "100%", height: "410px" }}>
            <Grid item xs={4}>
              <img style={{ marginLeft: "14%", marginTop: "28px", width: "93%", height: "70%", borderRadius: "10%" }} src={res[0]["Recipe Photo"]} />
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
          <div>{theRecepieInfo}</div>
          <p style={{ marginTop: "40px", marginLeft: "70px", marignBottom: "0px" }}>Direction:</p>
          <ol className="directions" style={{}}>{instructionState}</ol>
          <p> Recommendations based on  Same Author and Similar Cooking Time</p>
          <div id="recommendAuthorTime">
            {this.state.recommendAuthorTime}
          </div>
          <p> Recommendations base on 90% Matching Ingredients</p>
          <div id="recommendAuthorTime">
            {this.state.recommendBaseOnIngredient}
          </div>
        </div>
      </body >
    );
  }
}

export default SingleRecipe;
