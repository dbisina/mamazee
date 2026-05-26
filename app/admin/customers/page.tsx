'use client'

import { useState, useEffect, useMemo } from 'react'

interface Customer {
  name: string
  email: string
  orders: number
  totalSpent: number
  lastOrder: number
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

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} style={{ padding: '1rem' }}>
          <div
            style={{
              height: '1rem',
              borderRadius: '0.375rem',
              background: 'rgba(14,13,9,0.08)',
              width: i === 0 ? '120px' : i === 1 ? '180px' : i === 2 ? '40px' : '80px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </td>
      ))}
    </tr>
  )
}

function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1rem',
        border: '1px solid rgba(14,13,9,0.08)',
        padding: '1.25rem',
        marginBottom: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#0E0D09',
            }}
          >
            {customer.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.8125rem',
              color: '#5C5B54',
              marginTop: '0.125rem',
            }}
          >
            {customer.email}
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
          {formatAmount(customer.totalSpent)}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '0.8125rem',
          color: '#5C5B54',
        }}
      >
        <span>{customer.orders} order{customer.orders !== 1 ? 's' : ''}</span>
        <span>Last: {formatDate(customer.lastOrder)}</span>
      </div>
    </div>
  )
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/customers')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch customers')
        return r.json()
      })
      .then((data) => setCustomers(data.customers))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const base = [...customers].sort((a, b) => b.totalSpent - a.totalSpent)
    if (!search.trim()) return base
    const q = search.toLowerCase()
    return base.filter(
      (c) =>
        c.email.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    )
  }, [customers, search])

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
          .customers-table-wrap { display: none !important; }
          .customers-cards { display: block !important; }
        }
        @media (min-width: 769px) {
          .customers-cards { display: none !important; }
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
          Admin / Customers
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
          Customers
        </h1>
      </div>

      {/* Summary card */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(14,13,9,0.08)',
            display: 'inline-block',
            minWidth: '160px',
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
            Unique Customers
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
            {loading ? '—' : customers.length}
          </div>
        </div>
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
        className="customers-table-wrap"
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
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Orders</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Total Spent</th>
                <th style={thStyle}>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      padding: '3rem 1rem',
                      color: '#5C5B54',
                    }}
                  >
                    {search ? 'No customers match your search.' : 'No customers yet.'}
                  </td>
                </tr>
              )}
              {!loading &&
                filtered.map((customer) => (
                  <tr
                    key={customer.email}
                    style={{
                      borderBottom: '1px solid rgba(14,13,9,0.06)',
                      background: hoveredRow === customer.email ? '#F8F4EE' : '#fff',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={() => setHoveredRow(customer.email)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={{ ...tdStyle, fontWeight: 500 }}>{customer.name}</td>
                    <td style={{ ...tdStyle, color: '#5C5B54' }}>{customer.email}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{customer.orders}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 500 }}>
                      {formatAmount(customer.totalSpent)}
                    </td>
                    <td style={{ ...tdStyle, color: '#5C5B54', whiteSpace: 'nowrap' }}>
                      {formatDate(customer.lastOrder)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="customers-cards" style={{ display: 'none' }}>
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
                height: '90px',
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
            {search ? 'No customers match your search.' : 'No customers yet.'}
          </div>
        )}
        {!loading && filtered.map((customer) => <CustomerCard key={customer.email} customer={customer} />)}
      </div>
    </div>
  )
}
