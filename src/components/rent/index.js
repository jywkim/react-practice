import React from "react";
import "./index.css";
import Account from "./Account";

export default function App() {
  //Return rent roll
  const account1 = new Account();
  let rentRoll1 = account1.rentRoll();

  //Return sum of properties rent
  const account2 = new Account();
  account2.addProperty(5000);
  account2.addProperty(500);
  let rentRoll2 = account2.rentRoll();

  //When account is configured for net rent roll, return sum of properties rent minus their expenses
  const account3 = new Account({ grossOrNet: "net" });
  account3.addProperty(5000, 500);
  account3.addProperty(500, 100);
  let rentRoll3 = account3.rentRoll();

  return (
    <div className="App">
      {rentRoll1}<br></br>
      {rentRoll2}<br></br>
      {rentRoll3}<br></br>
    </div>
  );
}
