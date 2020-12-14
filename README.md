# RecipeRec.com Project Outline

## Motivation and Problems Solved
Due to the unexpected rise of COVID-19 in Feb 2020, people all over the world had to choose to spend a large portion of their time at home. This phenomenon caused more and more people, especially females, to try various food recipes online to get relaxed during the WFH period. Also, cooking can become a new common topic to help them maintain their social activities and get the sense of belonging.	

According to our observation, we found that users of recipe-recommendation websites drastically increased during the past few months. Thus, we choose the food recipe website as a focus of our project. Instead of covering all recipes online, we will study bakery recipes in particular, since it is by far the most popular category and has quite a lot of data to deal with. 

## Data Sources

1. [Recipe Ingredients](https://www.kaggle.com/kanaryayi/recipe-ingredients-and-reviews?select=clean_recipes.csv) 
2. [Recipe Reviews](https://www.kaggle.com/kanaryayi/recipe-ingredients-and-reviews?select=reviews.csv)
3. [Spoonacular API](https://spoonacular.com/food-api/docs#Search-Recipes-Complex)

## ERD

## Data Preperation


## Instruction for building it Locally

In order to run the app locally, 

Server:
Start the server first. Go to /final project/server. Then, type npm install, and then npm start. You will see  the message "Server listening on PORT 8080" if the server started successfully.

Front end:
Go to /final project/client and type 'npm install'. Then, type 'npm start' and use 
localhost:3000/login to access our website. 

You can use the username and password we provided or create a new one by going the register page
username: Lihanz
passwaord: abc123

NOTE:

If you counter a problem with the project dependency tree. For me, I previously installed a differernt version of  eslint locally, this might cause the problem. Simply go to /final project/client/node_modules/eslint and delete the file (or other conflict files you might have), then run "npm start" again.

## Depencies:
Client:
"@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/lab": "^4.0.0-alpha.56",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "antd": "^3.26.20",
    "axios": "^0.21.0",
    "bootstrap": "^4.4.1",
    "bootstrap-icons": "^1.1.0",
    "clsx": "^1.1.1",
    "jquery": "^3.5.1",
    "material-ui": "^0.20.2",
    "materialize-css": "^1.0.0-rc.2",
    "mdbootstrap": "^4.19.1",
    "mocha": "^7.2.0",
    "popper.js": "^1.16.1",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-bootstrap": "^1.0.0-beta.16",
    "react-dom": "^16.12.0",
    "react-dropdown": "^1.6.4",
    "react-router-dom": "^5.1.2",
    "react-script": "^2.0.5",
    "react-scripts": "^3.4.0",
    "selenium-webdriver": "^4.0.0-alpha.5"

Server:
 "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mysql": "^2.17.1"

- - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - - 

In order to connect to our mysql database, we used the following credentials:

 host: "cis550-proj.cwbivagne6aq.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "wenyax",
  password: "rootroot",
  database: "project",


