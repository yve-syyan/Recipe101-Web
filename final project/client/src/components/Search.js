/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable*/
import React, { Component } from "react";
import "jquery/dist/jquery.min";
import "bootstrap/dist/css/bootstrap.min.css";
// import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min";
import Button from "@material-ui/core/Button";
import PageNavbar from "./PageNavbar";
// import Ingredient from "./Ingredient";
// import Recipe from "./Recipe";
import { fetchIngredient, getReceipe } from "./getData";
import IngredientOption from "./IngredientOption";
import DifficultyOption from "./DifficultyOption";
import RecipeList from "./RecipeList";
import image0 from "../images/SearchPage.png";
import ingredientImage from "../images/Ingredient.png";
import difficultyImage from "../images/Difficulty.png";
import recipeGoImage from "../images/Recipego.png";
import image5 from "../images/Picture6.png"
import "../style/Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      ingredientArray: [],
      selectedCookingTime: 30,
      recepieArray: [],
      page2: -1,
      recipelist: [],
    };

    this.handleSendImg = this.handleSendImg.bind(this);
    // this.handleSubmitIngredientInput = this.handleSubmitIngredientInput.bind(
    //   this
    // );
    // this.handledeleteItem = this.handledeleteItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
  }

  componentDidMount() {
    console.log("component did mount");
    M.AutoInit();
  }

  handleSendImg(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state.ingredient);
  }

  handleChange(e) {
    let time = e.target.value;
    const timeArray = time.split(" ");
    console.log(timeArray);
    if (timeArray[1] !== "min") {
      time = parseFloat(timeArray[0]) * 60;
      console.log(time);
    } else {
      time = parseFloat(timeArray[0]);
    }

    this.setState({
      selectedCookingTime: time,
    });
  }

  handleSubmit() {
    this.setState({ recipelist: [] });
    try {
      const { ingredientArray, recepieArray, page2 } = this.state;
      console.log(ingredientArray.tags);
      const array = [];
      for (let i = 0; i < ingredientArray.tags.length; i += 1) {
        // eslint-disable-next-line no-loop-func
        console.log(ingredientArray.tags[i].title);
        getReceipe(ingredientArray.tags[i].title).then((res) => {
          res.map((obj) => {
            return array.push({
              keyword: ingredientArray.tags[i].title,
              Author: obj.Author,
              Directions: obj.Directions,
              Ingredients: obj.Ingredients,
              RecipeName: obj["Recipe Name"],
              RecipePhoto: obj["Recipe Photo"],
              RecipeID: obj.RecipeID,
              TotalTime: obj.Total_Time,
            });
          });

          this.setState({ recepieArray: array });
          // this.setState({ initialArray: array.slice(0,5)});
          let initialArray = [];
          if (array.length >= 5) {
            initialArray = array.slice(0, 5);
          } else {
            initialArray = array;
          }
          console.log(("initialArray:", initialArray));
          const recipe = (
            <RecipeList
              id="RecipeList"
              className="recipes"
              recipeInfo={array}
              initialArray={initialArray}
              page1={1}
            />
          );

          this.setState({ recipelist: recipe });
        });
      }
    } catch {
      console.log("error");
    } finally {
      console.log(this.recepieArray);
    }
  }

  handleIngredients = (ingredients) => {
    this.setState({ ingredientArray: ingredients });
  };

  render() {
    const { page, recepieArray, page2 } = this.state;
    // let initialArray = [];
    // if (recepieArray.length >= 5) {
    //   initialArray = recepieArray.slice(0, 5);
    // } else {
    //   initialArray = recepieArray;
    // }
    // console.log(initialArray);
    return (
      <body>
        <div className="searchBoard">
          <PageNavbar />
          <img className="fullpage" alt="" src={image0} />
          <div className="search-container container-fluid">
            <img className="fullpage" style={{background:"black"}} alt="" src={ingredientImage} />
            <IngredientOption
              className="Option"
              getImage={this.handleSendImg}
              onSelectIngredients={this.handleIngredients}
            />
          </div>
          <div className="search-container container-fluid">
            <img className="fullpage" alt="" src={difficultyImage} />
            <DifficultyOption
              className="Option"
              getImage={this.handleSendImg}
            />
          </div>
          <div className="search-container container-fluid">
            <img className="fullpage" alt="" src={recipeGoImage} />
            <p
              style={{
                left: "68.3%",
                top: "38%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                lineHeight: 5,
                color: "#F3E5AB",
                fontFamily: "Patua One",
                fontSize: "35px",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              Find Your Recipe Now
            </p>
            <Button
              onClick={this.handleSubmit}
              variant="outlined"
              style={{
                height: "12.6%",
                width: "41%",
                left: "68.4%",
                top: "58%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                lineHeight: 5,
                borderColor: "#E4C2C1",
                border: "5px solid",
                backgroundColor: "#D1A080",
                color: "#F3E5AB",
                fontFamily: "Patua One",
                fontSize: "35px",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              Recipe Go!
            </Button>
          </div>
          <div className="recipeList">
            {this.state.recipelist}
            {/* <RecipeList
              id="RecipeList"
              className="recipes"
              recipeInfo={recepieArray}
              initialArray={initialArray}
              page1={1}
            /> */}
          </div>
          {/* <div className="row">
            <div className="input-field col s4"></div>
            <div className="input-field col s4">
              <select searchable='List of options' id="lastName">
                <option value="1">start 1</option>
                <option value="2">start 2</option>
                <option value="3">end 3</option>
                <option value="4">end 4</option>
                <option value="5">end 5</option>
                <option value="6">go 3</option>
              </select>
              <label htmlFor="lastName" id="hi">Materialize Select</label>
            </div>
          </div> */}
          {/* <div className="input-field col s12 form">
            <label htmlFor="lastName" id="hi">
              Materialize Select
              <select2 searchable='List of options' name="lastName">
                <option value="" disabled selected>Choose your option</option> 
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select2>
            </label>
          </div> */}
        </div>
      </body>
    );
  }
}
