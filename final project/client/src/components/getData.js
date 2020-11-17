import axios from "axios";
// const APIKey = "abfbeb6ca3a5469eb7333a64ffcad8d2";
const APIKey = "c810d95ec05b49f996767ded24d6e31f";

async function fetchIngredient(ingredient) {
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
  return 0;
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

// eslint-disable-next-line import/prefer-default-export
export { fetchIngredient, getReceipe };
