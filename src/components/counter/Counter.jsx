import React from "react";
import App from './App';

function Counter() {
  return (
    <div className="counter">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Counter</h1>
            < App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;