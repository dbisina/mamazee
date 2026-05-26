'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    router.push('/admin')
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      {/* Hero background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="/hero.png"
          alt=""
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'brightness(0.28) saturate(0.55)',
            transform: 'scale(1.04)',
          }}
        />
        {/* Warm olive tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(20,14,4,0.55) 0%, rgba(8,18,5,0.4) 100%)',
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#F8F4EE',
          borderRadius: '1.25rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 24px 64px rgba(8,14,4,0.45)',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '2.25rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '2.25rem',
              fontWeight: 600,
              color: '#0E0D09',
              margin: 0,
              letterSpacing: '0.01em',
              lineHeight: 1,
            }}
          >
            Mamazee
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.625rem',
              fontWeight: 500,
              color: '#C4813A',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              display: 'block',
              marginTop: '0.35rem',
            }}
          >
            Admin Portal
          </span>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              background: 'rgba(185,28,28,0.06)',
              border: '1px solid rgba(185,28,28,0.2)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              color: '#b91c1c',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="email"
              suppressHydrationWarning
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: '#8a8978',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              suppressHydrationWarning
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1.5px solid rgba(14,13,9,0.14)',
                background: '#fff',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.9375rem',
                color: '#0E0D09',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label
              htmlFor="password"
              suppressHydrationWarning
              style={{
                display: 'block',
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: '#8a8978',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              suppressHydrationWarning
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1.5px solid rgba(14,13,9,0.14)',
                background: '#fff',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.9375rem',
                color: '#0E0D09',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading ? '#4a7a2e' : '#2D5A16',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
