import React from "react";
import Game from './index';

function Tictactoe2P() {
  return (
    <div className="tictactoe2P">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Tic-Tac-Toe 2P</h1>
            < Game />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tictactoe2P;