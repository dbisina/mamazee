import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as any })

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || '50')

  const sessions = await stripe.checkout.sessions.list({
    limit,
    expand: ['data.line_items'],
  })

  const orders = sessions.data.map((s) => ({
    id: s.id,
    created: s.created,
    customerEmail: s.customer_email ?? s.customer_details?.email ?? '—',
    customerName: s.customer_details?.name ?? s.metadata?.shipping_name ?? '—',
    amountTotal: s.amount_total ?? 0,
    currency: s.currency ?? 'aud',
    paymentStatus: s.payment_status,
    status: s.status,
    deliveryMethod: s.metadata?.delivery_method ?? '—',
    shippingAddress: s.metadata?.shipping_address ?? s.metadata?.pickup_location ?? '—',
    itemCount: s.line_items?.data?.length ?? 0,
  }))

  return NextResponse.json({ orders, total: sessions.data.length })
}
