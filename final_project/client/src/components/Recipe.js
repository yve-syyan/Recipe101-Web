/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      keyword,
      author,
      driections,
      ingredients,
      recipeName,
      recipePhoto,
      recipeID,
      totalTime,
    } = this.props;
    return (
      <div className="ingredient">
        <div>{`keyword: ${keyword}`}</div>
        <div>{`keyword: ${recipeName}`}</div>

        <div>{`Author: ${author}`}</div>
        <div>
          <img className="recipeImg" src={`${recipePhoto}`} />
        </div>
        <div>{`Ingredients: ${ingredients}`}</div>
        <br />
        <div>
          {" "}
          {`Instructions: 
        ${driections}`}
        </div>
        <br />
        <div>{`Time:${totalTime}`}</div>
        <br />
        <div>{`RecipeID: ${recipeID}`}</div>
      </div>
    );
  }
}

export default Recipe;
