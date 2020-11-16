var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre
    FROM Genres;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var query = `
    SELECT M.title, M.rating, M.vote_count
    FROM Movies M JOIN Genres G ON M.id = G.movie_id
    WHERE G.genre = '${req.params.genre}' ORDER BY M.rating desc, M.vote_count desc
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var query =  `
    WITH chosenMovie AS (
    SELECT id
    FROM Movies
    WHERE title = '${req.params.recmovies}'
    ),
    Num AS (
    SELECT COUNT(*) AS count
    FROM Genres G JOIN chosenMovie CM ON G.movie_id = CM.id
    ),
    RES AS(
    SELECT M.title, M.id, M.rating, M.vote_count, COUNT(*) as genresNum, N.count AS count 
    FROM Num N, Movies M JOIN Genres G ON M.id = G.movie_id 
    WHERE (G.genre IN (
    SELECT DISTINCT G.genre
    FROM Genres G JOIN chosenMovie CM ON G.movie_id = CM.id
    )) AND (M.title != '${req.params.recmovies}')
    GROUP BY M.title, M.id, M.rating, M.vote_count, N.count
    Having genresNum >= N.count
    ORDER BY M.rating desc, vote_count desc
    LIMIT 5
    )
    SELECT R.title, R.id, R.rating, R.vote_count
    FROM RES R;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var query = `
  WITH decadeMovie AS(
    SELECT id, rating
    FROM Movies M
    WHERE M.release_year >= ${req.params.decade} AND M.release_year < ${req.params.decade}+10
    )
    SELECT G.genre, IFNULL(AVG(DM.rating), 0) AS avg_rating
    FROM Genres G LEFT JOIN decadeMovie DM ON DM.id = G.movie_id
    GROUP BY G.genre
    ORDER BY avg_rating desc, genre;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}