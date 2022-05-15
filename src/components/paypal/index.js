import React, {useState} from "react";
import "./index.css";
import Payment from "./Payment";

export default function App() {
  const [checkout, setCheckOut] = useState(false);
  
  return (
    <div className="AppX">
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
