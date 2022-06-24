import React from 'react';
import "./index.css";
import { Item } from './Item';

export default function App() {
  const fruits = ["apple", "banana", "orange"];

  return (
    <div>
      <ul>
        {fruits.map((fruit, key) => (
          <React.Fragment key={key}>
            <Item item={fruit}/>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
