'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../globals.css'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    // Replace with: POST /api/auth/login
    await new Promise(r => setTimeout(r, 700))
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true')
      router.push('/dashboard')
    } else {
      setError('Invalid username or password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a2226', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* BG pattern */}
      <div style={{ position: 'fixed', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, background: '#3c8dbc', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 14, boxShadow: '0 4px 20px rgba(60,141,188,0.4)' }}>⬡</div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Jindal Metal Admin</h1>
          <p style={{ color: '#8aa4af', fontSize: 13, marginTop: 5 }}>Sign in to continue</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 4, boxShadow: '0 4px 30px rgba(0,0,0,0.35)', overflow: 'hidden' }}>
          {/* Header bar */}
          <div style={{ background: '#3c8dbc', padding: '14px 20px' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>🔒 Administrator Login</div>
          </div>

          <form onSubmit={handleLogin} style={{ padding: '24px 24px 20px' }}>
            {error && (
              <div style={{ background: '#fff2f0', border: '1px solid #ffcdd2', color: '#c62828', borderRadius: 3, padding: '9px 13px', fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚠ {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: 15 }}>👤</span>
                <input className="form-control" style={{ paddingLeft: 34 }} value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Enter username" required autoComplete="username" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: 15 }}>🔑</span>
                <input className="form-control" style={{ paddingLeft: 34, paddingRight: 36 }} type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter password" required autoComplete="current-password" />
                <button type="button" onClick={() => setShowPwd(p => !p)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: 15 }}>{showPwd ? '🙈' : '👁'}</button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: 14, marginTop: 4 }}>
              {loading ? '⏳ Signing in...' : '→ Sign In'}
            </button>
          </form>

          <div style={{ padding: '10px 24px 16px', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: '#aaa' }}>Demo: admin / admin123</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18, color: '#4b6472', fontSize: 12 }}>
          Jindal Metals & Alloys Ltd. © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
