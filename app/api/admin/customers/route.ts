import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' as any })

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sessions = await stripe.checkout.sessions.list({ limit: 100 })

  const customerMap = new Map<
    string,
    { name: string; email: string; orders: number; totalSpent: number; lastOrder: number }
  >()

  for (const s of sessions.data) {
    if (s.payment_status !== 'paid') continue
    const email = s.customer_email ?? s.customer_details?.email
    if (!email) continue
    const existing = customerMap.get(email)
    if (existing) {
      existing.orders++
      existing.totalSpent += s.amount_total ?? 0
      existing.lastOrder = Math.max(existing.lastOrder, s.created)
    } else {
      customerMap.set(email, {
        name: s.customer_details?.name ?? s.metadata?.shipping_name ?? '—',
        email,
        orders: 1,
        totalSpent: s.amount_total ?? 0,
        lastOrder: s.created,
      })
    }
  }

  const customers = Array.from(customerMap.values()).sort((a, b) => b.lastOrder - a.lastOrder)
  return NextResponse.json({ customers, total: customers.length })
}
