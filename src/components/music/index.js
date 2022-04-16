import React from "react";
import "./index.css";

export default function App() {
  const CLIENT_ID = "clientid";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token";

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
        </header>
      </div>
      Music
    </div>
  );
}

