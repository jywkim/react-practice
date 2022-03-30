import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [value, setValue] = useState({ playerName: "", playerInfo: {}, playerStats: {} });
  const [players, setPlayers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const url = "https://www.balldontlie.io/api/v1/players?per_page=100";
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const loadPlayers = async () => {
      let records = [];
      let page = 0;
      let totalPages = 0;

      do {
          let { data: response }  = await axios.get(url, { params: { page: ++page } });
          totalPages = response.meta.total_pages;
          records = records.concat(response.data);
      } while (page < totalPages);

      console.log(totalPages);
      console.log(records);
      setPlayers(records);
    }
    loadPlayers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      setSubmit(true);
      setCancel(false);
      getPlayerId();
    } else {
      if (!cancel)
        alert("Please type player's name");
    }
  }

 const handleChange = (e) => {
    setCursor(0);
    let text = e.target.value;
    setValue({playerName: text});

    let matches = [];
    if (text.length > 0) {
      matches = players.filter(player => {
        const regex = new RegExp(`${text}`, "gi");
        let playerFullName = player.first_name + ' ' + player.last_name;
        return playerFullName.match(regex);
      });
    }
    console.log(matches);
    setSuggestions(matches);
    setValue({playerName: text});
  }

  const onSuggestHandler = (text) => {
    setValue({playerName: text});
    setSuggestions([]);
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
        setValue({ playerName: value.playerName, playerInfo: res.data.data[0], playerStats: {}});
        await getPlayerStats(res.data.data[0]);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const getPlayerStats = (playerInfo) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerInfo.id}`)
    .then(async res => {
      console.log('getPlayerStats', res.data.data);
      if (res.data.data[0] === undefined) {
        alert("This player is either injured or hasn't played yet this season");
      } else {
        setValue({ playerName: value.playerName, playerInfo: playerInfo, playerStats: res.data.data[0] });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const cancelSearch = () => {
    setCancel(true);
    setSubmit(false);
    document.getElementById("formPlayer").reset();
    setValue({ playerName: "", playerInfo: {}, playerStats: {} });
  }

  const handleBlur = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSuggestions([]);
    }, 100);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      let name = suggestions[cursor].first_name + " " + suggestions[cursor].last_name;
      setValue({playerName: name});
      setSuggestions([]);
    }
  }

  return (
    <div className="container">
      <form 
        id="formPlayer"
        onSubmit={handleSubmit}>
        <input
          className="col-md-8 input"
          name="playerName"
          type="text"
          value={value.playerName}
          onChange={handleChange}
          placeholder="Please enter player's name"
          onBlur={handleBlur}
          onKeyDown={ handleKeyDown }
        >
        </input>
        <button name="submit" value="Submit">Submit</button>
        <button name="cancel" value="Cancel" onClick={cancelSearch}>Cancel</button>
        {suggestions && suggestions.map((suggestion, i) => 
          <div key={i}
              id={i} 
              className={"suggestion col-md-8 justify-content-md-center " + (cursor === i ? "highlight" : null)}
              onMouseDown={() => onSuggestHandler(suggestion.first_name + ' ' + suggestion.last_name)}
          >{suggestion.first_name} {suggestion.last_name}</div>
        )}
      </form><br></br>
      {submit && !cancel && value.playerInfo && (
        <div>
          Player: {value.playerName}<br></br>
          Position: {value.playerInfo["position"]}<br></br>
          Height: {value.playerInfo["height_feet"] ? (value.playerInfo["height_feet"] + "'" + value.playerInfo["height_inches"] + '"') : "N/A"}<br></br>
          {value.playerInfo["team"] && (
          <div>
            Team: {value.playerInfo["team"]["abbreviation"]}<br></br>
            Conference: {value.playerInfo["team"]["conference"]}<br></br>
            Division: {value.playerInfo["team"]["division"]}<br></br>
          </div>
          )}
          <br></br>
        </div>
      )}
      {submit && !cancel && value.playerStats && (
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

