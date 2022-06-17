import React, { useState } from 'react';
import {v1 as uuid} from "uuid"; 
import "./index.css";
import {List} from '../list/List';

export default function App() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'Buy eggs' },
    { id: uuid(), text: 'Pay bills' },
    { id: uuid(), text: 'Invite friends over' },
    { id: uuid(), text: 'Fix the TV' },
  ]);

  return (
    <List 
      className="list" 
      items={items}
      setItems={setItems}
      itemType={'item'}
    />
  );
}
