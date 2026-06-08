import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminClient } from '@/lib/supabase/admin'
import { sendOrderConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia' as any,
})

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
const WA_PHONE = process.env.WHATSAPP_NOTIFY_PHONE ?? '61468324309'
const GREEN_INSTANCE = process.env.GREEN_API_INSTANCE_ID ?? ''
const GREEN_TOKEN = process.env.GREEN_API_TOKEN ?? ''

// ─── WhatsApp via Green API ──────────────────────────────────────────────────
// Setup: register at green-api.com → create instance → scan QR with Mamazee WhatsApp
// chatId format: {phone_without_plus}@c.us
async function sendWhatsApp(message: string) {
  if (!GREEN_INSTANCE || !GREEN_TOKEN) {
    console.warn('[WhatsApp] GREEN_API_INSTANCE_ID or GREEN_API_TOKEN not set — skipping')
    return
  }
  const chatId = `${WA_PHONE}@c.us`
  const url = `https://api.green-api.com/waInstance${GREEN_INSTANCE}/sendMessage/${GREEN_TOKEN}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  })
  if (!res.ok) {
    console.error('[WhatsApp] Green API error:', res.status, await res.text())
  }
}

// ─── Format order message ────────────────────────────────────────────────────
function formatOrderMessage(session: Stripe.Checkout.Session, lineItems: Stripe.LineItem[]) {
  const id = session.id.slice(-8).toUpperCase()
  const date = new Date(session.created * 1000).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const total = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)} AUD`
    : 'Unknown'

  const name =
    session.metadata?.shipping_name ??
    session.customer_details?.name ??
    'Unknown'
  const email = session.customer_email ?? session.customer_details?.email ?? '—'
  const phone =
    session.customer_details?.phone ??
    session.metadata?.customer_phone ??
    '—'

  const method = session.metadata?.delivery_method === 'delivery' ? 'Delivery' : 'Pick-up'
  const address =
    session.metadata?.shipping_address ??
    session.metadata?.pickup_location ??
    '—'

  const itemLines = lineItems
    .filter((i) => i.description !== 'Flat rate Australia-wide') // exclude shipping line
    .map((i) => {
      const qty = i.quantity ?? 1
      const unitPrice = i.price?.unit_amount
        ? `$${(i.price.unit_amount / 100).toFixed(2)}`
        : ''
      return `  - ${i.description ?? i.price?.product} x${qty} ${unitPrice}`
    })
    .join('\n')

  return [
    `NEW ORDER #${id}`,
    `Date: ${date}`,
    `Total: ${total}`,
    ``,
    `CUSTOMER`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    ``,
    `${method.toUpperCase()}`,
    `${address}`,
    ``,
    `ITEMS`,
    itemLines || '  (details unavailable)',
    ``,
    `Manage: mamazee.com.au/admin/orders`,
  ].join('\n')
}

// ─── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook signature invalid'
    console.error('[Stripe webhook] verification failed:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Only act on paid orders
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    // Fetch line items, expanding the ephemeral product so we can read back
    // the productId we stamped into product_data.metadata at checkout time
    let lineItems: Stripe.LineItem[] = []
    try {
      const result = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
        expand: ['data.price.product'],
      })
      lineItems = result.data
    } catch (err) {
      console.error('[Stripe webhook] failed to fetch line items:', err)
    }

    const orderItems = lineItems
      .filter((li) => !li.description?.toLowerCase().startsWith('shipping'))
      .map((li) => {
        const product = li.price?.product
        const productId =
          product && typeof product === 'object' && !product.deleted
            ? (product as Stripe.Product).metadata?.productId
            : undefined
        return { productId, name: li.description ?? 'Item', quantity: li.quantity ?? 1 }
      })

    // Decrement stock for each purchased product
    for (const item of orderItems) {
      if (!item.productId) continue
      const { error } = await adminClient.rpc('decrement_stock', {
        p_product_id: item.productId,
        p_qty: item.quantity,
      })
      if (error) console.error('[Stripe webhook] stock decrement failed for', item.productId, error.message)
    }

    // Persist the order (idempotent — webhooks can be redelivered)
    const customerName =
      session.metadata?.shipping_name ?? session.customer_details?.name ?? '—'
    const customerEmail = session.customer_email ?? session.customer_details?.email ?? null
    const customerPhone = session.customer_details?.phone ?? session.metadata?.customer_phone ?? null
    const deliveryMethod = session.metadata?.delivery_method ?? '—'
    const shippingAddress =
      session.metadata?.shipping_address ?? session.metadata?.pickup_location ?? '—'

    const { error: orderError } = await adminClient.from('orders').upsert(
      {
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
        amount_total: session.amount_total ?? 0,
        currency: session.currency ?? 'aud',
        payment_status: session.payment_status,
        delivery_method: deliveryMethod,
        shipping_address: shippingAddress,
        items: orderItems.map((i) => ({ name: i.name, quantity: i.quantity })),
      },
      { onConflict: 'stripe_session_id', ignoreDuplicates: true }
    )
    if (orderError) console.error('[Stripe webhook] failed to persist order:', orderError.message)

    const message = formatOrderMessage(session, lineItems)

    try {
      await sendWhatsApp(message)
      console.log('[WhatsApp] Order notification sent for session', session.id)
    } catch (err) {
      console.error('[WhatsApp] Failed to send notification:', err)
    }

    if (customerEmail) {
      await sendOrderConfirmationEmail({
        to: customerEmail,
        customerName,
        orderId: session.id,
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? 'aud',
        deliveryMethod,
        shippingAddress,
        items: orderItems.map((i) => ({ name: i.name, quantity: i.quantity })),
      })
    }
  }

  return NextResponse.json({ received: true })
}
