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
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash)
    {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    const getClientId = async () => {
      const response = await axios.get(BACKEND_URL);
      setClientID(response.data);
    }
    getClientId();
  }, []);

  const logout = () => {
    setToken("");
    setArtists([]);
    window.localStorage.removeItem("token");
  }

  const searchArtists = async (e) => {
    e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items);
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1>Spotify React</h1>
          {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
          : <button onClick={logout}>Logout</button>}

        {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
          </form>  
          : <h2>Please login</h2>
        }
        
        {artists ? renderArtists() : ""}

        </header>
      </div>
    </div>
  );
}

