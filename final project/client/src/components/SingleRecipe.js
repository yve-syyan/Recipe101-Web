import React, { Component } from "react";
import { getSingleRecipeIngredient, getSingleRecipeInfo } from "./getData";

class SingleRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theRecepieInfo: [],
      ingredients: [],
      instructionState: "",
    };
  }

  componentDidMount() {
    const urlArray = window.location.href.split("/");
    const recipeIDTemp = urlArray[urlArray.length - 1];
    const recipeID = decodeURI(recipeIDTemp);
    console.log(recipeID);
    this.setState({ theRecepie: recipeID });
    getSingleRecipeIngredient(recipeID).then((res) => {
      console.log(res[0].quantity);
      console.log(res[0].unit);
      console.log(res[0].ingredient);
      console.log(res);
      const ingrediventDiv = res.map((x) => (
        <tr>
          <td>{x.quantity}</td>
          <td>{x.unit}</td>
          <td>{x.ingredient}</td>
        </tr>
      ));
      console.log(ingrediventDiv);
      this.setState({ ingredients: ingrediventDiv });
    });
    getSingleRecipeInfo(recipeID).then((res) => {
      //   console.log(res[0].RecipeID);
      //   console.log(res[0]["Recipe Name"]);
      //   console.log(res[0]["Recipe Photo"]);
      //   console.log(res[0].Author);
      //   console.log(res[0].Directions);
      //   console.log(res[0].Prepare_Time);
      //   console.log(res[0].Cook_Time);
      //   console.log(res[0].Total_Time);
      const instruction = res[0].Directions.split("**");
      console.log(instruction);
      const theRecepieInfoTemp = (
        <div>
          <div>{`RecipeID: ${res[0].RecipeID}`}</div>
          <div>{`Recipe Name: ${res[0]["Recipe Name"]}`}</div>
          <div>{`Author: ${res[0].Author}`}</div>
          <img src={res[0]["Recipe Photo"]} />
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
      <div>
        <div>{theRecepieInfo}</div>
        <ol>{instructionState}</ol>

        <table>
          <thead>
            <tr>
              <th>quantity</th>
              <th>unit</th>
              <th>ingredient</th>
            </tr>
          </thead>
          <tbody>{ingredients}</tbody>
        </table>
      </div>
    );
  }
}

export default SingleRecipe;
