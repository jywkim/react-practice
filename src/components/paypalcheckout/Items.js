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

    const handleClick = (e) => {
      console.log(e);
    }

    return (
      <div>
        <table>
          <tbody>
            <tr className="payRow">
              <th className="payName">Name</th>
              <th className="payPrice">Price</th>
              <th className="payCheck"></th>
            </tr>
          </tbody>
          <tbody>
            {items.map((item, key) =>(
            <tr key={key} className="payRow">
              <td className="payName">
                {item.details.name}
              </td>
              <td className="payPrice">
                {item.details.price}
              </td>
              <td className="payCheck">
                <input type="checkbox" onClick={handleClick}></input>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
