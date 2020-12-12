import axios from "axios";
// const APIKey = "abfbeb6ca3a5469eb7333a64ffcad8d2";
const APIKey = "c810d95ec05b49f996767ded24d6e31f";

async function fetchIngredient(ingredient) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${APIKey}&query=${ingredient}&number=1`
    );
    const res = await response.json();
    if (res.results.length > 0 && res.results[0].name === ingredient) {
      const imgHtml = res.results[0].image;
      const imgSrc = `https://spoonacular.com/cdn/ingredients_100x100/${imgHtml}`;
      return imgSrc;
    }

    if (res.results.length > 0 && res.results[0].name === `${ingredient}s`) {
      const imgHtml = res.results[0].image;
      const imgSrc = `https://spoonacular.com/cdn/ingredients_100x100/${imgHtml}`;

      return imgSrc;
    }
  } catch (err) {
    return "https://images.unsplash.com/photo-1517417196127-9ad11f8a8dd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  }
  return "https://images.unsplash.com/photo-1517417196127-9ad11f8a8dd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
}

const getReceipe = async (ingredient) => {
  console.log("getMessage");

  const food = { element: ingredient };
  // const res = await axios.get(`http://localhost:8080/messagetest/`);
  const res = await axios.get(
    `http://localhost:8080/receipebyingredient/${JSON.stringify(food)}`
  );
  return res.data;
};

const getSingleRecipeIngredient = async (recipeID) => {
  const res = await axios.get(
    `http://localhost:8080/foodelements/${JSON.stringify(recipeID)}`
  );
  return res.data;
};
const getSingleRecipeInfo = async (recipeID) => {
  const res = await axios.get(
    `http://localhost:8080/singlerecipeinfo/${JSON.stringify(recipeID)}`
  );
  return res.data;
};
const getRecommendBasedonSearchedRecipeAuthorandTime = async (author, totalTime) => {
  console.log("getRecommendBasedonSearchedRecipeAuthorandTime");
  const res = await axios.get(
    `http://localhost:8080/recommendBasedonSearchedRecipeAuthorandTime/${author}&${totalTime}`

  );
  return res.data;
}
const getRecommendBaseonSearchRecipeSearchedRecipeIngredients = async (id) => {
  console.log("getRecommendBaseonSearchRecipeSearchedRecipeIngredients");
  const res = await axios.get(
    `http://localhost:8080/recommendBasedonSearchedRecipeIngredients/${id}`

  );
  return res.data;
}



// eslint-disable-next-line import/prefer-default-export
export {
  fetchIngredient,
  getReceipe,
  getSingleRecipeIngredient,
  getSingleRecipeInfo,
  getRecommendBasedonSearchedRecipeAuthorandTime,
  getRecommendBaseonSearchRecipeSearchedRecipeIngredients
};
