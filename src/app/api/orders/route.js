const base = "https://api-m.sandbox.paypal.com";
import { NextResponse } from "next/server";

const generateAccessToken = async () => {
  try {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET} = process.env;

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}


const createOrder = async (item) => {
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    item
  );
 
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      { 
        amount: {
          currency_code: "USD",
          value: item.price,
        },
      },
    ],
  };
  

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};


export async function POST(req) {
      try {
        const data = await req.json();
        const  item = data.item
        const { jsonResponse, httpStatusCode } = await createOrder(item);
        return NextResponse.json(jsonResponse,{status:httpStatusCode});
      } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order." },{ status:500});
      }
    } 

