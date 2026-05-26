'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  category: 'pantry' | 'spices' | 'snacks' | 'beauty'
  price: number
  unit: string
  description: string
  image: string
  featured: boolean
  tag: string | null
  stock_quantity: number
  active: boolean
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  pantry: { bg: 'rgba(196,129,58,0.12)', color: '#C4813A' },
  spices: { bg: 'rgba(45,90,22,0.12)', color: '#2D5A16' },
  snacks: { bg: 'rgba(14,13,9,0.1)', color: '#0E0D09' },
  beauty: { bg: 'rgba(233,30,140,0.1)', color: '#e91e8c' },
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid rgba(14,13,9,0.15)',
  borderRadius: '0.5rem',
  fontSize: '0.9375rem',
  fontFamily: 'var(--font-inter), system-ui, sans-serif',
  background: '#fff',
  color: '#0E0D09',
  outline: 'none',
  boxSizing: 'border-box',
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} style={{ padding: '1rem 1.25rem' }}>
          <div
            style={{
              height: i === 0 ? 48 : 16,
              width: i === 0 ? 48 : '80%',
              background: 'rgba(14,13,9,0.06)',
              borderRadius: i === 0 ? '0.375rem' : '0.25rem',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </td>
      ))}
    </tr>
  )
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? ''

  async function loadProducts() {
    setLoading(true)
    try {
      const res = await fetch('/api/products?admin=1', {
        headers: { 'x-admin-key': ADMIN_KEY },
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data as Product[])
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleToggleActive(product: Product) {
    const action = product.active ? 'deactivate' : 'activate'
    if (!window.confirm(`${action === 'deactivate' ? 'Deactivate' : 'Activate'} "${product.name}"?`)) return
    setDeleting(product.id)
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'x-admin-key': ADMIN_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !product.active }),
      })
      if (res.ok) {
        const updated = await res.json() as Product
        setProducts((prev) => prev.map((p) => p.id === product.id ? updated : p))
      } else {
        alert(`Failed to ${action} product.`)
      }
    } catch {
      alert('Network error.')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  })

  return (
    <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .products-table-wrap { display: none !important; }
          .products-cards { display: flex !important; }
        }
        @media (min-width: 769px) {
          .products-table-wrap { display: block !important; }
          .products-cards { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: '#C4813A',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            Admin / Products
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
            Products
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#2D5A16',
            color: '#fff',
            borderRadius: '0.625rem',
            textDecoration: 'none',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.9375rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '1.5rem', maxWidth: 360 }}>
        <input
          type="text"
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Desktop Table */}
      <div
        className="products-table-wrap"
        style={{
          background: '#fff',
          borderRadius: '1rem',
          overflow: 'hidden',
          border: '1px solid rgba(14,13,9,0.08)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(14,13,9,0.08)',
                background: 'rgba(14,13,9,0.02)',
              }}
            >
              {['Image', 'Name', 'Category', 'Price', 'Stock', 'Featured', 'Active', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.875rem 1.25rem',
                      textAlign: 'left',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      color: '#5C5B54',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : filtered.length === 0
              ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#5C5B54',
                      fontSize: '0.9375rem',
                    }}
                  >
                    {search ? 'No products match your search.' : 'No products yet.'}
                  </td>
                </tr>
              )
              : filtered.map((p) => {
                  const catStyle = CATEGORY_COLORS[p.category] ?? { bg: '#eee', color: '#333' }
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid rgba(14,13,9,0.06)',
                        transition: 'background 0.1s',
                      }}
                    >
                      {/* Image */}
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: 'cover',
                              borderRadius: '0.375rem',
                              display: 'block',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              background: 'rgba(14,13,9,0.08)',
                              borderRadius: '0.375rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              stroke="#5C5B54"
                              strokeWidth="1.5"
                            >
                              <rect x="2" y="2" width="14" height="14" rx="2" />
                              <circle cx="6.5" cy="6.5" r="1.5" />
                              <path d="M2 12l4-4 3 3 2-2 5 5" />
                            </svg>
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#0E0D09' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#5C5B54', marginTop: '0.125rem' }}>
                          {p.unit}
                        </div>
                      </td>

                      {/* Category badge */}
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.625rem',
                            background: catStyle.bg,
                            color: catStyle.color,
                            borderRadius: '2rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            textTransform: 'capitalize',
                          }}
                        >
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td
                        style={{
                          padding: '0.875rem 1.25rem',
                          fontSize: '0.9375rem',
                          color: '#0E0D09',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ${p.price.toFixed(2)}
                      </td>

                      {/* Stock */}
                      <td
                        style={{
                          padding: '0.875rem 1.25rem',
                          fontSize: '0.9375rem',
                          color: p.stock_quantity < 5 ? '#C4813A' : '#0E0D09',
                          fontWeight: p.stock_quantity < 5 ? 500 : 400,
                        }}
                      >
                        {p.stock_quantity}
                      </td>

                      {/* Featured */}
                      <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.9375rem' }}>
                        {p.featured ? '★' : '—'}
                      </td>

                      {/* Active dot */}
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <span
                          style={{
                            fontSize: '1.25rem',
                            color: p.active ? '#2D5A16' : '#C4813A',
                            lineHeight: 1,
                          }}
                        >
                          ●
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            style={{
                              padding: '0.4rem 0.875rem',
                              background: '#2D5A16',
                              color: '#fff',
                              borderRadius: '0.375rem',
                              textDecoration: 'none',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleToggleActive(p)}
                            disabled={deleting === p.id}
                            style={{
                              padding: '0.4rem 0.875rem',
                              background: p.active
                                ? 'rgba(200,0,0,0.08)'
                                : 'rgba(45,90,22,0.08)',
                              color: p.active ? '#c00' : '#2D5A16',
                              border: `1px solid ${p.active ? 'rgba(200,0,0,0.2)' : 'rgba(45,90,22,0.2)'}`,
                              borderRadius: '0.375rem',
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              cursor: deleting === p.id ? 'not-allowed' : 'pointer',
                              whiteSpace: 'nowrap',
                              opacity: deleting === p.id ? 0.6 : 1,
                            }}
                          >
                            {deleting === p.id ? '…' : p.active ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div
        className="products-cards"
        style={{
          flexDirection: 'column',
          gap: '1rem',
          display: 'none',
        }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  border: '1px solid rgba(14,13,9,0.08)',
                }}
              >
                <div
                  style={{
                    height: 18,
                    width: '60%',
                    background: 'rgba(14,13,9,0.06)',
                    borderRadius: '0.25rem',
                    marginBottom: '0.5rem',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    height: 14,
                    width: '40%',
                    background: 'rgba(14,13,9,0.06)',
                    borderRadius: '0.25rem',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            ))
          : filtered.map((p) => {
              const catStyle = CATEGORY_COLORS[p.category] ?? { bg: '#eee', color: '#333' }
              return (
                <div
                  key={p.id}
                  style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    border: '1px solid rgba(14,13,9,0.08)',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Thumbnail */}
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: 'rgba(14,13,9,0.08)',
                        borderRadius: '0.5rem',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 18 18"
                        fill="none"
                        stroke="#5C5B54"
                        strokeWidth="1.5"
                      >
                        <rect x="2" y="2" width="14" height="14" rx="2" />
                        <circle cx="6.5" cy="6.5" r="1.5" />
                        <path d="M2 12l4-4 3 3 2-2 5 5" />
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: '#0E0D09',
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          padding: '0.15rem 0.5rem',
                          background: catStyle.bg,
                          color: catStyle.color,
                          borderRadius: '2rem',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          textTransform: 'capitalize',
                        }}
                      >
                        {p.category}
                      </span>
                      <span
                        style={{
                          fontSize: '1rem',
                          color: p.active ? '#2D5A16' : '#C4813A',
                        }}
                      >
                        ●
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        color: '#5C5B54',
                        marginBottom: '0.75rem',
                      }}
                    >
                      ${p.price.toFixed(2)} · {p.unit} · Stock: {p.stock_quantity}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        style={{
                          padding: '0.4rem 0.875rem',
                          background: '#2D5A16',
                          color: '#fff',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggleActive(p)}
                        disabled={deleting === p.id}
                        style={{
                          padding: '0.4rem 0.875rem',
                          background: p.active ? 'rgba(200,0,0,0.08)' : 'rgba(45,90,22,0.08)',
                          color: p.active ? '#c00' : '#2D5A16',
                          border: `1px solid ${p.active ? 'rgba(200,0,0,0.2)' : 'rgba(45,90,22,0.2)'}`,
                          borderRadius: '0.375rem',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          cursor: deleting === p.id ? 'not-allowed' : 'pointer',
                          opacity: deleting === p.id ? 0.6 : 1,
                        }}
                      >
                        {deleting === p.id ? '…' : p.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

        {!loading && filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#5C5B54', padding: '2rem 0' }}>
            {search ? 'No products match your search.' : 'No products yet.'}
          </p>
        )}
      </div>
    </div>
  )
}
