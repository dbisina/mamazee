'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/lib/products'

const TAGS = ['All', 'pantry', 'spices', 'snacks', 'beauty']
const TAG_LABELS: Record<string, string> = {
  All: 'All Products',
  pantry: 'Pantry Staples',
  spices: 'Spices & Peppers',
  snacks: 'Snacks & Drinks',
  beauty: 'Hair & Beauty',
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const { addItem, items, setQty } = useCart()
  const cartItem = items.find((i) => i.id === product.id)
  const qty = cartItem?.quantity ?? 0
  const outOfStock = (product.stock_quantity ?? 0) <= 0

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/5',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          background: '#EDE8DF',
          marginBottom: '1.25rem',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, filter 0.2s ease',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            opacity: outOfStock ? 0.5 : 1,
            filter: outOfStock ? 'grayscale(0.4)' : 'none',
          }}
        />

        {outOfStock && (
          <span
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              fontSize: '0.625rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '0.375rem 0.75rem',
              borderRadius: '100px',
              background: '#5C5B54',
              color: '#F8F4EE',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            Out of Stock
          </span>
        )}

        {!outOfStock && product.tag && (
          <span
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              fontSize: '0.625rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '0.375rem 0.75rem',
              borderRadius: '100px',
              background:
                product.tag === 'Bestseller'
                  ? '#2D5A16'
                  : product.tag === 'Organic'
                  ? '#C4813A'
                  : '#0E0D09',
              color: '#F8F4EE',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            }}
          >
            {product.tag}
          </span>
        )}

        {outOfStock && qty === 0 ? (
          <button
            disabled
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(calc(100% + 1rem))',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
              padding: '0.75rem 1.5rem',
              background: 'rgba(92,91,84,0.85)',
              color: '#F8F4EE',
              border: 'none',
              borderRadius: '100px',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'not-allowed',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              boxShadow: '0 8px 24px rgba(14,13,9,0.12)',
            }}
          >
            Out of Stock
          </button>
        ) : qty > 0 ? (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              background: '#2D5A16',
              borderRadius: '100px',
              boxShadow: '0 8px 24px rgba(14,13,9,0.18)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setQty(product.id, qty - 1) }}
              style={{ padding: '0.65rem 1rem', background: 'none', border: 'none', color: '#F8F4EE', fontSize: '1.1rem', lineHeight: 1, cursor: 'pointer', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 300 }}
            >
              −
            </button>
            <span style={{ minWidth: '1.75rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#F8F4EE', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
              {qty}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); if (qty < (product.stock_quantity ?? Infinity)) setQty(product.id, qty + 1) }}
              disabled={qty >= (product.stock_quantity ?? Infinity)}
              style={{ padding: '0.65rem 1rem', background: 'none', border: 'none', color: '#F8F4EE', fontSize: '1.1rem', lineHeight: 1, cursor: qty >= (product.stock_quantity ?? Infinity) ? 'not-allowed' : 'pointer', opacity: qty >= (product.stock_quantity ?? Infinity) ? 0.4 : 1, fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 300 }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              addItem({ id: product.id, name: product.name, price: product.price, unit: product.unit, image: product.image })
            }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: hovered ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(calc(100% + 1rem))',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
              padding: '0.75rem 1.5rem',
              background: '#F8F4EE',
              color: '#0E0D09',
              border: 'none',
              borderRadius: '100px',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              boxShadow: '0 8px 24px rgba(14,13,9,0.12)',
            }}
          >
            Add to Cart
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A0A097', marginBottom: '0.375rem', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
            {product.category}
          </p>
          <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(0.9375rem,1.5vw,1.1875rem)', fontWeight: 400, letterSpacing: '-0.01em', color: '#0E0D09', margin: 0, lineHeight: 1.2 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#5C5B54', marginTop: '0.375rem', lineHeight: 1.5, fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 300 }}>
            {product.unit}
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(0.9375rem,1.5vw,1.125rem)', fontWeight: 500, color: '#2D5A16', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeTag, setActiveTag] = useState('All')
  const bp = useBreakpoint()
  const isMobile = bp === 'foldable' || bp === 'mobile' || bp === 'phablet'
  const cols =
    bp === 'foldable' || bp === 'mobile' || bp === 'phablet' ? '1fr' :
    bp === 'foldable-open' ? '1fr 1fr' :
    bp === 'tablet' ? 'repeat(3, 1fr)' :
    'repeat(4, 1fr)'

  const filtered = useMemo(
    () => activeTag === 'All' ? initialProducts : initialProducts.filter((p) => p.category === activeTag),
    [activeTag, initialProducts]
  )

  return (
    <div style={{ background: '#F8F4EE', minHeight: '100vh' }}>
      <Nav />

      {/* Page header */}
      <div
        style={{
          paddingTop: 'clamp(8rem,14vw,11rem)',
          paddingBottom: 'clamp(3rem,5vw,5rem)',
          paddingLeft: 'clamp(1.5rem,4vw,4rem)',
          paddingRight: 'clamp(1.5rem,4vw,4rem)',
          background: '#0E0D09',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(6rem,18vw,18rem)',
            fontWeight: 300,
            color: 'rgba(248,244,238,0.03)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          Shop
        </div>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4813A', marginBottom: '1rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 500 }}>
            Mamazee Store
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem,7vw,6rem)', fontWeight: 400, letterSpacing: '-0.03em', color: '#F8F4EE', margin: 0, lineHeight: 0.95 }}>
            Our <span style={{ fontStyle: 'italic', color: '#C4813A' }}>Collection.</span>
          </h1>
          <p style={{ marginTop: '1.5rem', fontSize: 'clamp(0.9375rem,1.5vw,1.0625rem)', color: 'rgba(248,244,238,0.55)', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 300, maxWidth: '480px' }}>
            {initialProducts.length} authentic Nigerian products. Sourced directly, delivered fresh.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 50,
          background: 'rgba(248,244,238,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(14,13,9,0.08)',
          padding: '0 clamp(1.5rem,4vw,4rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            gap: isMobile ? '0.5rem' : '0.25rem',
            overflowX: 'auto',
            paddingBottom: '1px',
            scrollbarWidth: 'none',
          }}
        >
          {TAGS.map((tag) => {
            const count = tag === 'All' ? initialProducts.length : initialProducts.filter(p => p.category === tag).length
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTag === tag ? '2px solid #2D5A16' : '2px solid transparent',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: activeTag === tag ? '#2D5A16' : '#5C5B54',
                  fontWeight: activeTag === tag ? 500 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                }}
              >
                {TAG_LABELS[tag]}
                <span style={{ marginLeft: '0.5rem', fontSize: '0.625rem', opacity: 0.6 }}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Product grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,4rem)' }}>
        {filtered.length === 0 ? (
          <p style={{ color: '#5C5B54', fontSize: '1rem', textAlign: 'center', padding: '4rem 0' }}>
            No products in this category yet.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 'clamp(1.25rem,2vw,2.5rem)' }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div
          style={{
            marginTop: '5rem',
            padding: 'clamp(2.5rem,5vw,4rem)',
            background: '#1A3A0A',
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <div>
            <p style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4813A', marginBottom: '0.75rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontWeight: 500 }}>
              Can&apos;t find what you need?
            </p>
            <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 400, color: '#F8F4EE', margin: 0, letterSpacing: '-0.02em' }}>
              Send us your shopping list on WhatsApp
            </h3>
          </div>
          <a
            href="https://wa.me/61468324309"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: '#25D366',
              color: '#fff',
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
              borderRadius: '100px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              flexShrink: 0,
            }}
          >
            WhatsApp Order
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
