const container = document.getElementById("recipe-container");
const id = new URLSearchParams(window.location.search).get("id");

if (!id) {
    container.innerHTML = `<p>No recipe selected. <a href="index.html">Go back</a></p>`;
} else {
    loadRecipe(id);
}

async function loadRecipe(id) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();

        if (!data.meals) {
            container.innerHTML = `<p>Recipe not found.</p>`;
            return;
        }

        render(data.meals[0]);
    } catch (err) {
        container.innerHTML = `<p>Something went wrong. Try again.</p>`;
    }
}

function render(meal) {
    const ingredients = getIngredients(meal);
    const steps = meal.strInstructions.split(/\r?\n/).filter(s => s.trim());
    const youtubeId = getYoutubeId(meal.strYoutube);

    container.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <p class="meta">${meal.strCategory} · ${meal.strArea}</p>

        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="hero">

        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(i => `<li>${i.measure} ${i.name}</li>`).join("")}
        </ul>

        <h2>Instructions</h2>
        <ol>
            ${steps.map(s => `<li>${s}</li>`).join("")}
        </ol>

        ${youtubeId ? `
            <h2>Video</h2>
            <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${youtubeId}"
                frameborder="0" allowfullscreen></iframe>
        ` : ""}
    `;
}

function getIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (name && name.trim()) {
            list.push({ name: name.trim(), measure: (measure || "").trim() });
        }
    }
    return list;
}

function getYoutubeId(url) {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
}