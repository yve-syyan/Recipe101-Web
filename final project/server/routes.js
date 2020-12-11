var config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

function registerAccount(req, res) {
  console.log("Create an Account");
  const userName = req.body.username;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
  const query = `
  INSERT INTO User (username, password)
  VALUES ('${userName}', '${password}');
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) res.status(400).json({ error: "missing password" });
    else {
      res.json(rows);
    }
  });
}

function loginAccount(req, res) {
  console.log("Login an Account");
  if (req.body.username == null || req.body.password == null) {
    return res.status(400).json({ error: "missing input" });
  }

  console.log(req.body.username);
  console.log(req.body.password);

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const query = " Select * FROM User WHERE username = ? AND password = ?";
  const values = [user.username, user.password];
  connection.query(query, values, function (err, rows, fields) {
    // console.log(rows);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows.length === 0) {
      res.status(400).json({ error: "wrong username or password" });
      return;
    } else {
      res.json(rows);
    }
  });
}
function getReceipe(req, res) {
  const ingredient = JSON.parse(req.params.food).element;
  console.log(ingredient);

  const query2 = `SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Ingredients, Directions, Total_Time FROM recipes_cleaned WHERE RecipeID in (SELECT RecipeID FROM (SELECT RecipeID, GROUP_CONCAT(ingredient SEPARATOR 	',') FROM ingredient_recipe GROUP BY RecipeID) X WHERE ingredients LIKE '%${ingredient}%') LIMIT 5;`;

  connection.query(query2, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("xxx");
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
}

function getSingleRecipeIngredients(req, res) {
  console.log("Get a single recipe  ingredients Infomation");
  const id = JSON.parse(req.params.recipeid);
  // console.log(id);
  const query = `Select * from ingredient_recipe where RecipeID = "${id}";`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("Get a single recipe  ingredients Infomation fail");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}

function getSingleRecipeInfo(req, res) {
  console.log(req);
  console.log("Get a single recipe all Information");
  const id = JSON.parse(req.params.recipeid);
  console.log(id);
  const query = `Select * from recipes_cleaned where RecipeID = "${id}";`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("Get a single recipe all Information fail");
      return;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  registerAccount: registerAccount,
  loginAccount: loginAccount,
  getReceipe: getReceipe,
  getSingleRecipeIngredients: getSingleRecipeIngredients,
  getSingleRecipeInfo: getSingleRecipeInfo,
};
