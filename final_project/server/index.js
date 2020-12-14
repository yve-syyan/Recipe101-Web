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
app.get("/receipebydifficulty/:difficulty", routes.getReceipe2);
// app.get("/receipebytime/:time", routes.getReceipe3);
app.get("/recipeIngredient/:recipeid", routes.getSingleRecipeIngredients);
app.get("/foodelements/:recipeid", routes.getSingleRecipeIngredients);
app.get("/singlerecipeinfo/:recipeid", routes.getSingleRecipeInfo);

app.get("/recommendBasedonSearchedRecipeAuthorandTime/:author&:totalTime", routes.getRecommendBasedonSearchedRecipeAuthorandTime);

app.get("/recommendBasedonSearchedRecipeIngredients/:id", routes.getRecommendBaseonSearchRecipeSearchedRecipeIngredients);

app.get("/recommendAuthorsBasedonPopularity", routes.getRecommendAuthorsBasedonPopularity);

app.get("/recommendRecipebaseOnAuthorChoice/:author", routes.getRecommendRecipebaseOnAuthorChoice);

app.get("/getReciepbaseonTime/:time", routes.getReciepbaseonTime);

app.get("/checkfavorite/:id&:name", routes.checkfavorite);

app.get("/deletefavorite/:id&:name", routes.deletefavorite);

app.get("/addfavorite/:id&:name", routes.addfavorite);

app.get("/retrieveallfavorite/:name", routes.retrieveallfavorite);

app.listen(8080, () => {
  console.log(`Server listening on PORT 8080`);
});
