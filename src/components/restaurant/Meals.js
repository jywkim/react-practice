import Meal from "./Meal";

export default class Meals {
    constructor() {
        this.meals = [];
    }

    newMeal(name, ingredients) {
        let m = new Meal(name, ingredients);
        this.meals.push(m);
        return m;
      }

      get allMeals() {
        return this.meals;
      }

      get numberOfMeals() {
          return this.meals.length;
      }
  }