'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import "../../components/dashboard/dashboard.css"
export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const ok = localStorage.getItem('admin_logged_in')
    if (!ok) router.push('/login')
  }, [router])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f9' }}>
      {!sidebarCollapsed && <Sidebar />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar onToggleSidebar={() => setSidebarCollapsed(p => !p)} />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
