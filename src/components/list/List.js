import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from "uuid"; 

export const List = (props) => {
    const items = props.items;
    const setItems = props.setItems;
    const itemType = props.itemType;
    const data = props.data;

    const handleClick = (e) => {
      const text = prompt('Enter ' + itemType);
      if (text) {
        if (data && !data[text]) {
          alert("Please choose an item from the menu");
        } else {
          setItems(items => [
            ...items,
            { id: uuid(), text },
          ]);
        }
      }
    }

    const handleRemove = (id) => {
      setItems(items =>
        items.filter(item => item.id !== id)
      )
    }

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
                    onClick={() => {handleRemove(id)}}
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
          onClick={(e) => {handleClick(e)}}
        >
          Add {itemType}
        </Button>
      </Container>
    )
}