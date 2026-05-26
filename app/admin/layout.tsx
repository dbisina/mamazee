'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 4L8 1 3 4v6l5 3 5-3V4z" />
        <path d="M8 1v12M3 4l5 3 5-3" />
      </svg>
    ),
  },
  {
    href: '/admin/orders',
    label: 'Orders',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="1" width="12" height="14" rx="1" />
        <path d="M5 5h6M5 8h6M5 11h4" />
      </svg>
    ),
  },
  {
    href: '/admin/customers',
    label: 'Customers',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="5" r="3" />
        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" />
      </svg>
    ),
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const sidebar = (
    <aside
      style={{
        width: 240,
        minHeight: '100vh',
        background: '#0E0D09',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '0 1.5rem 2rem' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#F8F4EE',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            display: 'block',
          }}
        >
          Mamazee
        </Link>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.625rem',
            fontWeight: 500,
            color: '#C4813A',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            display: 'block',
            marginTop: '0.125rem',
          }}
        >
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {NAV.map(({ href, label, icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.875rem',
                borderRadius: '0.5rem',
                marginBottom: '0.125rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.875rem',
                fontWeight: active ? 500 : 400,
                color: active ? '#F8F4EE' : '#6b6a5e',
                background: active ? 'rgba(248,244,238,0.09)' : 'transparent',
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {icon}
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '1rem 1.5rem 0' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.6rem 1rem',
            background: 'transparent',
            border: '1px solid rgba(248,244,238,0.15)',
            borderRadius: '0.5rem',
            color: '#8a8978',
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F4EE' }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop" style={{ width: 240, flexShrink: 0 }}>
        {sidebar}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(14,13,9,0.5)',
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className="admin-sidebar-mobile"
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : -240,
          zIndex: 50,
          transition: 'left 0.25s ease',
        }}
      >
        {sidebar}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar */}
        <div
          className="admin-topbar-mobile"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: '#0E0D09',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#F8F4EE',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="16" x2="19" y2="16" />
            </svg>
          </button>
          <span
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.375rem',
              fontWeight: 600,
              color: '#F8F4EE',
            }}
          >
            Mamazee
          </span>
        </div>

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: 'clamp(2rem, 4vw, 3rem)',
            minHeight: '100vh',
            background: '#F8F4EE',
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-sidebar-mobile { display: block !important; }
          .admin-topbar-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
