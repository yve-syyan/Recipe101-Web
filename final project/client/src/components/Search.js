import React, { Component } from "react";
import PageNavbar from "./PageNavbar";
import Ingredient from "./Ingredient";
import { fetchIngredient } from "./getData";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: "",
      ingredientArray: [],
      ingrendientComponents: "",
    };

    this.handleSendImg = this.handleSendImg.bind(this);
    this.handleSubmitIngredientInput = this.handleSubmitIngredientInput.bind(
      this
    );
  }

  handleSubmitIngredientInput() {
    const { ingredientArray, ingredient } = this.state;
    const tempIngredient = ingredient;
    if (tempIngredient != "") {
      fetchIngredient(tempIngredient).then((res) => {
        let array = ingredientArray;
        array.push({ food: { tempIngredient }, img: { res } });
        console.log(array[0].img);
        console.log(array[0].food);
        this.setState({ ingredientArray, array });
      });
    }
    document.getElementById("IngredientInput").value = "";
  }

  handleSendImg(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state.ingredient);
  }

  render() {
    const { ingredientArray } = this.state;
    return (
      <div>
        <PageNavbar />
        <input
          id="IngredientInput"
          type="text"
          name="ingredient"
          onChange={(e) => this.handleSendImg(e)}
        />
        <button
          type="submit"
          onClick={() => this.handleSubmitIngredientInput()}
        >
          Add
        </button>
        <div>
          {ingredientArray.map((object, j) => {
            return (
              <Ingredient name={object.food.tempIngredient} html={object.img} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Search;
