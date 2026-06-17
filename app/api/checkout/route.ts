import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const SHIPPING_COST_CENTS = 2500 // $25.00 AUD

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  image: string
}

interface AddressPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address: string
  suburb: string
  state: string
  postcode: string
}

export async function POST(req: NextRequest) {
  try {
    const { items, method, address } = (await req.json()) as {
      items: CartItem[]
      method: 'delivery' | 'pickup'
      address: AddressPayload | null
    }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
      : req.nextUrl.origin;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.name,
          description: item.unit,
          metadata: { productId: item.id },
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Add shipping as a line item when method is delivery
    if (method === 'delivery') {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'Shipping (AU-wide delivery)',
            description: 'Flat rate Australia-wide',
            metadata: { productId: '' },
          },
          unit_amount: SHIPPING_COST_CENTS,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        delivery_method: method,
        ...(address
          ? {
            shipping_name: `${address.firstName} ${address.lastName}`,
            shipping_address: `${address.address}, ${address.suburb} ${address.state} ${address.postcode}`,
            customer_phone: address.phone ?? '',
          }
          : { pickup_location: '8 Climate St, Fraser Rise VIC 3336' }),
      },
      customer_email: address?.email ?? undefined,
      phone_number_collection: { enabled: true },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
