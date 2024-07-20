import { Buffer } from 'buffer';
import { NextResponse } from "next/server";


const base = "https://api-m.sandbox.paypal.com";


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

const capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
};

export async function GET(req) {
  const orderId=req.nextUrl.searchParams.get("orderID")
    try {
      const captureData = await capturePayment(orderId);
      return NextResponse.json(captureData,{ status: 200 });
    } catch (error) {
      console.error("Failed to capture payment:", error);
      return NextResponse.json({ error: "Failed to capture payment." }, { status: 500 });
    }
  } 
