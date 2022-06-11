import React from "react";
import App from './index';

function NBA() {
  return (
    <div className="nba">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-10">
            <h1 className="font-weight-light">NBA</h1>
            < App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NBA;