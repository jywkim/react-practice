import React, { useEffect, useState } from "react";

export default function Items() {
    const urlGetItems = "http://localhost:8000/get-items";
    const [items, setItems] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

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

    useEffect(() => {
     console.log(selectedRows);
    }, [selectedRows]);

    const handleChange = (e, item) => {
      if (e.target.checked === true) {
        setSelectedRows([
           ...selectedRows,
           item
        ])
      } else {
        const nextSelectedRows = selectedRows.filter(selectedRow => selectedRow.id !== item.id);
        setSelectedRows(nextSelectedRows);
      }
    }

    return (
      <div>
        <table id="payTable">
          <tbody>
            <tr className="payRow">
              <th className="payName">Name</th>
              <th className="payPrice">Price</th>
              <th className="payCheck"></th>
            </tr>
          </tbody>
          <tbody>
            {items.map((item) =>(
            <tr key={item.id} className="payRow">
              <td className="payName">
                {item.details.name}
              </td>
              <td className="payPrice">
                {item.details.price}
              </td>
              <td className="payCheck">
                <input 
                  type="checkbox" 
                  onChange={(e) => handleChange(e, item)} 
                >
                </input>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
