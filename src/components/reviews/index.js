import React, { useState, useEffect, useMemo } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from "uuid"; 
import "./index.css";

export default function App() {
  const [topicOccurrences, setTopicOccurrences] = useState([]);

  const [reviews, setReviews] = useState([
    { id: uuid(), text: "Michael Bryant was a good host, but I expected more desserts for the price." },
    { id: uuid(), text: "I loved the desserts, thank you Michael." },
    { id: uuid(), text: "Very high at 20 dollars per dessert. I rather get from Cheap Desserts." },
  ]);

  const topics = useMemo(() => {
    return {
      "Business specialties" : ["dessert", "desserts"],
      "Price" : ["low", "high", "price"],
      "Michael Bryant" : ["michael bryant"],
    };
  }, []);

  useEffect(() => {
    const checkTopicOccurrences = () => {
      const arrayReviews = reviews.map(i => i.text);
      let mapOccurences = {};
      let topicKeys = Object.keys(topics);
      let topicValues = Object.values(topics);
      for (let i = 0; i < arrayReviews.length; i++) {
        let review = arrayReviews[i].toLowerCase();
        for (let j = 0; j < topicValues.length; j++) {
          if (topicValues[j].some(t => review.includes(t))) {
            if (!mapOccurences[topicKeys[j]]) {
              mapOccurences[topicKeys[j]] = 0;
            }
            mapOccurences[topicKeys[j]]++;
          }
        }
      }
      var arrayOccurences = Object.keys(mapOccurences).map((key) => [key, mapOccurences[key]]);
      setTopicOccurrences(arrayOccurences);
    }

    checkTopicOccurrences();
  }, [reviews, topics]);

  const handleClick = (e) => {
    const text = prompt('Enter a review');
    if (text) {
      setReviews(reviews => [
        ...reviews,
        { id: uuid(), text },
      ]);
    }
  }

  const handleRemove = (id) => {
    setReviews(reviews =>
      reviews.filter(review => review.id !== id)
    )
  }

  return (
    <div>
      Topic Occurrences:
      <ul>
        {topicOccurrences.map((topic, key) =>(
          <li key={key}>{topic[0]}: {topic[1]}</li>
        ))}
      </ul>
      <Container style={{ marginTop: '2rem' }}>
        <ListGroup style={{ marginBottom: '1rem' }}>
          <TransitionGroup className="todo-list">
            {reviews.map(({ id, text }) => (
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
          Add Review
        </Button>
      </Container>
    </div>
  );
}
