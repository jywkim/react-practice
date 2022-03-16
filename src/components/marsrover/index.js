import React from "react";
import "./index.css";
import Matrix from "./Matrix";
import Rover from "./Rover";

export default function App() {
  let rover = new Rover('N', [0, 0]);
  let grid = new Matrix();
  let matrix = grid.createMatrix(10, 10);
  rover.commands('rrfflffb');
  console.log(rover.log);
  matrix[rover.position[0]][rover.position[1]] = 'rover';
  console.log(matrix);

  return (
    <div className="App">
      {rover.log.map((entry, index) => (
        <p key={index}>{entry}</p>
      ))}
    </div>
  );
}
