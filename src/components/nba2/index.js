import React, { useEffect, useState } from "react";
import "./index.css";
import axios from 'axios';

export default function App() {
  const [submit, setSubmit] = useState(false);
  const [value, setValue] = useState({ playerName: "", playerInfo: {}, teamInfo: {} });
  const [players, setPlayers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const urlPlayers = "https://data.nba.net/data/10s/prod/v1/2021/players.json";
  const urlTeams = "https://data.nba.net/data/10s/prod/v1/2021/teams.json";
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const loadPlayers = async () => {
      const response = await axios.get(urlPlayers);
      console.log(response.data.league.standard);
      setPlayers(response.data.league.standard);
    }
    loadPlayers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      setSubmit(true);
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
        let playerFullName = player.firstName + ' ' + player.lastName;
        return playerFullName.match(regex);
      });
    }
    setSuggestions(matches);
    setValue({playerName: text});
  }

  const onSuggestHandler = (suggestion, i) => {
    let name = suggestion.firstName + ' ' + suggestion.lastName;
    setValue({playerName: name, playerInfo: suggestions[i]});
    getTeamInfo(suggestions[i])
    setSuggestions([]);
    setSubmit(true);
  }

  const getTeamInfo = (player) => {
    axios.get(urlTeams)
    .then(async res => {
      let team = res.data.league.standard.find(x => x.teamId === player.teamId);
      setValue({ playerName: player.firstName + ' ' + player.lastName, playerInfo: player, teamInfo: team });
    }).catch(err => {
      console.log(err);
    })
  }

  const getAge = (dateOfBirth) => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;  
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
      let name = suggestions[cursor] ? (suggestions[cursor].firstName + " " + suggestions[cursor].lastName) : "";
      if (name.length) {
        setValue({playerName: name, playerInfo: suggestions[cursor]});
        getTeamInfo(suggestions[cursor])
        setSuggestions([]);
      }
    }
  }

  return (
    <div className="container">
      <form 
        id="formPlayer"
        onSubmit={handleSubmit}
        autoComplete="off">
        <input
          className="col-md-12 input"
          name="playerName"
          type="text"
          value={value.playerName}
          onChange={handleChange}
          placeholder="Please enter player's name"
          onBlur={handleBlur}
          onKeyDown={ handleKeyDown }
        >
        </input>
        {suggestions && suggestions.map((suggestion, i) => 
          <div key={i}
              id={i} 
              className={"suggestion col-md-12 justify-content-md-center " + (cursor === i ? "highlight" : null)}
              onMouseDown={() => onSuggestHandler(suggestion, i)}
          >{suggestion.firstName} {suggestion.lastName}</div>
        )}
      </form>
      
      <br></br>
      
      {submit && value.playerInfo && value.teamInfo && (
        <div>

          <table>
            <tbody>
            <tr>
              <th className="cellHeader">PLAYER</th>
              <th className="cellHeader">TEAM</th>
              <th className="cellHeader">CONF</th>
              <th className="cellHeader">DIV</th>
              <th className="cellHeader">POS</th>
              <th className="cellHeader">HT</th>
              <th className="cellHeader">AGE</th>
              <th className="cellHeader">#</th>
            </tr>
            </tbody>
            <tbody>
            <tr>
              <td className="cellSingle cellLong">
                {value.playerName}
              </td>
              <td className="cellSingle cellSmall">
                {value.teamInfo["tricode"]}
              </td>
              <td className="cellSingle cellSmall">
                {value.teamInfo["confName"]}
              </td>
              <td className="cellSingle cellSmall">
                {value.teamInfo["divName"]}
              </td>
              <td className="cellSingle cellSmall">
                {value.playerInfo["pos"]}
              </td>
              <td className="cellSingle cellSmall">
                {value.playerInfo["heightFeet"] ? (value.playerInfo["heightFeet"] + "'" + value.playerInfo["heightInches"] + '"') : "N/A"}
              </td>
              <td className="cellSingle cellSmall">
                {getAge(value.playerInfo["dateOfBirthUTC"])}
              </td>
              <td className="cellSingle cellSmall">
                {value.playerInfo["jersey"]}
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

