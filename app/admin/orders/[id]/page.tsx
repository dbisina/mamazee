'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

const STATUSES = ['pending', 'processing', 'fulfilled', 'shipped', 'cancelled'] as const

interface OrderItem {
  name: string
  quantity: number
}

interface OrderDetail {
  id: string
  stripe_session_id: string
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  amount_total: number
  currency: string
  payment_status: string
  status: string
  delivery_method: string | null
  shipping_address: string | null
  items: OrderItem[]
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatAmount(cents: number, currency: string) {
  return `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.625rem',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#5C5B54',
  fontFamily: 'var(--font-inter), system-ui, sans-serif',
  marginBottom: '0.375rem',
  display: 'block',
}

const valueStyle: React.CSSProperties = {
  fontSize: '0.9375rem',
  color: '#0E0D09',
  fontFamily: 'var(--font-inter), system-ui, sans-serif',
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '1rem',
  border: '1px solid rgba(14,13,9,0.08)',
  padding: '1.5rem',
  marginBottom: '1.25rem',
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/orders/${id}`)
        if (!res.ok) { setNotFound(true); return }
        const data = await res.json() as { order: OrderDetail }
        setOrder(data.order)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleStatusChange(status: string) {
    if (!order) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      const data = await res.json() as { order: OrderDetail }
      setOrder(data.order)
      showToast('success', 'Order status updated.')
    } catch (e) {
      showToast('error', e instanceof Error ? e.message : 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <div style={{ ...valueStyle, color: '#5C5B54' }}>Loading order…</div>
  }

  if (notFound || !order) {
    return (
      <div>
        <Link href="/admin/orders" style={{ ...valueStyle, color: '#5C5B54', textDecoration: 'none' }}>
          ← Back to orders
        </Link>
        <p style={{ ...valueStyle, marginTop: '1rem' }}>Order not found.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '760px' }}>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 50,
            background: toast.type === 'success' ? '#2D5A16' : '#c00',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.625rem',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            boxShadow: '0 8px 24px rgba(14,13,9,0.18)',
          }}
        >
          {toast.msg}
        </div>
      )}

      <Link
        href="/admin/orders"
        style={{
          fontSize: '0.8125rem',
          color: '#5C5B54',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        ← Back to orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '0.75rem 0 2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C4813A',
              display: 'block',
              marginBottom: '0.375rem',
            }}
          >
            Order #{order.id.slice(0, 8).toUpperCase()}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#0E0D09',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {formatAmount(order.amount_total, order.currency)}
          </h1>
        </div>

        <div>
          <label style={labelStyle} htmlFor="status">Fulfillment status</label>
          <select
            id="status"
            value={order.status}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value)}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(14,13,9,0.15)',
              background: '#fff',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              color: '#0E0D09',
              cursor: updating ? 'not-allowed' : 'pointer',
            }}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={cardStyle}>
        <span style={labelStyle}>Customer</span>
        <p style={{ ...valueStyle, fontWeight: 600, marginBottom: '0.25rem' }}>{order.customer_name ?? '—'}</p>
        <p style={{ ...valueStyle, color: '#5C5B54', marginBottom: '0.25rem' }}>{order.customer_email ?? '—'}</p>
        <p style={{ ...valueStyle, color: '#5C5B54' }}>{order.customer_phone ?? '—'}</p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          <div>
            <span style={labelStyle}>Placed</span>
            <p style={valueStyle}>{formatDate(order.created_at)}</p>
          </div>
          <div>
            <span style={labelStyle}>Payment</span>
            <p style={valueStyle}>{order.payment_status}</p>
          </div>
          <div>
            <span style={labelStyle}>Method</span>
            <p style={valueStyle}>{order.delivery_method ?? '—'}</p>
          </div>
          <div>
            <span style={labelStyle}>{order.delivery_method === 'delivery' ? 'Delivery address' : 'Pickup location'}</span>
            <p style={valueStyle}>{order.shipping_address ?? '—'}</p>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <span style={labelStyle}>Items</span>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} style={{ borderTop: i > 0 ? '1px solid rgba(14,13,9,0.06)' : 'none' }}>
                <td style={{ ...valueStyle, padding: '0.625rem 0' }}>{item.name}</td>
                <td style={{ ...valueStyle, padding: '0.625rem 0', textAlign: 'right', color: '#5C5B54' }}>×{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ ...valueStyle, color: '#A0A097', fontSize: '0.75rem' }}>
        Stripe session: {order.stripe_session_id}
      </p>
    </div>
  )
}
