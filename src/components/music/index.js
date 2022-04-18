import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [clientID, setClientID] = useState('');
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token";
  const BACKEND_URL = "http://localhost:8000/music";

  useEffect(() => {
    const getClientId = async () => {
      const response = await axios.get(BACKEND_URL);
      setClientID(response.data)
    }
    getClientId();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          <a href={`${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
        </header>
      </div>
    </div>
  );
}

