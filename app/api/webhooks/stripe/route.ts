import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

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

    // Only notify on paid orders
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    // Fetch line items for product names
    let lineItems: Stripe.LineItem[] = []
    try {
      const result = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20 })
      lineItems = result.data
    } catch (err) {
      console.error('[Stripe webhook] failed to fetch line items:', err)
    }

    const message = formatOrderMessage(session, lineItems)

    try {
      await sendWhatsApp(message)
      console.log('[WhatsApp] Order notification sent for session', session.id)
    } catch (err) {
      console.error('[WhatsApp] Failed to send notification:', err)
    }
  }

  return NextResponse.json({ received: true })
}
