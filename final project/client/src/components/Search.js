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
import { fetchIngredient, getReceipe, getReceipe2} from "./getData";
import IngredientOption from "./IngredientOption";
import DifficultyOption from "./DifficultyOption";
import RecipeList from "./RecipeList";
import RecipeList2 from "./RecipeList2";
import image0 from "../images/SearchPage2.png";
import ingredientImage from "../images/Ingredient.png";
import difficultyImage from "../images/Difficulty.png";
import recipeGoImage from "../images/Recipego.png";
import image5 from "../images/Picture6.png";
import TimeOption from "./TimeOption";
import "../style/Search.css";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      ingredientArray: [],
      difficulty: "",
      time: "",
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
    this.handleSubmit2 = this.handleSubmit2.bind(this);
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

  handleSubmit2() {
    try {
      const { ingredientArray, recepieArray, page2 } = this.state;
      const array = [];
        // eslint-disable-next-line no-loop-func
      console.log("a", this.state.difficulty);
      getReceipe2(this.state.difficulty).then((res) => {
        res.map((obj) => {
          return array.push({
            level: this.state.difficulty,
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
        console.log(array);
        let initialArray = [];
        if (array.length >= 5) {
          initialArray = array.slice(0, 5);
        } else {
          initialArray = array;
        }
        console.log(("initialArray:", initialArray));
        const recipe = (
          <RecipeList2
            id="RecipeList"
            className="recipes"
            recipeInfo={array}
            initialArray={initialArray}
            page1={1}
          />
        );

        this.setState({ recipelist: recipe });
      });
    } catch {
      console.log("error");
    } finally {
      console.log(this.recepieArray);
    }
  }

  // handleSubmit3() {
  //   try {
  //     const { ingredientArray, recepieArray, page2 } = this.state;
  //     const array = [];
  //       // eslint-disable-next-line no-loop-func
  //     console.log("a", this.state.difficulty);
  //     getReceipe2(this.state.difficulty).then((res) => {
  //       res.map((obj) => {
  //         return array.push({
  //           Level: this.state.time,
  //           Author: obj.Author,
  //           Directions: obj.Directions,
  //           Ingredients: obj.Ingredients,
  //           RecipeName: obj["Recipe Name"],
  //           RecipePhoto: obj["Recipe Photo"],
  //           RecipeID: obj.RecipeID,
  //           TotalTime: obj.Total_Time,
  //         });
  //       });


  //       this.setState({ recepieArray: array });
  //       // this.setState({ initialArray: array.slice(0,5)});
  //       console.log(array);
  //       let initialArray = [];
  //       if (array.length >= 5) {
  //         initialArray = array.slice(0, 5);
  //       } else {
  //         initialArray = array;
  //       }
  //       console.log(("initialArray:", initialArray));
  //       const recipe = (
  //         <RecipeList2
  //           id="RecipeList"
  //           className="recipes"
  //           recipeInfo={array}
  //           initialArray={initialArray}
  //           page1={1}
  //         />
  //       );

  //       this.setState({ recipelist: recipe });
  //     });
  //   } catch {
  //     console.log("error");
  //   } finally {
  //     console.log(this.recepieArray);
  //   }
  // }

  handleIngredients = (ingredients) => {
    this.setState({ ingredientArray: ingredients });
  };

  handleDifficulty = (difficulty) => {
    if(difficulty.tags){
      this.setState({ difficulty: difficulty.tags.title});
    }
  };

  // handleTime = (time) => {
  //   if(time.tags){
  //     this.setState({ difficulty: difficulty.tags.title});
  //   }
  // };

  render() {
    const { page, recepieArray, page2 } = this.state;
    return (
      <body>
        <div className="searchBoard">
          <PageNavbar />
          <img className="fullpage2" alt="" src={image0} />
          <div className="search-container container-fluid">
            <img className="fullpage" style={{background:"black"}} alt="" src={ingredientImage} />
            <IngredientOption
              className="Option"
              getImage={this.handleSendImg}
              onSelectIngredients={this.handleIngredients}
            />
            <Button
              onClick={this.handleSubmit}
              variant="outlined"
              style={{
                height: "14%",
                width: "16%",
                left: "80.4%",
                top: "51.5%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                lineHeight: 5,
                borderColor: "white",
                border: "5px solid",
                backgroundColor: "#9E4244",
                color: "white",
                fontFamily: "Patua One",
                fontSize: "20px",
                "&:hover": { backgroundColor: "white" },
              }}
            >Recipe Go!</Button>
          </div>
          <div className="search-container container-fluid">
            <img className="fullpage" alt="" src={difficultyImage} />
            <DifficultyOption
              className="Option"
              getImage={this.handleSendImg}
              onSelectDifficulty={this.handleDifficulty}
            />
            <Button
              onClick={this.handleSubmit2}
              variant="outlined"
              style={{
                height: "14%",
                width: "16%",
                left: "80.4%",
                top: "48%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                lineHeight: 5,
                borderColor: "white",
                border: "5px solid",
                backgroundColor: "#B6666F",
                color: "white",
                fontFamily: "Patua One",
                fontSize: "20px",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              Recipe Go!
            </Button>
          </div>
          <div className="search-container container-fluid">
            <img className="fullpage" alt="" src={recipeGoImage} />
            {/* <p
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
            > */}
              {/* Find Your Recipe Now
            </p> */}
            <TimeOption
              className="Option"
              getImage={this.handleSendImg}
            />
            <Button
              onClick={this.handleSubmit}
              variant="outlined"
              style={{
                height: "14%",
                width: "16%",
                left: "80.4%",
                top: "48%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                lineHeight: 5,
                borderColor: "white",
                border: "5px solid",
                backgroundColor: "#D1A080",
                color: "white",
                fontFamily: "Patua One",
                fontSize: "20px",
                "&:hover": { backgroundColor: "white" },
              }}
            >
              Recipe Go!
            </Button>
          </div>
          <div className="recipeList">
            {this.state.recipelist}
          </div>
        </div>
      </body>
    );
  }
}
