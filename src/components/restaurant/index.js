import React from "react";
import "./index.css";
import Meals from "./Meals";

export default function App() {
  let meals = new Meals();
  meals.newMeal("Big Mac", ["Bun", "Cheese", "Onion", "Beef"]);
  meals.newMeal("McChicken", ["Bun", "Lettuce", "Mayo", "Chicken"]);
  meals.newMeal("Filet-O-Fish", ["Bun", "Cheese", "Tartar Sauce", "Fish"]);
  meals.newMeal("Quarter Pounder", ["Onion", "Beef", "Cheese", "Bun"]);

  return (
    <div className="AppX">
        <pre id="json">
          {JSON.stringify(meals, null, 4)}
        </pre>
    </div>
  );
}
