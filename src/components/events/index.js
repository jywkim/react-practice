import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ city: "", artist: "" });

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
