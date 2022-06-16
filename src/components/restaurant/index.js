import React, { useState, useEffect, useMemo } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from "uuid"; 
import "./index.css";

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

  //Topic Occurences in Reviews
  // let topics = {};
  // topics["Business specialties"] = ["dessert", "desserts"];
  // topics["Price"] = ["low", "high", "price"];
  // topics["Michael Bryant"] = ["michael bryant"];
  // let reviews = [];
  // reviews.push("Michael Bryant was a good host, but I expected more desserts for the price.");
  // reviews.push("I loved the desserts, thank you Michael.");
  // reviews.push("Very high at 20 dollars per dessert. I rather get from Cheap Desserts.");

  // let mapOccurences = {};
  // let topicKeys = Object.keys(topics);
  // let topicValues = Object.values(topics);
  // for (let i = 0; i < reviews.length; i++) {
  //   let review = reviews[i].toLowerCase();
  //   for (let j = 0; j < topicValues.length; j++) {
  //     if (topicValues[j].some(t => review.includes(t))) {
  //       if (!mapOccurences[topicKeys[j]]) {
  //         mapOccurences[topicKeys[j]] = 0;
  //       }
  //       mapOccurences[topicKeys[j]]++;
  //     }
  //   }
  // }

  const handleClick = (e) => {
    const text = prompt('Enter a meal');
    if (text) {
      if (menu[text]) {
        setMeals(meals => [
          ...meals,
          { id: uuid(), text },
        ]);
      } else {
        alert("Please choose an item from the menu");
      }
    }
  }

  return (
    <div>
      <p>Unique Meals: {uniqueMeals}</p>
      <Container style={{ marginTop: '2rem' }}>
        <ListGroup style={{ marginBottom: '1rem' }}>
          <TransitionGroup className="todo-list">
            {meals.map(({ id, text }) => (
              <CSSTransition
                key={id}
                timeout={500}
                classNames="item"
              >
                <ListGroup.Item>
                  <Button
                    className="remove-btn"
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      setMeals(meals =>
                        meals.filter(meal => meal.id !== id)
                      )
                    }
                  >
                    &times;
                  </Button>
                  {text}
                </ListGroup.Item>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Add Meal
        </Button>
      </Container>
    </div>
  );
}
