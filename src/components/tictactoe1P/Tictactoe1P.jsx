import React from "react";
import Game from './index';

function Tictactoe1P() {
  return (
    <div className="tictactoe1P">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Tic-Tac-Toe 1P</h1>
            < Game />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tictactoe1P;