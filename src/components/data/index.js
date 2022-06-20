import React from 'react';
import "./index.css";

export default function App() {
  const makeCounter = (start = 0) =>
  {
      let currentValue = start;
      let result = {
          value: () => {
              return currentValue;
          },
          increment: () => {
              currentValue++;
              return currentValue;
          },
          decrement: () => {
              currentValue--;
              return currentValue;
          },
      };
      return result;
  }

  let counter = makeCounter(0);
  console.log(counter.value());
  let counter2 = makeCounter(4);
  console.log(counter2.value());
  console.log(counter2.increment());
  console.log(counter2.value());
  counter2.decrement();
  counter2.decrement();
  console.log(counter2.decrement());

  const incrementEvenDecrementOdd = (arr) => {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
          if (i % 2 === 0) {
            newArr.push(arr[i] + 1);
          } else {
            newArr.push(arr[i] - 1);
          }
      }
      return newArr;
  }

  console.log(incrementEvenDecrementOdd([10, 10, 10, 10, 10]));

  const minArgs = (...args) => {
    let min = args[0];
    for (let i = 1; i < args.length; i++) {
      min = Math.min(min, args[i])
    }
    return min;
  }

  console.log(minArgs(1, -6, 78, 12, 45.5, -6.9));

  const group = (collection, grouper) => {
    const obj = {};
    if (typeof grouper !== 'function') {
      return "Grouper is not a function"
    };
    for (let i = 0; i < collection.length; i++) {
      let key = grouper(collection[i]);
      if (!obj[key]) {
        let val = [];
        val.push(collection[i]);
        obj[key] = val;
      } else {
        let existingValues = Object.values(obj[key]);
        existingValues.push(collection[i]);
        obj[key] = existingValues;
      }
    };
    return obj;
  }

  console.log(group([6.5, 4.2, 6.3], Math.floor));

  return (
    <div>
   
    </div>
  );
}
