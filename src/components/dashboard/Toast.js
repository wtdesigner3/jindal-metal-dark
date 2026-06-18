'use client'
import { useEffect } from 'react'

export default function Toast({ toasts = [], onRemove }) {
  useEffect(() => {
    if (toasts.length === 0) return
    const t = setTimeout(() => onRemove(toasts[0].id), 3000)
    return () => clearTimeout(t)
  }, [toasts, onRemove])

  if (toasts.length === 0) return null

  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type || 'success'}`}>
          <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '⚠'}</span>
          <span style={{ flex: 1 }}>{t.message}</span>
          <button onClick={() => onRemove(t.id)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>×</button>
        </div>
      ))}
    </div>
  )
}
