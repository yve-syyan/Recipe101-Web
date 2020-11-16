import React, { Component } from "react";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ingredient">
        <div>{this.props.name}</div>
        <div>
          <img src={`${this.props.html.res}`} />
        </div>
      </div>
    );
  }
}

export default Ingredient;
