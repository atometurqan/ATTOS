import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const headers = {
    destAddress : req.headers.get("destAddress"),
    destCurrency : req.headers.get("destCurrency"),
    destAmount : req.headers.get("destAmount"),
    email : req.headers.get("email"),
  }
  const url = "https://api.stripe.com/v1/crypto/onramp_sessions";
  const apiKey =
    "sk_test_51PziWjP4F0cuCA7LptK1sRXPyNCgtVE141Anp5mgi70MQkroNee0caHKhBtRfXzsn7vDaGTATUNwXIbTg7J9NQxF00HElmh6VN";

    const requestData = new URLSearchParams({
      'destination_currencies[0]': 'usdc',
      'destination_currencies[1]': 'avax',
      'destination_network': 'avalanche',
      'destination_currency': headers.destCurrency as string, // Hedef ağ
      'destination_amount': headers.destAmount as string // Hedef miktar
    });
    headers.email ?  requestData.set("customer_information[email]", headers.email as string) : ""
    headers.destAddress ? requestData.set('wallet_addresses[avalanche]', headers.destAddress as string) : ""
let secret;
  const data = await fetch(url, {
    method: "POST",
    headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestData.toString(),
    cache: "no-cache"
  }).catch((err)=> {console.log(err); return null})
  if(data) {
    secret = await data.json()

  }


  return NextResponse.json(secret , { status: 200 });
}