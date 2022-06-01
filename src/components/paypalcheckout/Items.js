import React, { useEffect } from "react";

export default function Items({items, setItems, selectedRows, setSelectedRows}) {
    const urlGetItems = "http://localhost:8000/get-items";

    useEffect(() => {
      fetch(urlGetItems)
        .then(res => res.json())
        .then(
          (result) => {
            const itemsWithQuantity = result.data.map(r => {
              r.quantity = 1;
              return r
            })
            setItems(itemsWithQuantity);
          },
          (error) => {
            console.log(error);
          }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeCheckbox = (e, item) => {
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

    const handleChangeQuantity = (e, item) => {
      e.preventDefault();
      const itemsUpdate = selectedRows.map(r => {
        if (r.id === item.id) r.quantity = e.target.value;
        return r;
      })
      setSelectedRows(itemsUpdate);
    }

    return (
      <div>
        <table id="payTable">
          <tbody>
            <tr className="payRow">
              <th className="payName">Name</th>
              <th className="payPrice">Price</th>
              <th className="payCheck"></th>
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
                  onChange={(e) => handleChangeCheckbox(e, item)} 
                >
                </input>
              </td>
              <td className="payQuantity">
                <input 
                  type="textbox" 
                  value={item.quantity}
                  onChange={(e) => handleChangeQuantity(e, item)} 
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
