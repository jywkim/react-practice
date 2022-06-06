import React, {useState} from "react";
import "./index.css";

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ foundation: "", floor: "", wall: "", roof: ""});

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <div className="App">
     <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Foundation</label>
          <input 
            type="foundation" 
            name="foundation" 
            value={value.foundation}
            placeholder="Foundation" 
            onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label htmlFor="test">Floor</label>
          <input 
            type="floor" 
            name="floor" 
            value={value.floor}
            placeholder="Floor" 
            onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label htmlFor="test">Wall</label>
          <input 
            type="wall" 
            name="wall" 
            value={value.wall}
            placeholder="Wall" 
            onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label htmlFor="test">Roof</label>
          <input 
            type="roof" 
            name="roof" 
            value={value.roof}
            placeholder="Roof" 
            onChange={handleChange}/>
        </div>
        <button className="primary">Enter</button>
      </form>
      {submit && (
        <p>
          Foundation: {value.foundation}<br/>
          Floor: {value.floor}<br/>
          Wall: {value.wall}<br/>
          Roof: {value.roof}<br/>
        </p>
      )}
    </div>
  );
}
