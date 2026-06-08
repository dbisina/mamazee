'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalProducts: number | null
  activeProducts: number | null
  totalOrders: number | null
  revenue: number | null
}

const LOW_STOCK_THRESHOLD = 5

interface LowStockProduct {
  id: string
  name: string
  stock_quantity: number
}

function fmt(val: number | null, prefix?: string) {
  if (val === null) return '—'
  if (prefix)
    return `${prefix}${val.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return val.toLocaleString('en-AU')
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: null,
    activeProducts: null,
    totalOrders: null,
    revenue: null,
  })
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const products = await res.json() as Array<{ id: string; name: string; active?: boolean; stock_quantity?: number }>
          setStats((s) => ({
            ...s,
            totalProducts: products.length,
            activeProducts: products.filter((p) => p.active === true).length,
          }))
          setLowStock(
            products
              .filter((p) => (p.stock_quantity ?? 0) <= LOW_STOCK_THRESHOLD)
              .sort((a, b) => (a.stock_quantity ?? 0) - (b.stock_quantity ?? 0))
              .map((p) => ({ id: p.id, name: p.name, stock_quantity: p.stock_quantity ?? 0 }))
          )
        }
      } catch { /* leave null */ }

      try {
        const res = await fetch('/api/admin/orders')
        if (res.ok) {
          const orders = await res.json() as Array<{ amount_total?: number }>
          const revenue = orders.reduce((sum, o) => sum + (o.amount_total ?? 0), 0) / 100
          setStats((s) => ({ ...s, totalOrders: orders.length, revenue }))
        }
      } catch { /* leave null */ }
    }
    fetchStats()
  }, [])

  const metrics = [
    { label: 'Total products', value: fmt(stats.totalProducts) },
    { label: 'Active listings', value: fmt(stats.activeProducts) },
    { label: 'Orders', value: fmt(stats.totalOrders) },
    { label: 'Revenue (AUD)', value: fmt(stats.revenue, '$') },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', maxWidth: 800 }}>
      {/* Heading */}
      <div style={{ marginBottom: '3rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 400,
            color: '#0E0D09',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            color: '#8a8978',
            fontSize: '0.875rem',
            margin: '0.5rem 0 0',
            fontWeight: 300,
          }}
        >
          Mamazee store overview
        </p>
      </div>

      {/* Metrics strip — single horizontal row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(14,13,9,0.1)',
          marginBottom: '3rem',
          overflowX: 'auto',
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            style={{
              padding: '1.75rem 0',
              paddingRight: i < 3 ? '2rem' : 0,
              paddingLeft: i > 0 ? '2rem' : 0,
              borderRight: i < 3 ? '1px solid rgba(14,13,9,0.1)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: '#0E0D09',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#8a8978',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '0.5rem',
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div
          style={{
            background: 'rgba(196,129,58,0.08)',
            border: '1px solid rgba(196,129,58,0.25)',
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '3rem',
          }}
        >
          <style>{`
            .low-stock-row { transition: background 0.15s ease, padding-left 0.15s ease; border-radius: 0.375rem; }
            .low-stock-row:hover { background: rgba(196,129,58,0.1); padding-left: 0.5rem; }
          `}</style>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: '#C4813A',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              margin: '0 0 0.75rem',
            }}
          >
            ⚠ Low stock ({lowStock.length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {lowStock.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}/edit`}
                className="low-stock-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  color: '#0E0D09',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  padding: '0.375rem 0',
                }}
              >
                <span>{p.name}</span>
                <span style={{ color: p.stock_quantity === 0 ? '#c00' : '#C4813A', fontWeight: 500 }}>
                  {p.stock_quantity === 0 ? 'Out of stock' : `${p.stock_quantity} left`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: '#8a8978',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            margin: '0 0 1rem',
          }}
        >
          Actions
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href="/admin/products/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.375rem',
              background: '#2D5A16',
              color: '#fff',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            Add product
          </Link>
          <Link
            href="/admin/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.375rem',
              background: 'transparent',
              color: '#0E0D09',
              border: '1px solid rgba(14,13,9,0.18)',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.375rem',
              background: 'transparent',
              color: '#0E0D09',
              border: '1px solid rgba(14,13,9,0.18)',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 400,
            }}
          >
            Orders
          </Link>
        </div>
      </div>

      {/* Note — no borderLeft */}
      <p
        style={{
          fontSize: '0.8125rem',
          color: '#8a8978',
          margin: 0,
          fontWeight: 300,
          lineHeight: 1.6,
        }}
      >
        Products without photos can be managed directly in Supabase Studio.
      </p>
    </div>
  )
}
