'use client'
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


//test account
//email: sb-wst4m31793114@personal.example.com
//password: X^3O_6ia


// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  //we're fixing the message later
  return <p className="text-green-950">{content}</p>;
}

function Paypal({price, currency}) {
  const initialOptions = {
    "client-id":
    "ATj1A-b5G0dYye9zMGKrAkROMs5dR-Mi0jh4BfUpvm8_X_xeIv2KMi_65Yn8HVY1eq1Yj1Hd6OQu4nmE",
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              setPayementStatus(true);
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  item: 
                    {
                      id: "1",
                      price:price,
                      currency: currency,
                    },
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          
          onApprove={async (
            data,
            actions
          ) => {
            try {
                console.log("payement approved")
              const response = await fetch(
                `/api/orders/capture?orderID=${data.orderID}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              );

              const orderData = await response.json();
              console.log("order data:",orderData)
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`
              );
            }
          }} 
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default Paypal; 