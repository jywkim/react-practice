import React from "react";
import "./index.css";
import Meals from "./Meals";

export default function App() {
  //Unique Meals
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

  //Topic Occurences in Reviews
  let topics = {};
  topics["Business specialties"] = ["dessert", "desserts"];
  topics["Price"] = ["low", "high", "price"];
  topics["Michael Bryant"] = ["michael bryant"];
  let reviews = [];
  reviews.push("Michael Bryant was a good host, but I expected more desserts for the price.");
  reviews.push("I loved the desserts, thank you Michael.");
  reviews.push("Very high at 20 dollars per dessert. I rather get from Cheap Desserts.");

  let mapOccurences = {};
  let topicKeys = Object.keys(topics);
  let topicValues = Object.values(topics);
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i].toLowerCase();
    for (let j = 0; j < topicValues.length; j++) {
      if (topicValues[j].some(t => review.includes(t))) {
        if (!mapOccurences[topicKeys[j]]) {
          mapOccurences[topicKeys[j]] = 0;
        }
        mapOccurences[topicKeys[j]]++;
      }
    }
  }

  return (
    <div className="AppX">
        <pre id="json">
          Unique Meals: {counter}
          <br></br>
          {JSON.stringify(meals, null, 4)}
        </pre>
        <br></br><br></br><br></br><br></br>
        <pre id="json">
          Topic Occurences in Reviews:
          <br></br>
          {JSON.stringify(mapOccurences, null, 4)}
          <br></br><br></br>
          Topics:
          <br></br>
          {JSON.stringify(topics, null, 4)}
          <br></br><br></br>
          Reviews:
          <br></br>
          {JSON.stringify(reviews, null, 4)}
        </pre>
        <br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}
