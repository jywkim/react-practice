import React from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Payment() {
    const BACKEND_URL = "http://localhost:8000/create-order";

    const createOrder = () => {
      return fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          items: [{
            id: 1,
            quantity: 2
          }, {
            id: 2,
            quantity: 3
          }]
        }),
      }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
      }).then(({id}) => {
        return id;
      }).catch(e => {
        console.error(e.error);
      })
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

    return (
      <div>
          <PayPalButton
          createOrder={() => createOrder()}
          onApprove={(data, actions) => onApprove(data, actions)}
          onError={(err) => onError(err)}
          />
      </div>
    );
}
