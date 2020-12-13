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
import Grid from "@material-ui/core/Grid";
import IngredientsTable from './IngredientsTable';
import PageNavbar from "./PageNavbar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
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
      iconState: [<FavoriteBorderOutlinedIcon fontSize="large" style={{color: "white" }} />]
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
      this.setState({ iconState: [<FavoriteIcon fontSize="large" style={{color: "red" }} />]})
      addFavorite(recipeIDTemp, name);
    } else if (this.state.color == "red") {
      this.setState({ color: "black" })
      this.setState({ iconState: [<FavoriteBorderOutlinedIcon fontSize="large" style={{color: "white" }} />]})
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
        this.setState({ iconState: [<FavoriteIcon fontSize="large" style={{color: "red" }} />]});
        this.setState({ color: "red" });
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
              <Card style={{ backgroundColor: "#9E4244", color: "white"}}>
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
            <div style={{ marginBottom: "20px", color: "#FEF2F2", paddingTop: "10px", paddingLeft: "5%", paddingBottom: "10px", fontSize: "30px" }}>{`${res[0]["Recipe Name"]}`}</div>
          </div>
          <Grid container style={{ marginTop: "0px", marginLeft: "10px", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", width: "96%" }}>
            <Grid item xs={4}>
              <img style={{ marginLeft: "12.5%", marginTop: "12px", width: "93%", height: "300px", borderRadius: "10%" }} src={res[0]["Recipe Photo"]} />
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
        <div className="content" style={{border:"20px solid #E4C2C1"}}>
          <p style={{marginLeft:"84%", marginTop: "30px", marginBottom:"0px"}}>Favorite: </p> 
          {/* <button style={{backgroundColor:"transparent", border:"0px solid transparent"}} onClick={() => { this.hanldeFavoriteChange() }}><FavoriteIcon style={{size:"large", color: `${this.state.color}` }} /></button> */}
          <button style={{marginTop: "30px", paddingRight:"1.3%", backgroundColor:"transparent", border:"0px solid transparent"}} onClick={() => { this.hanldeFavoriteChange() }}>{this.state.iconState}</button>
          <div>{theRecepieInfo}</div>
          <div style={{width:"100%", marginTop:"20px"}}>
            <p style={{ marignBottom: "0px", marginLeft: "5%" }}>Direction</p>
            <ol className="directions" style={{ marginBorrom: "0px", width:"90%"}}>{instructionState}</ol>
          </div>
          <div style={{borderTop:"2px solid #E4C2C1", width:"90%", marginLeft: "5%", marginTop:"0px", paddingBottom: "40px"}}>
            <p style={{ marginTop: "40px", marignBottom: "0px" }}> Recommendations based on  Same Author and Similar Cooking Time</p>
            <div id="recommendAuthorTime" style={{ marginTop: "40px", marignBottom: "40px"}}>
              {this.state.recommendAuthorTime}
            </div>
          </div>
          <div style={{borderTop:"2px solid #FEF2F2", width:"90%", marginLeft: "5%", marginTop:"0px", paddingBottom: "80px"}}>
            <p style={{ marginTop: "40px", marignBottom: "0px" }}> Recommendations base on 90% Matching Ingredients</p>
            <div id="recommendAuthorTime" style={{ marginTop: "40px", marignBottom: "0px"}}>
              {this.state.recommendBaseOnIngredient}
            </div>
          </div>
        </div>
      </body >
    );
  }
}

export default SingleRecipe;
