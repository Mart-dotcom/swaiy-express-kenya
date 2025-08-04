import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    const payload = await req.json()
    
    const { Body } = payload
    if (!Body?.stkCallback) {
      return new Response('Invalid payload', { status: 400 })
    }

    const { stkCallback } = Body
    const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback

    // Extract transaction details
    let transactionId = ''
    let phoneNumber = ''
    let amount = 0

    if (CallbackMetadata?.Item) {
      for (const item of CallbackMetadata.Item) {
        switch (item.Name) {
          case 'MpesaReceiptNumber':
            transactionId = item.Value
            break
          case 'PhoneNumber':
            phoneNumber = item.Value
            break
          case 'Amount':
            amount = item.Value
            break
        }
      }
    }

    // Update order status based on result
    const paymentStatus = ResultCode === 0 ? 'completed' : 'failed'
    const orderStatus = ResultCode === 0 ? 'confirmed' : 'cancelled'

    // Find order by phone number and amount (you might want to use a better identifier)
    const { data: orders, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_phone', phoneNumber)
      .eq('total_cost', amount)
      .eq('payment_status', 'pending')
      .limit(1)

    if (fetchError || !orders || orders.length === 0) {
      console.error('Order not found:', fetchError)
      return new Response('Order not found', { status: 404 })
    }

    const order = orders[0]

    // Update order with payment information
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        status: orderStatus,
        mpesa_transaction_id: transactionId,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id)

    if (updateError) {
      console.error('Failed to update order:', updateError)
      return new Response('Failed to update order', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Callback error:', error)
    return new Response('Error processing callback', { status: 500 })
  }
})