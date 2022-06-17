import React, { useState, useEffect, useMemo } from 'react';
import {v1 as uuid} from "uuid"; 
import "./index.css";
import {List} from '../list/List';

export default function App() {
  const [uniqueMeals, setUniqueMeals] = useState(0);

  const [meals, setMeals] = useState([
    { id: uuid(), text: "Big Mac" },
    { id: uuid(), text: "McChicken" },
    { id: uuid(), text: "Filet-O-Fish" },
    { id: uuid(), text: "Quarter Pounder"},
  ]);

  const menu = useMemo(() => {
    return {
      "Big Mac" : ["Bun", "Cheese", "Onion", "Beef"],
      "McChicken" : ["Bun", "Lettuce", "Mayo", "Chicken"],
      "Filet-O-Fish" : ["Bun", "Cheese", "Tartar Sauce", "Fish"],
      "Quarter Pounder" : ["Onion", "Beef", "Cheese", "Bun"],
      "McRib" : ["Pork", "Onion", "Pickle", "Bun"],
      "Sausage 'N Egg McMuffin" : ["Sausage", "Egg", "Cheese", "English Muffin"],
    };
  }, []);

  useEffect(() => {
    const checkUniqueMeals = () => {
      const arrayMeals = meals.map(i => i.text);
      const map = {};
      let ingredients = "";
      let counter = 0;
      for (let i = 0; i < meals.length; i++) {
        ingredients = menu[arrayMeals[i]].sort().join("");
        if (!map[ingredients]) {
          map[ingredients] = 0;
        }
        map[ingredients]++;
      } 
      let recipes = Object.values(map);
      for (let i = 0; i < recipes.length; i++) {
        counter++;
      }
      setUniqueMeals(counter);
    }

    checkUniqueMeals();
  }, [meals, menu]);

  return (
    <div>
      <p>Unique Meals: {uniqueMeals}</p>
      <List 
        className="list" 
        items={meals}
        setItems={setMeals}
        itemType={'meal'}
        data={menu}
      />
    </div>
  );
}
