import React, { useState, useEffect } from 'react';
import {v1 as uuid} from "uuid"; 
import "./index.css";
import {List} from '../list/List';

export default function App() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'lifejacket' },
    { id: uuid(), text: 'paddle' },
    { id: uuid(), text: 'paddle' },
    { id: uuid(), text: 'boat' },
    { id: uuid(), text: 'lifejacket' },
  ]);

  useEffect(() => {
    const secret = [['paddle', 'paddle'], ['boat', 'wildcard', 'boat']];

    const arrArr = (haystack, needle) => {
        let matchingArray = [];
        for (let i = 0; i < haystack.length; i++) {
          for (let j = 0; j < needle.length; j++) {
            if (haystack[i] === needle[j]) {
              matchingArray.push(haystack[i]);
              break;
            } else if (haystack[i] !== needle[j] && matchingArray.length && needle[j] === 'wildcard') {
              matchingArray.push('wildcard');
              break;
            }
          }
        }
        return matchingArray;
    };

    const checkWinner = () => {
      let itemsArray = items.map(i => i.text);
      for (let i = 0; i < secret.length; i++) {
        if (JSON.stringify(secret[i]) !== JSON.stringify(arrArr(itemsArray, secret[i]))) {
          return false;
        }
      }
      return true;
    }

    if (checkWinner()) alert("WINNER!");
  }, [items]);

  return (
    <List 
      className="list" 
      items={items}
      setItems={setItems}
      itemType={'item'}
    />
  );
}
