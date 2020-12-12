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

  // const query2 = `SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Ingredients, Directions, Total_Time FROM recipes_cleaned WHERE RecipeID in (SELECT RecipeID FROM (SELECT RecipeID, GROUP_CONCAT(ingredient SEPARATOR 	',') FROM ingredient_recipe GROUP BY RecipeID) X WHERE ingredients LIKE '%${ingredient}%') LIMIT 5;`;
  const query2 = `WITH ingred_name AS(
SELECT recipeID, GROUP_CONCAT(ingredient SEPARATOR ',') ings
FROM ingredient_recipe
GROUP BY recipeID
)
SELECT IR.RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author,  Directions, Total_Time 
FROM recipes_cleaned RC JOIN ingred_name IR ON RC.recipeID=IR.recipeID
WHERE ings LIKE '%${ingredient}%'
LIMIT 5`;
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

function getReceipe2(req, res) {
  console.log("get recipe by difficulty");
 console.log(req.params.difficulty);
  
  const query = `WITH avg_rating AS (
    SELECT avg(rate) FROM reviews_cleaned
   ), negative_user AS(
    SELECT profileID, avg(rate) as user_avg_rate
       FROM (SELECT profileID, rate FROM reviews_cleaned) AS RC
       GROUP BY profileID
       HAVING avg(rate)<=(SELECT * FROM avg_rating)
   ), recipe_ratings AS(
    SELECT RecipeID, avg(Rate) as avg_rate
       FROM reviews_cleaned RC RIGHT JOIN negative_user NU ON RC.profileID=NU.profileID AND RC.rate>NU.user_avg_rate
       GROUP BY RecipeID
   ), recipe_difficulty AS(
    SELECT RR.RecipeID, 
        CASE WHEN Total_Time<30 AND COUNT(IR.ingredient_id)<10 THEN 'easy'
          WHEN Total_Time<30 AND COUNT(IR.ingredient_id)<20 THEN 'medium'
                   ELSE 'hard' END as difficulty,
        RR.avg_rate AS rating
       FROM recipe_ratings RR 
      JOIN (SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Total_Time FROM recipes_cleaned) RC ON RR.recipeID=RC.recipeID
      RIGHT JOIN (SELECT recipeID, ingredient_id FROM ingredient_recipe) IR ON RR.recipeID=IR.recipeID
       GROUP BY RR.RecipeID, RC.Total_Time, RR.avg_rate
   )
    SELECT *
       FROM recipe_difficulty RD LEFT JOIN recipes_cleaned RC ON RD.recipeID=RC.recipeID
       WHERE difficulty= '${req.params.difficulty}'
       ORDER BY rating DESC LIMIT 10;`
  console.log(query);
  // const query2 = `SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Ingredients, Directions, Total_Time FROM recipes_cleaned WHERE RecipeID in (SELECT RecipeID FROM (SELECT RecipeID, GROUP_CONCAT(ingredient SEPARATOR 	',') FROM ingredient_recipe GROUP BY RecipeID) X WHERE ingredients LIKE '%${ingredient}%') LIMIT 5;`;
  connection.query(query, function (err, rows, fields) {
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

// function getReceipe3(req, res) {
//   console.log("get recipe by difficulty");
//  console.log(req.params.time);
  
//   const query = `SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Ingredients, Directions, Total_Time
//   FROM recipes_cleaned
//   WHERE Total_Time BETWEEN 0 AND '${req.params.time}'
//   LIMIT 20;`
//   console.log(query);
//   connection.query(query, function (err, rows, fields) {
//     if (err) {
//       res.status(400).json({ error: err.message});
//       console.log("xxx");
//       return;
//     } else {
//       console.log(rows);
//       res.json(rows);
//     }
//   });
// }

function getSingleRecipeIngredients(req, res) {
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
  // console.log(req);
  // console.log("Get a single recipe all Information");
  const id = JSON.parse(req.params.recipeid);
  console.log(id);
  const query = `Select * from recipes_cleaned where RecipeID = "${id}";`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("Get a single recipe all Information fail");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}
function getRecommendBasedonSearchedRecipeAuthorandTime(req, res) {
  // console.log("get Recommend Based on Searched Recipe Author and Time");
  const author = req.params.author;
  const totalTime = req.params.totalTime;
  const lowerbound = parseInt(totalTime) - 80;
  const upperbound = parseInt(totalTime) + 80;
  // console.log(author);
  // console.log(lowerbound);
  // console.log(upperbound);
  const query = `SELECT RecipeID, \`Recipe Name\`, \`Recipe Photo\`, Author, Directions, Total_Time
  FROM recipes_cleaned WHERE Author = '${author}' AND Total_Time BETWEEN '${lowerbound}' AND '${upperbound}' LIMIT 5;`;
  // console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("get Recommend Based on Searched Recipe Author and Time Failed");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}


function getRecommendBaseonSearchRecipeSearchedRecipeIngredients(req, res) {
  // console.log("get Recommend Based on Searched Recipe similar ingredients");
  const id = req.params.id;
  // console.log(id);

  const query = `
  WITH ingredients AS(
    SELECT ingredient
       FROM ingredient_recipe 
       WHERE RecipeID=${id} 
   ), similar_ingredient_num AS(
    SELECT FLOOR(COUNT(*)*0.9) 
       FROM ingredients
   ), similar_recipe AS(
    SELECT RecipeID
    FROM ingredient_recipe
    GROUP BY recipeID
    HAVING COUNT(ingredient in (SELECT * FROM ingredients))>=(SELECT * FROM similar_ingredient_num)
   ), reviews_avg AS(
    SELECT RecipeID, avg(rate) as avg_rate
       FROM reviews_cleaned 
       GROUP BY RecipeID
   )
    SELECT DISTINCT SR.recipeID as ID, SC.\`Recipe Name\` as RecipeName, SC.\`Recipe Photo\` as RecipePhoto, Author, Total_Time
       FROM similar_recipe SR 
      LEFT JOIN recipes_cleaned SC ON SR.recipeID=SC.recipeID
      LEFT JOIN reviews_avg RC ON SR.recipeID=RC.recipeID
    WHERE SR.recipeID!=${id} 
    GROUP BY SR.recipeID, SC.\`Recipe Name\`, SC.\`Recipe Photo\`, RC.avg_rate
       ORDER BY avg_rate DESC LIMIT 10;
  `
  // console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("get Recommend Based on Searched Recipe Author and Time Failed");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}

function getRecommendAuthorsBasedonPopularity(req, res) {
  console.log("get Recommend Authors Based on Popularity");
  const query = `WITH productive_author AS(
    SELECT *
       FROM recipes_cleaned
       GROUP BY author
       HAVING COUNT(*)>=5
   )
   SELECT a.Author, avg(b.Rate) 
   FROM productive_author a JOIN reviews_cleaned b
   ON a.RecipeID = b.RecipeID
   GROUP BY a.Author
   ORDER BY avg(b.Rate) DESC
   LIMIT 20;
  `;
  // console.log(query);
  connection.query(query, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("get Recommend Authors Based on Popularity Fails");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}


function getRecommendRecipebaseOnAuthorChoice(req, res) {
  console.log("get Recommend Recipe base On Author Choice");
  const query = "SELECT a.RecipeID, avg(b.Rate), \`Recipe Name\`, \`Recipe Photo\`, Author, Directions, Total_Time FROM recipes_cleaned a JOIN reviews_cleaned b ON a.RecipeID = b.RecipeID WHERE a.Author = ? GROUP BY a.RecipeID ORDER BY avg(b.Rate) DESC LIMIT 10;"

  const values = [req.params.author];
  console.log(values);
  console.log(query);
  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.log("get Recommend Authors Based on Popularity Fails");
      return;
    } else {
      // console.log(rows);
      res.json(rows);
    }
  });
}



// The exported functions, which can be accessed in index.js.
module.exports = {
  registerAccount: registerAccount,
  loginAccount: loginAccount,
  getReceipe: getReceipe,
  getReceipe2: getReceipe2,
  getSingleRecipeIngredients: getSingleRecipeIngredients,
  getSingleRecipeInfo: getSingleRecipeInfo,
  getRecommendBasedonSearchedRecipeAuthorandTime: getRecommendBasedonSearchedRecipeAuthorandTime,
  getRecommendBaseonSearchRecipeSearchedRecipeIngredients: getRecommendBaseonSearchRecipeSearchedRecipeIngredients,
  getRecommendAuthorsBasedonPopularity: getRecommendAuthorsBasedonPopularity,
  getRecommendRecipebaseOnAuthorChoice: getRecommendRecipebaseOnAuthorChoice
};
