import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from "uuid"; 
import "./index.css";

export default function App() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'lifejacket' },
    { id: uuid(), text: 'paddle' },
    { id: uuid(), text: 'paddle' },
    { id: uuid(), text: 'boat' },
    { id: uuid(), text: 'lifejacket' },
    { id: uuid(), text: 'boat' },
  ]);

  useEffect(() => {
    const secret = [['paddle', 'paddle'], ['boat', 'wildcard', 'boat']];

    const checker = (arr, target) => target.every(v => arr.includes(v));

    const checkWinner = () => {
      let result = items.map(i => i.text);
      console.log(checker(result, secret[0]));
    }

    checkWinner();
  }, [items]);

  return (
   <Container style={{ marginTop: '2rem' }}>
      <ListGroup style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="todo-list">
          {items.map(({ id, text }) => (
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
                    setItems(items =>
                      items.filter(item => item.id !== id)
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
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems(items => [
              ...items,
              { id: uuid(), text },
            ]);
          }
        }}
      >
        Add Item
      </Button>
    </Container>
  );
}
