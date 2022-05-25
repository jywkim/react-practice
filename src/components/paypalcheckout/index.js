import React, {useState} from "react";
import "./index.css";
import Payment from "./Payment";
import Items from "./Items";

export default function App() {
  const [checkout, setCheckOut] = useState(false);
  
  return (
    <div className="AppX">
      <Items />

      {checkout ? (
        <Payment />
      ) : (
        <button 
          onClick={() => {
          setCheckOut(true);
        }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}
