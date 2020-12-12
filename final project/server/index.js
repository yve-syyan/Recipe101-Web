const bodyParser = require("body-parser");
const express = require("express");
var routes = require("./routes.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.post("/register", routes.registerAccount);

app.post("/login", routes.loginAccount);

app.get("/receipebyingredient/:food", routes.getReceipe);

// app.get("/recipeIngredient/:recipeid", routes.getSingleRecipeIngredients);
app.get("/foodelements/:recipeid", routes.getSingleRecipeIngredients);
app.get("/singlerecipeinfo/:recipeid", routes.getSingleRecipeInfo);

app.get("/recommendBasedonSearchedRecipeAuthorandTime/:author&:totalTime", routes.getRecommendBasedonSearchedRecipeAuthorandTime);

app.get("/recommendBasedonSearchedRecipeIngredients/:id", routes.getRecommendBaseonSearchRecipeSearchedRecipeIngredients);

app.listen(8080, () => {
  console.log(`Server listening on PORT 8080`);
});
