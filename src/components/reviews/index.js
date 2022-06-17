import React, { useState, useEffect, useMemo } from 'react';
import {v1 as uuid} from "uuid"; 
import "./index.css";
import {List} from '../list/List';

export default function App() {
  const [topicOccurrences, setTopicOccurrences] = useState([]);

  const [reviews, setReviews] = useState([
    { id: uuid(), text: "Michael Bryant was a good host, but I expected more desserts for the price." },
    { id: uuid(), text: "I loved the desserts, thank you Michael." },
    { id: uuid(), text: "Very high at 20 dollars per dessert. I rather get from Cheap Desserts." },
    { id: uuid(), text: "This place was absolutely awful! Poor service!" },
  ]);

  const topics = useMemo(() => {
    return {
      "Business specialties" : ["dessert", "desserts"],
      "Price" : ["low", "high", "price"],
      "Michael Bryant" : ["michael bryant"],
      "Negative" : ["bad", "poor", "awful"],
    };
  }, []);

  useEffect(() => {
    const checkTopicOccurrences = () => {
      const arrayReviews = reviews.map(i => i.text);
      const mapOccurences = {};
      const topicKeys = Object.keys(topics);
      const topicValues = Object.values(topics);
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
      const arrayOccurences = Object.keys(mapOccurences).map((key) => [key, mapOccurences[key]]);
      setTopicOccurrences(arrayOccurences);
    }

    checkTopicOccurrences();
  }, [reviews, topics]);

  return (
    <div>
      Topic Occurrences in Reviews:
      <ul>
        {topicOccurrences.map((topic, key) =>(
          <li key={key}>{topic[0]}: {topic[1]}</li>
        ))}
      </ul>
      <List 
        className="list" 
        items={reviews}
        setItems={setReviews}
        itemType={'review'}
      />
    </div>
  );
}
