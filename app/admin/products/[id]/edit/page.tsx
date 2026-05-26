'use client'

import { useRef, useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['pantry', 'spices', 'snacks', 'beauty'] as const
const TAGS = ['', 'Bestseller', 'Popular', 'New', 'Organic'] as const

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#5C5B54',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '0.375rem',
}

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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: 'pantry' as (typeof CATEGORIES)[number],
    price: '',
    unit: '',
    description: '',
    tag: '',
    featured: false,
    stock_quantity: '0',
    image: '',
    active: true,
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? ''

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) { setNotFound(true); return }
        const p = await res.json() as Product
        setForm({
          id: p.id,
          name: p.name,
          category: p.category,
          price: String(p.price),
          unit: p.unit,
          description: p.description ?? '',
          tag: p.tag ?? '',
          featured: p.featured,
          stock_quantity: String(p.stock_quantity),
          image: p.image ?? '',
          active: p.active,
        })
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json() as { url: string }
      setForm((prev) => ({ ...prev, image: url }))
      showToast('success', 'Image uploaded.')
    } catch {
      showToast('error', 'Image upload failed.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price) || 0,
        unit: form.unit,
        description: form.description,
        tag: form.tag || null,
        featured: form.featured,
        stock_quantity: parseInt(form.stock_quantity, 10) || 0,
        image: form.image,
        active: form.active,
      }
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        showToast('error', err.error ?? 'Failed to update product.')
        return
      }
      showToast('success', 'Product updated!')
      setTimeout(() => router.push('/admin/products'), 1000)
    } catch {
      showToast('error', 'Network error.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${form.name}"? This will deactivate it from the shop.`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': ADMIN_KEY },
      })
      if (!res.ok) {
        showToast('error', 'Failed to delete product.')
        return
      }
      showToast('success', 'Product deactivated.')
      setTimeout(() => router.push('/admin/products'), 1000)
    } catch {
      showToast('error', 'Network error.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', maxWidth: 720 }}>
        <style>{`
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
        {[200, 400, 300, 360, 260].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? 48 : 18,
              width: w,
              background: 'rgba(14,13,9,0.07)',
              borderRadius: '0.375rem',
              marginBottom: '1.25rem',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ fontSize: '1.125rem', color: '#0E0D09', marginBottom: '1rem' }}>Product not found.</p>
        <Link
          href="/admin/products"
          style={{ color: '#2D5A16', textDecoration: 'underline', fontSize: '0.9375rem' }}
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', maxWidth: 720 }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 9999,
            padding: '0.875rem 1.25rem',
            borderRadius: '0.625rem',
            background: toast.type === 'success' ? '#2D5A16' : '#c00',
            color: '#fff',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            maxWidth: 320,
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            color: '#5C5B54',
            textDecoration: 'none',
            marginBottom: '0.875rem',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2L4 7l5 5" />
          </svg>
          Back to Products
        </Link>
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
          Admin / Products / Edit
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
          Edit Product
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* ID (read-only for edits) */}
          <div>
            <label style={labelStyle}>Product ID (slug)</label>
            <input
              type="text"
              value={form.id}
              readOnly
              style={{ ...inputStyle, background: 'rgba(14,13,9,0.04)', color: '#5C5B54', cursor: 'not-allowed' }}
            />
          </div>

          {/* Category + Tag */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tag</label>
              <select
                value={form.tag}
                onChange={(e) => handleChange('tag', e.target.value)}
                style={inputStyle}
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t || '— None —'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price + Unit */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Price (AUD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Unit</label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                placeholder="e.g. 500g, 1L"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label style={labelStyle}>Stock Quantity</label>
            <input
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={(e) => handleChange('stock_quantity', e.target.value)}
              style={{ ...inputStyle, maxWidth: 200 }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          {/* Featured + Active */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => handleChange('featured', e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#2D5A16', cursor: 'pointer' }}
              />
              <label
                htmlFor="featured"
                style={{
                  fontSize: '0.9375rem',
                  color: '#0E0D09',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}
              >
                Featured
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={(e) => handleChange('active', e.target.checked)}
                style={{ width: 18, height: 18, accentColor: '#2D5A16', cursor: 'pointer' }}
              />
              <label
                htmlFor="active"
                style={{
                  fontSize: '0.9375rem',
                  color: '#0E0D09',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}
              >
                Active (visible in shop)
              </label>
            </div>
          </div>

          {/* Image */}
          <div>
            <label style={labelStyle}>Product Image</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://res.cloudinary.com/…"
                style={{ ...inputStyle, flex: 1, minWidth: 200 }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: uploading ? 'rgba(14,13,9,0.06)' : '#fff',
                  border: '1.5px solid rgba(14,13,9,0.2)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  color: '#0E0D09',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexShrink: 0,
                }}
              >
                {uploading ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        border: '2px solid rgba(14,13,9,0.15)',
                        borderTopColor: '#0E0D09',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                      }}
                    />
                    Uploading…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 1v8M4 4l3-3 3 3" />
                      <path d="M1 11h12v2H1z" />
                    </svg>
                    Upload Image
                  </>
                )}
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {form.image && (
              <div style={{ marginTop: '0.75rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(14,13,9,0.12)',
                    display: 'block',
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit buttons */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '0.875rem 2rem',
                background: submitting ? 'rgba(45,90,22,0.5)' : '#2D5A16',
                color: '#fff',
                border: 'none',
                borderRadius: '0.625rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontWeight: 500,
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Saving…' : 'Save Changes'}
            </button>
            <Link
              href="/admin/products"
              style={{
                padding: '0.875rem 1.5rem',
                background: 'transparent',
                color: '#5C5B54',
                border: '1.5px solid rgba(14,13,9,0.15)',
                borderRadius: '0.625rem',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {/* Danger zone */}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(14,13,9,0.1)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#c00',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}
        >
          Danger Zone
        </h3>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '0.75rem 1.5rem',
            background: deleting ? 'rgba(200,0,0,0.1)' : 'transparent',
            color: '#c00',
            border: '1.5px solid rgba(200,0,0,0.3)',
            borderRadius: '0.625rem',
            fontSize: '0.9375rem',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontWeight: 500,
            cursor: deleting ? 'not-allowed' : 'pointer',
            opacity: deleting ? 0.6 : 1,
          }}
        >
          {deleting ? 'Deleting…' : 'Delete Product'}
        </button>
        <p style={{ fontSize: '0.8125rem', color: '#5C5B54', marginTop: '0.5rem' }}>
          This soft-deletes the product (marks it inactive). Recoverable from Supabase Studio.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 540px) {
          form > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
