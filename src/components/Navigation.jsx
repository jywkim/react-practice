import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            React Practice
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tictactoe1P">
                  Tic-Tac-Toe 1P
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tictactoe2P">
                  Tic-Tac-Toe 2P
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/excelexport">
                  Excel-Export
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/counter">
                  Counter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/restaurant">
                  Restaurant
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/marsrover">
                  Mars Rover
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nba">
                  NBA
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rent">
                  Rent
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/music">
                  Music
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todo">
                  To Do
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;