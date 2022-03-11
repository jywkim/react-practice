import React from "react";
import "./index.css";
import Meals from "./Meals";

export default function App() {
  let meals = new Meals();
  meals.newMeal("Big Mac", ["Bun", "Cheese", "Onion", "Beef"]);
  meals.newMeal("McChicken", ["Bun", "Lettuce", "Mayo", "Chicken"]);
  meals.newMeal("Filet-O-Fish", ["Bun", "Cheese", "Tartar Sauce", "Fish"]);
  meals.newMeal("Quarter Pounder", ["Onion", "Beef", "Cheese", "Bun"]);

  let arrayMeals = meals.meals;
  let mealsLen = arrayMeals.length;
  let map = {};
  let ingredients = "";
  let counter = 0;
  for (let i = 0; i < mealsLen; i++) {
    ingredients = arrayMeals[i].ingredients.sort().join("");
    if (!map[ingredients]) {
      map[ingredients] = 0;
    }
    map[ingredients]++;
  } 
  let recipes = Object.values(map);
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i] === 1) {
      counter++;
    }
  }

  return (
    <div className="AppX">
        <pre id="json">
          Unique Meals: {counter}
          <br></br><br></br>
          {JSON.stringify(meals, null, 4)}
        </pre>
    </div>
  );
}
