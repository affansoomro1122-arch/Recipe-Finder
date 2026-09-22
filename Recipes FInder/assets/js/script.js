const inputData = document.querySelector("#inputRecipe");
let submit = document.querySelector(".top-row button");
let recipeFlex = document.querySelector(".flex-boxes");
let recipeBOX = document.querySelector(".flex-boxes .recipe-box");

async function getRecipe() {
  const ErrorAlert = document.querySelector("#ErrorAlert");

  if (inputData.value === "") {
    alert("Please Enter Some Recipe Name");
    return;
  }

  const recipeName = inputData.value.trim();
  const recipeURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipeName)}`;

  const response = await fetch(recipeURL);
  const recipe = await response.json();
  let mealsRecipe = recipe.meals;
  console.log(mealsRecipe);

  // Error alert for wrong recipe name
  if (!recipe.meals) {
    ErrorAlert.style.display = "block";
    recipeFlex.style.display = "none";
    inputData.value = "";
  }else{
    ErrorAlert.style.display = "none";
    recipeFlex.style.display = "flex";


  let interator = "";
  mealsRecipe.forEach((e) => {
    interator += `
                      <a href="recipes.html?id=${e.idMeal}" class="recipe-box">
                          <img src="${e.strMealThumb}" alt="" class="img-fluid">
                          <h1 id="">${e.strMeal}</h1>
                      </a>`;
  });
  recipeFlex.innerHTML = interator;
  // inputData.value = "";  
  }
}

submit.addEventListener("click", () => {
  getRecipe();
});
inputData.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getRecipe();
  }
});
