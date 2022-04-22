import React from "react";
import App from './index';

function Todo() {
  return (
    <div className="todo">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">To Do</h1>
            < App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;