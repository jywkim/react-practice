import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [cursor, setCursor] = useState(0);
  const [query, setQuery] = useState("");
  const [submit, setSubmit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const repository = ["bread", "broom", "breadsticks", "breadcrumbs", "breakfast", "braised beef"];
  
  const enterQuery = (word) => {
    setQuery(word);
    setSuggestions([]);
  }

  const handleBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  }

 const handleChange = (e) => {
    e.preventDefault();
    setSubmit(false);
    setCursor(0);
    const text = e.target.value;
    const replaceText = text.replace(/([.?*+^$[\]\\(){}|-])/g, '');
    let matches = [];
    if (text.length >= 2) {
      matches = repository.filter(word => {
        const regex = new RegExp(`${replaceText}`, "gi");
        return word.match(regex);
      });
    }
    setSuggestions(matches.sort().slice(0, 3));
    setQuery(text);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      const word = suggestions[cursor] ? (suggestions[cursor]) : "";
      if (word.length) {
        enterQuery(word);
        setSubmit(true);
      }
    }
  }

  const handleMouseDown = (suggestion) => {
    enterQuery(suggestion);
    setSubmit(true);
  }

  const handleMouseOver = (i) => {
    setCursor(i);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="AppX">
        <form
            onSubmit={handleSubmit}
            autoComplete="off">
            <div className="formContainer">
              <div className="inputContainer">
                <input
                  className="col-md-6 input"
                  type="text"
                  value={query}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                >
                </input>
              </div>
              <div className="suggestionsContainer">
                {suggestions && suggestions.map((suggestion, i) =>
                    <div key={i}
                        id={i}
                        className={"suggestion col-md-6 justify-content-md-center " + (cursor === i ? "highlight" : null)}
                        onMouseDown={() => handleMouseDown(suggestion)}
                        onMouseOver={() => handleMouseOver(i)}
                    >
                    {suggestion}
                    </div>
                )}
              </div>
            </div>
          </form>
          <br/>
          {submit && (
            "Selected Query: " +  query
          )}
    </div>
  );
}
