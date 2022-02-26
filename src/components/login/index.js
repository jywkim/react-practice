import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ email: "", test: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.email.value === "admin@test.com" &&
      e.target.password.value === "123456"
    ) {
      setSubmit(true);
      e.target.email.value = "";
      e.target.password.value = "";
    } else {
      alert("Wrong email or password combination");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    alert("Goes to registration page");
  };

  const changeValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            value={value.email}
            placeholder="admin@test.com" 
            onChange={changeValue}/>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="test">Test</label>
          <input 
            type="test" 
            name="test" 
            value={value.test}
            placeholder="test" 
            onChange={changeValue}/>
        </div>
        <button className="primary">Enter</button>
      </form>
      <button className="secondary" onClick={handleClick}>
        Create a new account
      </button>
      {submit && (
        <p>
          Success! {value.email} and {value.test} is valid!
        </p>
      )}
    </div>
  );
}
