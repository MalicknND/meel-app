// https://www.themealdb.com/api/json/v1/1/search.php?s=tomato

const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

// on crée un tableau vide pour stocker les données
let meals = [];

async function fetchMeals(search) {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
}

// cette fonction permet d'afficher les ingredients
function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = `<li class="card">Aucun résultat</li>`;
  } else {
    meals.length = 12;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];
        // on boucle sur les ingredients pour les afficher dans une liste à puces
        for (i = 0; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient}  ${measure}</li>`);
          }
        }
        console.log(ingredients);
        return `
            
            <li class="card">
            <h2>${meal.strMeal}</h2>   
            <p>${meal.strArea}</p> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <ul>${ingredients.join("")}</ul>
            </li>
            `;
      })
      .join("");
  }
}

// cette fonction permet d'afficher les ingredients
input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
