/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import PageNavbar from "./PageNavbar";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";
import { fetchIngredient, getReceipe } from "./getData";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      ingredientArray: [],
      selectedCookingTime: 30,
      recepieArray: [],
    };

    this.handleSendImg = this.handleSendImg.bind(this);
    this.handleSubmitIngredientInput = this.handleSubmitIngredientInput.bind(
      this
    );
    this.handledeleteItem = this.handledeleteItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handledeleteItem(foodName) {
    console.log(foodName);

    const { ingredientArray } = this.state;
    const array = ingredientArray;

    for (let i = 0; i < array.length; i += 1) {
      if (array[i].food.tempIngredient === foodName) {
        array.splice(i, 1);
      }
    }

    this.setState({ ingredientArray: array });
  }

  handleSubmitIngredientInput() {
    const { ingredientArray, ingredient } = this.state;
    const tempIngredient = ingredient;
    if (tempIngredient !== "") {
      fetchIngredient(tempIngredient).then((res) => {
        const array = ingredientArray;
        if (res !== 0) {
          array.push({ food: { tempIngredient }, img: { res } });
          console.log(array[0].img);
          console.log(array[0].food);
          this.setState({ ingredientArray: array });
        }
      });
    }
    document.getElementById("IngredientInput").value = "";
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
    const { ingredientArray, recepieArray } = this.state;
    // console.log(ingredientArray);
    const array = recepieArray;
    for (let i = 0; i < ingredientArray.length; i += 1) {
      // eslint-disable-next-line no-loop-func
      getReceipe(ingredientArray[i].food.tempIngredient).then((res) => {
        // console.log(res);
        res.map((obj) => {
          return array.push({
            keyword: ingredientArray[i].food.tempIngredient,
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
        console.log(recepieArray);
      });
    }
  }

  render() {
    const { ingredientArray, recepieArray } = this.state;
    return (
      <div>
        <PageNavbar />
        <div>
          <id id="search">
            <input
              id="IngredientInput"
              type="text"
              name="ingredient"
              placeholder="Ingredient"
              onChange={(e) => this.handleSendImg(e)}
            />
            <button
              type="submit"
              onClick={() => this.handleSubmitIngredientInput()}
            >
              Add
            </button>
            {/* <input id="time" type="text" placeholder="Cookingtime"></input> */}
            <select
              onChange={this.handleChange}
              className="dropdown"
              id="decadesDropdown"
            >
              <option select value>
                -- select an cooking time( default 30 min) --
              </option>
              <option> 10 min</option>
              <option> 20 min</option>
              <option> 30 min</option>
              <option> 40 min</option>
              <option> 50 min</option>
              <option> 1 hours</option>
              <option> 1.5 hours</option>
              <option> 2 hours</option>
              <option> 2.5 hours</option>
              <option> 3 hours</option>
              <option> 3.5 hours</option>
              <option> 4 hours</option>
              <option> 4.5 hours</option>
              <option> 5 hours</option>
              <option> 5.5 hours or longer</option>
            </select>

            <button type="submit" onClick={this.handleSubmit}>
              {" "}
              <SearchSharpIcon />
            </button>
          </id>
          <div id="IngredientBox">
            {ingredientArray.map((object) => {
              return (
                <Ingredient
                  className="ingredient"
                  name={object.food.tempIngredient}
                  html={object.img}
                  deleteItem={this.handledeleteItem}
                />
              );
            })}
          </div>
        </div>
        <div id="recipes">
          {" "}
          {recepieArray.map((object) => {
            return (
              <Recipe
                keyword={object.keyword}
                author={object.Author}
                driections={object.Directions}
                ingredients={object.Ingredients}
                recipeName={object.RecipeName}
                recipePhoto={object.RecipePhoto}
                recipeID={object.RecipeID}
                totalTime={object.TotalTime}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
