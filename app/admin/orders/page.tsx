'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface OrderItem {
  name: string
  quantity: number
}

interface Order {
  id: string
  created: number
  customerEmail: string
  customerName: string
  amountTotal: number
  currency: string
  paymentStatus: string
  status: string
  deliveryMethod: string
  shippingAddress: string
  itemCount: number
  items: OrderItem[]
  itemsSummary: string
}

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatAmount(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

function PaymentBadge({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    paid: {
      background: 'rgba(45,90,22,0.12)',
      color: '#2D5A16',
      border: '1px solid rgba(45,90,22,0.2)',
    },
    unpaid: {
      background: 'rgba(196,129,58,0.12)',
      color: '#C4813A',
      border: '1px solid rgba(196,129,58,0.2)',
    },
  }
  const style = styles[status] ?? {
    background: 'rgba(92,91,84,0.1)',
    color: '#5C5B54',
    border: '1px solid rgba(92,91,84,0.2)',
  }
  return (
    <span
      style={{
        ...style,
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontWeight: 500,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}

const FULFILLMENT_STYLES: Record<string, React.CSSProperties> = {
  pending: { background: 'rgba(92,91,84,0.1)', color: '#5C5B54', border: '1px solid rgba(92,91,84,0.2)' },
  processing: { background: 'rgba(196,129,58,0.12)', color: '#C4813A', border: '1px solid rgba(196,129,58,0.2)' },
  fulfilled: { background: 'rgba(45,90,22,0.12)', color: '#2D5A16', border: '1px solid rgba(45,90,22,0.2)' },
  shipped: { background: '#0E0D09', color: '#F8F4EE', border: '1px solid #0E0D09' },
  cancelled: { background: 'rgba(200,0,0,0.08)', color: '#c00', border: '1px solid rgba(200,0,0,0.2)' },
}

function FulfillmentBadge({ status }: { status: string }) {
  const style = FULFILLMENT_STYLES[status] ?? FULFILLMENT_STYLES.pending
  return (
    <span
      style={{
        ...style,
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontWeight: 500,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}

function MethodBadge({ method }: { method: string }) {
  const m = method.toLowerCase()
  if (m === 'delivery') {
    return (
      <span
        style={{
          background: '#0E0D09',
          color: '#F8F4EE',
          padding: '0.2rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontWeight: 500,
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        🚚 delivery
      </span>
    )
  }
  if (m === 'pickup') {
    return (
      <span
        style={{
          background: 'rgba(45,90,22,0.12)',
          color: '#2D5A16',
          border: '1px solid rgba(45,90,22,0.2)',
          padding: '0.2rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontWeight: 500,
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        🏪 pickup
      </span>
    )
  }
  return (
    <span
      style={{
        background: 'rgba(92,91,84,0.1)',
        color: '#5C5B54',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        fontWeight: 500,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {method}
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 9 }).map((_, i) => (
        <td key={i} style={{ padding: '1rem' }}>
          <div
            style={{
              height: '1rem',
              borderRadius: '0.375rem',
              background: 'rgba(14,13,9,0.08)',
              width: i === 0 ? '80px' : i === 1 ? '120px' : i === 2 ? '160px' : '90px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </td>
      ))}
    </tr>
  )
}

function OrderCard({ order }: { order: Order }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/admin/orders/${order.id}`)}
      style={{
        background: '#fff',
        borderRadius: '1rem',
        border: '1px solid rgba(14,13,9,0.08)',
        padding: '1.25rem',
        marginBottom: '0.75rem',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#0E0D09',
            }}
          >
            {order.customerName}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.8125rem',
              color: '#5C5B54',
              marginTop: '0.125rem',
            }}
          >
            {order.customerEmail}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#0E0D09',
          }}
        >
          {formatAmount(order.amountTotal)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.8125rem',
            color: '#5C5B54',
          }}
        >
          {formatDate(order.created)}
        </span>
        <PaymentBadge status={order.paymentStatus} />
        <FulfillmentBadge status={order.status} />
        <MethodBadge method={order.deliveryMethod} />
      </div>
      {order.itemsSummary && order.itemsSummary !== '—' && (
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.8125rem',
            color: '#0E0D09',
            marginTop: '0.625rem',
          }}
        >
          {order.itemsSummary}
        </div>
      )}
      {order.shippingAddress && order.shippingAddress !== '—' && (
        <div
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.8125rem',
            color: '#5C5B54',
            marginTop: '0.625rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={order.shippingAddress}
        >
          {order.shippingAddress}
        </div>
      )}
    </div>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch orders')
        return r.json()
      })
      .then((data) => setOrders(data.orders))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return orders
    const q = search.toLowerCase()
    return orders.filter(
      (o) =>
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
    )
  }, [orders, search])

  const totalOrders = orders.length
  const paidOrders = orders.filter((o) => o.paymentStatus === 'paid').length
  const revenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.amountTotal, 0)

  const thStyle: React.CSSProperties = {
    padding: '0.875rem 1rem',
    fontSize: '0.625rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#5C5B54',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    fontWeight: 500,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  }

  const tdStyle: React.CSSProperties = {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#0E0D09',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
  }

  return (
    <div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .orders-table-wrap { display: none !important; }
          .orders-cards { display: block !important; }
        }
        @media (min-width: 769px) {
          .orders-cards { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
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
          Admin / Orders
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '3rem',
            fontWeight: 600,
            color: '#0E0D09',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Orders
        </h1>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Total Orders', value: loading ? '—' : String(totalOrders) },
          { label: 'Paid', value: loading ? '—' : String(paidOrders) },
          { label: 'Revenue (AUD)', value: loading ? '—' : formatAmount(revenue) },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(14,13,9,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.625rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5C5B54',
                marginBottom: '0.5rem',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2rem',
                fontWeight: 600,
                color: '#0E0D09',
                lineHeight: 1,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '360px',
            padding: '0.625rem 1rem',
            borderRadius: '0.625rem',
            border: '1px solid rgba(14,13,9,0.15)',
            background: '#fff',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            color: '#0E0D09',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            background: 'rgba(196,129,58,0.1)',
            border: '1px solid rgba(196,129,58,0.3)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            color: '#C4813A',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            marginBottom: '1.25rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Desktop table */}
      <div
        className="orders-table-wrap"
        style={{
          background: '#fff',
          borderRadius: '1rem',
          border: '1px solid rgba(14,13,9,0.08)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8F4EE', borderBottom: '1px solid rgba(14,13,9,0.08)' }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Items</th>
                <th style={thStyle}>Method</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
                <th style={thStyle}>Payment</th>
                <th style={thStyle}>Fulfillment</th>
                <th style={thStyle}>Address</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      padding: '3rem 1rem',
                      color: '#5C5B54',
                    }}
                  >
                    {search
                      ? 'No orders match your search.'
                      : 'No orders yet. Orders will appear here once customers complete checkout.'}
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: '1px solid rgba(14,13,9,0.06)',
                      background: hoveredRow === order.id ? '#F8F4EE' : '#fff',
                      transition: 'background 0.15s',
                      cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    onMouseEnter={() => setHoveredRow(order.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap', color: '#5C5B54' }}>
                      {formatDate(order.created)}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {order.customerName}
                    </td>
                    <td style={{ ...tdStyle, color: '#5C5B54' }}>{order.customerEmail}</td>
                    <td
                      style={{
                        ...tdStyle,
                        color: '#5C5B54',
                        maxWidth: '240px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={order.itemsSummary}
                    >
                      {order.itemsSummary}
                    </td>
                    <td style={tdStyle}>
                      <MethodBadge method={order.deliveryMethod} />
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {formatAmount(order.amountTotal)}
                    </td>
                    <td style={tdStyle}>
                      <PaymentBadge status={order.paymentStatus} />
                    </td>
                    <td style={tdStyle}>
                      <FulfillmentBadge status={order.status} />
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        color: '#5C5B54',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={order.shippingAddress}
                    >
                      {order.shippingAddress}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="orders-cards" style={{ display: 'none' }}>
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: '1rem',
                border: '1px solid rgba(14,13,9,0.08)',
                padding: '1.25rem',
                marginBottom: '0.75rem',
                animation: 'pulse 1.5s ease-in-out infinite',
                height: '100px',
              }}
            />
          ))}
        {!loading && !error && filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#5C5B54',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            {search
              ? 'No orders match your search.'
              : 'No orders yet. Orders will appear here once customers complete checkout.'}
          </div>
        )}
        {!loading && filtered.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </div>
  )
}
