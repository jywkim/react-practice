import React, {Component} from "react";
import "./index.css";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  async componentDidMount() {
    const url = "https://www.balldontlie.io/api/v1/players";
    // const url = "https://www.balldontlie.io/api/v1/players?search=durant";
    let result = null;
    try {
      result = await axios(url, {
        headers: {
          Accept: "application/json"
        }
      })
    } catch(e) {
      console.log(e);
    }
    this.setState({players: result.data.data});
  }

  render(){
    const {players} = this.state;
    let mappedArray = (players).map((players, key) => {
      return(
        <li key={key}>{players.first_name} {players.last_name} {players.height_feet ? players.height_feet + "'" + players.height_inches + '"': ''}</li>
      )
    });

    return (
      <div className="App">
        {mappedArray}
      </div>
    );
  }
}

