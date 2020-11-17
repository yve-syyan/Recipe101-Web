/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, html, deleteItem } = this.props;
    return (
      <div className="ingredient">
        <div>{name}</div>
        <div>
          <img src={`${html.res}`} />
        </div>
        <button
          type="submit"
          onClick={() => {
            deleteItem(name);
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-x-circle"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              fillRule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    );
  }
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  html: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Ingredient;
