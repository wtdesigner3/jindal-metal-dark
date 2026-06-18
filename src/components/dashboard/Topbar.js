'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Topbar({ onToggleSidebar }) {
  const router = useRouter()
  const [dropOpen, setDropOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function logout() {
    localStorage.removeItem('admin_logged_in')
    router.push('/login')
  }

  return (
    <header className="topbar">
      <button className="topbar-toggle" onClick={onToggleSidebar} title="Toggle Sidebar">
        ☰
      </button>
      <a href="/dashboard" className="topbar-brand">
        <span style={{ fontSize: '18px' }}>⬡</span>
        Jindal Metal Admin
      </a>

      <div className="topbar-right" ref={ref}>
        <div className="topbar-user" onClick={() => setDropOpen(!dropOpen)}>
          <div className="topbar-user-avatar">A</div>
          <span>Executive Dentist</span>
          <span style={{ fontSize: '10px', marginLeft: '2px' }}>▾</span>
        </div>
        {dropOpen && (
          <div style={{
            position: 'absolute', top: '50px', right: '12px',
            background: '#fff', border: '1px solid #d2d6de',
            borderRadius: '3px', minWidth: '160px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 200,
          }}>
            <a href="/dashboard/settings" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', color: '#444', fontSize: '13px', textDecoration: 'none', borderBottom: '1px solid #f0f0f0' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              ⚙ Settings
            </a>
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '9px 14px', color: '#dd4b39', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              ⏻ Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
