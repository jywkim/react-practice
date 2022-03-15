import React from "react";
import "./index.css";
import Matrix from "./Matrix";
import Rover from "./Rover";

export default function App() {
  let rover = new Rover('N', [0, 0]);
  let grid = new Matrix();
  let matrix = grid.createMatrix(10, 10);
  console.log(rover.direction);
  console.log(rover.position);
  console.log(matrix);

  return (
    <div className="App">

    </div>
  );
}
