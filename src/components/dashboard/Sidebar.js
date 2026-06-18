'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '⊞',
    href: '/dashboard',
  },
  {
    id: 'home',
    label: 'Home Management',
    icon: '⌂',
    children: [
      { label: 'Banner Management', href: '/dashboard/home/banner' },
      { label: 'Home Page About', href: '/dashboard/home/about' },
      { label: 'Why Choose', href: '/dashboard/home/why-choose' },
      { label: 'Some CTA', href: '/dashboard/home/cta-one' },
      { label: 'Certifications', href: '/dashboard/home/certifications' },
      { label: 'Our Work', href: '/dashboard/home/our-work' },
      { label: 'Something CTA', href: '/dashboard/home/cta-two' },
      { label: 'Heading Text', href: '/dashboard/home/heading-text' },
      { label: 'Homepage SEO', href: '/dashboard/home/seo' },
    ],
  },
  {
    id: 'about',
    label: 'About Us Management',
    icon: '◉',
    children: [
      { label: 'Corporate Overview', href: '/dashboard/about/corporate-overview' },
      { label: 'Holding Group Company', href: '/dashboard/about/holding-group' },
      { label: 'Vision & Mission', href: '/dashboard/about/vision-mission' },
      { label: 'SEO Tags (About)', href: '/dashboard/about/seo' },
    ],
  },
  {
    id: 'products',
    label: 'Product Management',
    icon: '▦',
    children: [
      { label: 'Product Categories', href: '/dashboard/products/categories' },
      { label: 'All Products', href: '/dashboard/products' },
      { label: 'Product SEO', href: '/dashboard/products/seo' },
    ],
  },
  {
    id: 'blogs',
    label: 'Blogs Management',
    icon: '✎',
    children: [
      { label: 'All Blogs', href: '/dashboard/blogs' },
      { label: 'Add Blog', href: '/dashboard/blogs/add' },
    ],
  },
  {
    id: 'enquiries',
    label: 'Enquiry Management',
    icon: '✉',
    href: '/dashboard/enquiries',
  },
  {
    id: 'gallery',
    label: 'Gallery Management',
    icon: '⊞',
    children: [
      { label: 'Albums', href: '/dashboard/gallery' },
      { label: 'Upload Images', href: '/dashboard/gallery/upload' },
    ],
  },
  {
    id: 'team',
    label: 'Team Management',
    icon: '☻',
    children: [
      { label: 'Team Members', href: '/dashboard/team' },
      { label: 'Job Openings', href: '/dashboard/team/jobs' },
    ],
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: '✦',
    href: '/dashboard/certifications',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙',
    href: '/dashboard/settings',
  },
]

export default function Sidebar({ collapsed }) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState(() => {
    // Auto-open menu that contains active path
    const open = {}
    NAV.forEach(item => {
      if (item.children) {
        if (item.children.some(c => pathname.startsWith(c.href))) {
          open[item.id] = true
        }
      }
    })
    return open
  })

  function toggleMenu(id) {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (collapsed) return null

  return (
    <aside className="sidebar">
      {/* User panel */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">A</div>
        <span className="sidebar-username">Administrator</span>
        <span className="sidebar-email">admin@jindalmetal.com</span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: '20px' }}>
        <div className="sidebar-nav-label">Navigation</div>

        {NAV.map(item => {
          const isActive = item.href ? pathname === item.href : item.children?.some(c => pathname.startsWith(c.href))
          const isOpen = openMenus[item.id]

          if (item.href) {
            return (
              <Link key={item.id} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            )
          }

          return (
            <div key={item.id}>
              <div
                className={`nav-item ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`}
                onClick={() => toggleMenu(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                <span className="nav-arrow">›</span>
              </div>
              {isOpen && (
                <div className="nav-submenu">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`nav-subitem ${pathname === child.href || pathname.startsWith(child.href + '/') ? 'active' : ''}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse toggle at bottom */}
      <div style={{ padding: '10px', borderTop: '1px solid #1a2226', textAlign: 'center' }}>
        <span style={{ fontSize: '11px', color: '#4b6472' }}>AdminLTE v2 Style</span>
      </div>
    </aside>
  )
}
