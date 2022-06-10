import React from "react";

export const Customers = ({headerKeys, array}) => {

  const CustomerTable = array.map((item, index) => (
    <tr key={index}>
      {Object.values(item).map((val, index) => (
        <td key={index}>{val}</td>
      ))}
    </tr>
  ));

  const tableHeader = 
      <thead>
        <tr key={"header"}>
          {headerKeys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      
  return (
    <table className="customerTable">
      {tableHeader}
      <tbody>
          {CustomerTable}
      </tbody>
    </table>
  )
}