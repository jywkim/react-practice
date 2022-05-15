import React, {useState} from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Payment() {
    const [amount, setAmount] = useState(0);

    const createOrder = (data, actions) => {
        console.log(amount);
        if (amount > 0) {
            return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Shopping Cart",
                    amount: {
                      currency_code: "CAD",
                      value: String(amount),
                    },
                  },
                ],
              });
        } else {
            alert("Please enter amount!");
        }
      };
      const onApprove = (data, actions) => {
        const order = actions.order.capture();
        return order.then(function (details) {
            alert("Transaction Completed By " + details.payer.name.given_name);
            console.log("Successful Order", order);
        })
      };
      const onError = (err) => {
        console.log(err);
      };

      const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setAmount(e.target.value);
      };

      return (
        <div>
            <input
                className="col-md-12 input"
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={handleChange}
                placeholder="Please enter amount"
            >
            </input>
            <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onError={(err) => onError(err)}
            />
        </div>
      );
}
