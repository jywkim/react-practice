import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ city: "", artist: "" });
  const [events, setEvents] = useState([]);
  const urlEvents = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" + process.env.REACT_APP_TICKETMASTER_CONSUMER_KEY;

  useEffect(() => {
    const loadEvents = async () => {
      const response = await axios.get(urlEvents);
      const events = response.data._embedded.events;
      if (events.length > 0)
        setEvents(events);
    }
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (events.length > 0) console.log(events);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    e.target.city.value = "";
    e.target.artist.value = "";
  };

  const changeValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

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
            onChange={changeValue}/>
        </div>
        <div className="input-group">
          <label htmlFor="test">Artist</label>
          <input 
            type="artist" 
            name="artist" 
            value={value.artist}
            placeholder="Artist" 
            onChange={changeValue}/>
        </div>
        <button className="primary">Enter</button>
      </form>
      {submit && (
        <p>
          Success! {value.city} and {value.artist} entered!
        </p>
      )}
    </div>
  );
}
