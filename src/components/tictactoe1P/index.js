import React from 'react';
import './index.css';
  
export default class Game extends React.Component {
    render() {
      return (
          <div className="table-container">
            <table className="table-tictactoe">
              <tbody>
                <tr>
                  <td className="cell" id="0"></td>
                  <td className="cell" id="1"></td>
                  <td className="cell" id="2"></td>
                </tr>
                <tr>
                  <td className="cell" id="3"></td>
                  <td className="cell" id="4"></td>
                  <td className="cell" id="5"></td>
                </tr>
                <tr>
                  <td className="cell" id="6"></td>
                  <td className="cell" id="7"></td>
                  <td className="cell" id="8"></td>
                </tr>
              </tbody>
            </table>
          </div>
      );
    }
  }
  