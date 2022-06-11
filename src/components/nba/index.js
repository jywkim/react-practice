import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css";

export default function App() {
  const [players, setPlayers] = useState([]);
  const urlPlayers = process.env.REACT_APP_PLAYERS_URL;

  useEffect(() => {
    const initializePlayerPool = async () => {
      await axios.get(urlPlayers)
      .then(async resPlayers => {
        if (resPlayers.data) {
          const activePlayers = resPlayers.data.league.standard.filter(p => p.isActive === true);
          setPlayers(activePlayers);
        }
      }).catch(err => {
        console.log(err);
      })
    }

    initializePlayerPool();
  }, [urlPlayers]);

  return (
    <div className="Form">
      <ul>
        {players.map((player, key) =>(
          <li key={key}>{player.firstName + " " + player.lastName}</li>
        ))}
      </ul>
    </div>
  );
}
