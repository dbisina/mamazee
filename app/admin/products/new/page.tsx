'use client'

import { useRef, useState } from 'react'
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

function slugify(name: string, unit: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  const unitPart = unit
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
  return unitPart ? `${base}-${unitPart}` : base
}

export default function NewProductPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

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
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY ?? ''

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 4000)
  }

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      // auto-generate id from name + unit
      if (field === 'name' || field === 'unit') {
        next.id = slugify(
          field === 'name' ? (value as string) : prev.name,
          field === 'unit' ? (value as string) : prev.unit
        )
      }
      return next
    })
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
    if (!form.id || !form.name) {
      showToast('error', 'Name and ID are required.')
      return
    }
    setSubmitting(true)
    try {
      const body = {
        id: form.id,
        name: form.name,
        category: form.category,
        price: parseFloat(form.price) || 0,
        unit: form.unit,
        description: form.description,
        tag: form.tag || null,
        featured: form.featured,
        stock_quantity: parseInt(form.stock_quantity, 10) || 0,
        image: form.image,
        active: true,
      }
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        showToast('error', err.error ?? 'Failed to create product.')
        return
      }
      showToast('success', 'Product created!')
      setTimeout(() => router.push('/admin/products'), 1000)
    } catch {
      showToast('error', 'Network error.')
    } finally {
      setSubmitting(false)
    }
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
          Admin / Products / New
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
          Add Product
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
              placeholder="e.g. Palm Oil"
              style={inputStyle}
            />
          </div>

          {/* ID */}
          <div>
            <label style={labelStyle}>Product ID (slug, e.g. palm-oil-1l)</label>
            <input
              type="text"
              value={form.id}
              onChange={(e) => handleChange('id', e.target.value)}
              placeholder="auto-generated from name + unit"
              style={inputStyle}
            />
          </div>

          {/* Category + Tag row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ textTransform: 'capitalize' }}>
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

          {/* Price + Unit row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Price (AUD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="0.00"
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
              placeholder="Short product description…"
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>

          {/* Featured */}
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
              Featured product (shown on homepage)
            </label>
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

            {/* Preview */}
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

          {/* Submit */}
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
              {submitting ? 'Saving…' : 'Create Product'}
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

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 540px) {
          form > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
