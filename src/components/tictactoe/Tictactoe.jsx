import React from "react";
import Game from './index';

function Tictactoe() {
  return (
    <div className="tictactoe">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Tic-Tac-Toe</h1>
            <p>
              < Game />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tictactoe;