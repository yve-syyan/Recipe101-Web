/* eslint-disable */
import React, {
  useEffect,
  useState,
  useReducer,
  useLayoutEffect,
  useRef,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import image0 from "../images/Picture5.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

function RecipeList(props) {
  const classes = useStyles();
  const { recipeInfo, initialArray, page1 } = props;
  console.log(recipeInfo);
  const [page, setPage] = useState(page1);
  console.log(page);
  let [myarray, setMyarray] = useState(initialArray);

  const handlePageChange = (event, value) => {
    setPage(value);
    setMyarray(recipeInfo.slice((value - 1) * 5, (value - 1) * 5 + 5));
  };
  if (page === 1) {
    myarray = initialArray;
  }
  return (
    <div className={classes.root}>
      {myarray.map((recipe) => (
        <div style={{ marginTop: 0 }}>
          <Grid
            container
            spacing={0}
            style={{
              backgroundColor: "#9E4244",
              height: 300,
              border: "2px solid #B6666F",
            }}
          >
            <Grid
              item
              xs={3}
              style={{
                backgroundColor: "#9E4244",
                margin: "2.9%",
                marginTop: "2.0%",
                border: "6px solid #B6666F",
              }}
            >
              {/* <ButtonBase className={classes.image} style={{width:350, height:226, marginTop:33}}> */}
              <img
                className={classes.img}
                alt="complex"
                src={recipe.RecipePhoto}
                style={{ width: "100%", height: 226, objectFit: "cover" }}
              />
              {/* </ButtonBase> */}
            </Grid>
            <Grid
              item
              xs={9}
              sm
              container
              style={{
                backgroundColor: "white",
                height: "100%",
                width: "100%",
                backgroundImage: `url(${image0})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                borderLeft: "4px solid #B6666F",
              }}
            >
              <Grid item xs container direction="column" spacing={0} style={{}}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={{
                      marginLeft: "11%",
                      marginTop: "7%",
                      color: "white",
                      fontFamily: "Patua One",
                      fontSize: "25px",
                    }}
                  >
                    <span>{recipe.RecipeName}</span>
                    <span style={{ fontSize: "15px", marginLeft: "2%" }}>
                      Post By
                    </span>
                    <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                      {recipe.Author}
                    </span>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    style={{
                      marginLeft: "9%",
                      color: "white",
                      fontFamily: "Patua One",
                      fontSize: "15px",
                    }}
                  >
                    <span style={{ fontSize: "18px", marginLeft: "2%" }}>
                      Keywords:
                    </span>
                    <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                      {recipe.keyword}
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: "9%",
                      color: "white",
                      fontFamily: "Patua One",
                    }}
                  >
                    <span style={{ fontSize: "18px", marginLeft: "2%" }}>
                      Total
                    </span>
                    <span style={{ fontSize: "18px", marginLeft: "0.5%" }}>
                      Time:
                    </span>
                    <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                      {recipe.TotalTime}
                    </span>
                    <span style={{ fontSize: "15px", marginLeft: "0.5%" }}>
                      min
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="body2"
                    style={{
                      marginLeft: "70%",
                      marginBottom: "100%",
                      color: "#E4C2C1",
                      cursor: "pointer",
                      fontFamily: "Patua One",
                      fontSize: "18px",
                    }}
                  >
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
      <Pagination
        id="Pagination"
        count={recipeInfo.length / 5 + 1}
        defaultPage={1}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}
// localStorage.getItem("currentUser")
//localStorage.setItem("TOKEN_KEY", token1);
RecipeList.propTypes = {
  recipeInfo: PropTypes.arrayOf(
    PropTypes.shape({
      keyword: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      Directions: PropTypes.string.isRequired,
      Ingredients: PropTypes.string.isRequired,
      RecipeName: PropTypes.string.isRequired,
      RecipePhoto: PropTypes.string.isRequired,
      RecipeID: PropTypes.number.isRequired,
      TotalTime: PropTypes.string.isRequired,
    })
  ),
  initialArray: PropTypes.arrayOf(
    PropTypes.shape({
      keyword: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      Directions: PropTypes.string.isRequired,
      Ingredients: PropTypes.string.isRequired,
      RecipeName: PropTypes.string.isRequired,
      RecipePhoto: PropTypes.string.isRequired,
      RecipeID: PropTypes.number.isRequired,
      TotalTime: PropTypes.string.isRequired,
    })
  ),
};
RecipeList.defaultProps = {
  recipeInfo: [],
};

export default RecipeList;
