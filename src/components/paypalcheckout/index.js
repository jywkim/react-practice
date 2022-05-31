import React, {useState} from "react";
import "./index.css";
import Payment from "./Payment";
import Items from "./Items";

export default function App() {
  const [checkout, setCheckOut] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleClick = (e) => {
    setCheckOut(true);
  }

  return (
    <div className="AppX">
      <Items 
        items={items}
        setItems={setItems}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      {checkout ? (
        <Payment 
          selectedRows={selectedRows}
        />
      ) : (
        <button onClick={handleClick}>
          Checkout
        </button>
      )}
    </div>
  );
}
