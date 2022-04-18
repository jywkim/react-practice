import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [clientID, setClientID] = useState('');
  const REDIRECT_URI = "http://localhost:3000/music";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token";
  const BACKEND_URL = "http://localhost:8000/music";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash)
    {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }

    const getClientId = async () => {
      const response = await axios.get(BACKEND_URL);
      setClientID(response.data);
    }
    getClientId();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
          : <button>Logout</button>}
        </header>
      </div>
    </div>
  );
}

