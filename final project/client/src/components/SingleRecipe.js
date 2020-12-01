/* eslint-disable */
import React, { Component } from "react";
import { getSingleRecipeIngredient, getSingleRecipeInfo } from "./getData";
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
      recipeID: ""
    };
  }

  componentDidMount() {
    const urlArray = window.location.href.split("/");
    const recipeIDTemp = urlArray[urlArray.length - 1];
    const recipeID = decodeURI(recipeIDTemp);
    this.setState({recipeID: recipeID});
    console.log(recipeID);
    this.setState({ theRecepie: recipeID });
    getSingleRecipeIngredient(recipeID).then((res) => {
      console.log(res[0].quantity);
      console.log(res[0].unit);
      console.log(res[0].ingredient);
      console.log(res);
      const ingrediventDiv = res.map((x) => (
        <TableRow key={x.name}>
          <TableCell component="th" scope="row">
            {x.ingredient}
          </TableCell>
          <TableCell align="right">{x.quantity}</TableCell>
          <TableCell align="right">{x.unit}</TableCell>
        </TableRow>
        // <tr>
        //   <td>{x.quantity}</td>
        //   <td>{x.unit}</td>
        //   <td>{x.ingredient}</td>
        // </tr>
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
          <div style={{fontFamily:"Patua One"}}>
            {/* <div>{`RecipeID: ${res[0].RecipeID}`}</div> */}
            <div style={{marginBottom:"2px, solid, red", color:"#FEF2F2", paddingTop:"49px", paddingLeft:"5%", paddingBottom:"10px", fontSize:"30px"}}>{`${res[0]["Recipe Name"]}`}</div>
          </div>
          <Grid container style={{marginLeft:"10px", marginTop:"30px", backgroundImage: `url(${singleRecipe1})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", width:"100%", height:"410px"}}>
            <Grid item xs={4}>
              <img style={{marginLeft:"14%", marginTop:"28px", width: "93%", height: "70%", borderRadius: "10%"}} src={res[0]["Recipe Photo"]} />
              <div style={{color:"white", marginLeft:"15%", marginTop:"30px",fontSize:"20px", fontFamily:"Patua One"}}>{`Recipe Name: ${res[0]["Recipe Name"]}`}</div>
              <div style={{color:"white", marginLeft:"15%", fontSize:"20px", fontFamily:"Patua One"}}>{`Author: ${res[0].Author}`}</div>
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
          <p style={{marginTop:"40px", marginLeft:"70px", marignBottom:"0px"}}>Direction:</p>
          <ol className="directions" style={{}}>{instructionState}</ol>

          {/* <table>
            <thead>
              <tr>
                <th>quantity</th>
                <th>unit</th>
                <th>ingredient</th>
              </tr>
            </thead>
            <tbody>{ingredients}</tbody>
          </table> */}

          {/* <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients}
              </TableBody>
            </Table> */}
            {/* <TableFooter>
            <TableRow>
              <TablePagination rowsPerPageOptions={[10, 50]} /> */}
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              /> */}
            {/* </TableRow>
          </TableFooter> */}
          {/* </TableContainer> */}
        </div>
      </body>
    );
  }
}

export default SingleRecipe;
