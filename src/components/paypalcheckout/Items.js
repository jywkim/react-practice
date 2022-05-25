import React, { useEffect, useState } from "react";

export default function Items() {
    const urlGetItems = "http://localhost:8000/get-items";
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch(urlGetItems)
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.data);
          },
          (error) => {
            console.log(error);
          }
        )
    }, []);

    return (
      <div>
        <ul>
          {items.map((item, key) =>(
            <li key={key}>{item.details.name}, ${item.details.price}</li>
          ))}
        </ul>
      </div>
    );
}
