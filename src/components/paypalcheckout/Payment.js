import React, { useEffect } from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Payment() {
    const urlCreateOrder = "http://localhost:8000/create-order";
    const urlGetItems = "http://localhost:8000/get-items";

    useEffect(() => {
      fetch(urlGetItems)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        )
    }, []);

    const createOrder = () => {
      return fetch(urlCreateOrder, {
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
