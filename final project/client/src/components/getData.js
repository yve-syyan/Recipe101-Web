const APIKey = "abfbeb6ca3a5469eb7333a64ffcad8d2";

async function fetchIngredient(ingredient) {
  const response = await fetch(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=${APIKey}&query=${ingredient}&number=1`
  );
  const res = await response.json();
  const imgHtml = res.results[0].image;
  const imgSrc = `https://spoonacular.com/cdn/ingredients_100x100/${imgHtml}`;
  return imgSrc;
}

export { fetchIngredient };
