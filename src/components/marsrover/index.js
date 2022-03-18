import React from "react";
import "./index.css";
import Matrix from "./Matrix";
import Rover from "./Rover";

export default function App() {
  let grid = new Matrix(10, 10);
  let rover = new Rover(grid, 'N', [0, 0]);
  let commands = 'ZBFFFFRF';
  rover.commands(commands);

  return (
    <div className="App">
      {rover.log.map((entry, index) => (
        <p key={index}>{entry}</p>
      ))}
    </div>
  );
}
