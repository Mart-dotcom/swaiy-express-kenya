import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const MPESA_CONSUMER_KEY = Deno.env.get('MPESA_CONSUMER_KEY')!
const MPESA_CONSUMER_SECRET = Deno.env.get('MPESA_CONSUMER_SECRET')!
const MPESA_SHORTCODE = Deno.env.get('MPESA_SHORTCODE')!
const MPESA_PASSKEY = Deno.env.get('MPESA_PASSKEY')!
const MPESA_CALLBACK_URL = Deno.env.get('MPESA_CALLBACK_URL')!

async function getAccessToken() {
  const auth = btoa(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`)
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${auth}`,
    },
  })
  
  const data = await response.json()
  return data.access_token
}

function generateTimestamp() {
  return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
}

function generatePassword(timestamp: string) {
  const data = `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
  return btoa(data)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { phone, amount, order_id } = await req.json()

    // Get access token
    const accessToken = await getAccessToken()
    
    // Generate timestamp and password
    const timestamp = generateTimestamp()
    const password = generatePassword(timestamp)

    // Prepare STK Push request
    const stkRequest = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: order_id,
      TransactionDesc: `Payment for order ${order_id}`
    }

    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkRequest),
    })

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})