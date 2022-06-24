import React, { useState } from "react";

export const Item = (props) => {
    const item = props.item;
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }

    return (
        <li onClick={handleClick} className="itemName">
          {item}{", "}{counter}
        </li>
      )
}