import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ city: "", artist: "" });
  const [events, setEvents] = useState([]);
  const urlEvents = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + process.env.REACT_APP_TICKETMASTER_CONSUMER_KEY;

  useEffect(() => {
    // const loadEvents = async () => {
    //   return await fetch(urlEvents)
    //   .then(res =>  res.json())
    //   .then(data => {
    //     const events = data._embedded.events;
    //     if (events.length > 0) setEvents(events);
    //   })
    // };

    const loadEvents = async () => {
      const response = await axios.get(urlEvents);
      const events = response.data._embedded.events;
      if (events.length > 0)
        setEvents(events);
    }
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchEvents(e.target.city.value, e.target.artist.value);
    setSubmit(true);
  };

  const searchEvents = async (city, keyword) => {
    const url = urlEvents + (city.length > 0 ? "&city=" + city : "") + (keyword.length > 0 ? "&keyword=" + keyword : "");
    const response = await axios.get(url);
    if (response.data.hasOwnProperty("_embedded")) {
      const events = response.data._embedded.events;
      if (events.length > 0)
        setEvents(events);
    }
  }

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">City</label>
          <input 
            type="city" 
            name="city" 
            value={value.city}
            placeholder="Toronto" 
            onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label htmlFor="test">Artist</label>
          <input 
            type="artist" 
            name="artist" 
            value={value.artist}
            placeholder="Artist" 
            onChange={handleChange}/>
        </div>
        <button className="primary">Enter</button>
      </form>
      {submit && (
          <ul>
            {events.map((event, key) =>(
              <li key={key}>{event.name} on {event.dates.start.localDate}</li>
            ))}
          </ul>
      )}
    </div>
  );
}
