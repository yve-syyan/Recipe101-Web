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

- - - - - -  - - - - - -  - - - - - -  - - - - - -  - - - - - - 

In order to connect to our mysql database, we used the following credentials:

 host: "cis550-proj.cwbivagne6aq.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "wenyax",
  password: "rootroot",
  database: "project",


