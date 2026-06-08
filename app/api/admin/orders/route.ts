import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { adminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit') || '100')

  const { data, error } = await adminClient
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const orders = (data ?? []).map((o) => {
    type OrderItem = { name: string; quantity: number }
    const items = (Array.isArray(o.items) ? o.items : []) as OrderItem[]
    const itemsSummary = items.map((i) => `${i.name} ×${i.quantity}`).join(', ') || '—'

    return {
      id: o.id,
      created: Math.floor(new Date(o.created_at).getTime() / 1000),
      customerEmail: o.customer_email ?? '—',
      customerName: o.customer_name ?? '—',
      amountTotal: o.amount_total ?? 0,
      currency: o.currency ?? 'aud',
      paymentStatus: o.payment_status,
      status: o.status,
      deliveryMethod: o.delivery_method ?? '—',
      shippingAddress: o.shipping_address ?? '—',
      itemCount: items.length,
      items,
      itemsSummary,
    }
  })

  return NextResponse.json({ orders, total: orders.length })
}
