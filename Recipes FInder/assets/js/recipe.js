let container = document.getElementsByClassName("container");
const id = new URLSearchParams(window.location.search).get("id");
let mainData = "";
let recipeTable = document.getElementById("recipeTable");

if (!id) {
  container.innerHTML = `<h1>Data Not Found</h1>`;
  console.log("Data Not Found");
} else {
  addRecipe(id);
}

async function addRecipe(id) {
  // getting html from file
  let headingMain = document.querySelector("#recipeBox h2");
  let location = document.querySelector("#recipeBox h5 span");
  let recipeImage = document.querySelector("#recipeImage");
  let details = document.querySelector("#makingInfo #makingInfoPara");
  let makingVideo = document.querySelector("#makingVideo");

  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  let data = await res.json();
  mainData = data.meals[0];
  console.log(mainData);

  // add data in design
  headingMain.innerHTML = mainData.strMeal;
  location.innerHTML = mainData.strCountry;
  recipeImage.style.backgroundImage = `url("${mainData.strMealThumb}")`;
  details.innerHTML = mainData.strInstructions;

  if (!mainData.strYoutube) {
    makingVideo.innerHTML = `
                <a href="" style="background-color: red !important;">Video is Not Found on Youtube <i class="fa-brands fa-youtube"></i></a>
            `;
  } else {
    makingVideo.innerHTML = `
                <a href="${mainData.strYoutube}">Watch the Making Video on Youtube <i class="fa-brands fa-youtube"></i></a>
            `;
  }
  let nameVal = mainData.strIngredient1;
  console.log(nameVal);

  
const intgValue = getIngredients(mainData);
let updateValue = "";
intgValue.map((e)=>{
    updateValue += `<div class="tbCol">${e.name}: <span>${e.measure}</span></div>`;
})
recipeTable.innerHTML = updateValue;



}

function getIngredients(mainData) {
  let list = [];
  for (let i = 1; i <= 20; i++) {
    let name = mainData[`strIngredient${i}`];
    let measure = mainData[`strMeasure${i}`];
    if(name && name.trim()){
        list.push({
            name: name.trim(),
            measure: (measure || "").trim()
        });
    };
  }
  return list;
}



