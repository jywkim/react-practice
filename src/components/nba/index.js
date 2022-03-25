import React, { useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ playerName: "", playerStats: {} });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      setSubmit(true);
      getPlayerId();
    } else {
      alert("Please type player's name");
    }
  }

 const handleChange = (e) => {
    setValue({playerName: e.target.value});
  }

  const getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${value.playerName}`)
    .then(async res => {
      console.log('getPlayerId', res.data.data);
      if (res.data.data[0] === undefined) {
        alert("This player does not exist");
      } else if (res.data.data.length > 1) {
        alert("Please specify the name more");
      } else {
        await getPlayerStats(res.data.data[0].id);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`)
    .then(async res => {
      console.log('getPlayerStats', res.data.data);
      if (res.data.data[0] === undefined) {
        alert("This player is either injured or hasn't played yet this season");
      } else {
        setValue({ playerName: value.playerName, playerStats: res.data.data[0] });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const cancelSearch = () => { 
    document.getElementById("formPlayer").reset();
    setValue({ playerName: "", playerStats: {} });
  }

  return (
    <div className="App">
      <form 
        id="formPlayer"
        onSubmit={handleSubmit}>
        <input
          id="inputPlayer"
          name="playerName"
          type="text"
          value={value.playerName}
          onChange={handleChange}
          placeholder="Please enter player's name"
        >
        </input>
        <button name="submit" value="Submit">Submit</button>
        <button name="cancel" value="Cancel" onClick={cancelSearch}>Cancel</button>
      </form><br></br>
      {submit && value.playerStats && (
        <div>
          GP: {value.playerStats["games_played"]}<br></br>
          PPG: {value.playerStats["pts"]}<br></br>
          RPG: {value.playerStats["reb"]}<br></br>
          APG: {value.playerStats["ast"]}<br></br>
          SPG: {value.playerStats["stl"]}<br></br>
          BPG: {value.playerStats["blk"]}<br></br>
          FG%: {value.playerStats["fg_pct"] }<br></br>
          3P%: {value.playerStats["fg3_pct"]}<br></br>
          TPG: {value.playerStats["turnover"]}
        </div>
      )}
    </div>
  );
}

