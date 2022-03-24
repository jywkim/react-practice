import React, {Component} from "react";
import "./index.css";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName : null,
      playerStats: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.length !== 0) {
      this.getPlayerId();
    } else {
      alert("Please type player's name");
    }
  }

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0) {
      this.setState({playerName: replace});
    }
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      if (res.data.data[0] === undefined) {
        alert("This player does not exist");
      } else if (res.data.data.length > 1) {
        alert("Please specify the name more");
      } else {
        await this.getPlayerStats(res.data.data[0].id);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`)
    .then(async res => {
      if (res.data.data[0] === undefined) {
        alert("This player is either injured or hasn't played yet this season");
      } else {
        this.setState({ playerStats: res.data.data[0] });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  cancelSearch = () => { 
    document.getElementById("formPlayer").reset();
    this.setState({ playerStats: {} });
  }

  render(){
    return (
      <div className="App">
        <form 
          id="formPlayer"
          onSubmit={this.handleSubmit}>
          <input
            id="inputPlayer"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Please enter player's name"
          >
          </input>
          <input type="submit" name="submit" value="Submit"></input>
          <input type="button" name="cancel" value="Cancel" onClick={this.cancelSearch}></input>
        </form><br></br>
        GP: {this.state.playerStats["games_played"]}<br></br>
        PPG: {this.state.playerStats["pts"]}<br></br>
        RPG: {this.state.playerStats["reb"]}<br></br>
        SPG: {this.state.playerStats["stl"]}<br></br>
        BPG: {this.state.playerStats["blk"]}<br></br>
        FG%: {this.state.playerStats["fg_pct"] }<br></br>
        3P%: {this.state.playerStats["fg3_pct"]}<br></br>
        TPG: {this.state.playerStats["turnover"]}

      </div>
    );
  }
}

