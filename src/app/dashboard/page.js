'use client'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/dashboard/Breadcrumb'
import Link from 'next/link'

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    function update() {
      const now = new Date()
      const t = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      const d = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' })
      setTime(`${t} | ${d}`)
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="datetime-badge">
      <span>📅</span>
      {time}
    </div>
  )
}

const STAT_BOXES = [
  { label: 'Total Banners', value: '4', icon: '🖼', color: 'bg-orange', link: '/dashboard/home/banner', footer: 'View Detail' },
  { label: 'Total Products', value: '34', icon: '▦', color: 'bg-blue', link: '/dashboard/products', footer: 'View Detail' },
  { label: 'Total Blogs', value: '19', icon: '✎', color: 'bg-green', link: '/dashboard/blogs', footer: 'View Detail' },
  { label: 'Total Enquiries', value: '248', icon: '✉', color: 'bg-red', link: '/dashboard/enquiries', footer: 'View Detail' },
  { label: 'Gallery Images', value: '127', icon: '⊞', color: 'bg-purple', link: '/dashboard/gallery', footer: 'View Detail' },
  { label: 'Team Members', value: '9', icon: '☻', color: 'bg-teal', link: '/dashboard/team', footer: 'View Detail' },
  { label: 'Why Choose Items', value: '6', icon: '✦', color: 'bg-dark', link: '/dashboard/home/why-choose', footer: 'View Detail' },
  { label: 'Certifications', value: '7', icon: '◉', color: 'bg-orange', link: '/dashboard/certifications', footer: 'View Detail' },
]

const QUICK_EDIT = [
  { label: 'EDIT', title: 'WEBSITE DETAILS', desc: 'Update company info, SEO, and contact details', link: '/dashboard/settings' },
  { label: 'MANAGE', title: 'HOME PAGE CONTENT', desc: 'Banners, sections, CTAs, and headings', link: '/dashboard/home/banner' },
  { label: 'MANAGE', title: 'ABOUT US CONTENT', desc: 'Corporate overview, vision, and holding group', link: '/dashboard/about/corporate-overview' },
]

const RECENT_ENQUIRIES = [
  { id: 'ENQ-248', name: 'Rahul Sharma', company: 'Steel Corp India', product: 'Cold Rolled SS Strips', date: '2 hrs ago', status: 'new' },
  { id: 'ENQ-247', name: 'Priya Mehta', company: 'AutoParts Ltd', product: 'H&T Steel Strips', date: '5 hrs ago', status: 'replied' },
  { id: 'ENQ-246', name: 'James Wilson', company: 'UK Metals Co.', product: 'Ultra Thin Foils', date: '1 day ago', status: 'replied' },
  { id: 'ENQ-245', name: 'Ahmed Al-Farsi', company: 'Gulf Steel FZCO', product: 'SS Precision Strips', date: '2 days ago', status: 'closed' },
  { id: 'ENQ-244', name: 'Vivek Kumar', company: 'Textile Machines Ltd', product: 'Cold Rolled Strips', date: '3 days ago', status: 'new' },
]

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumb title="Dashboard" crumbs={[{ label: 'Dashboard' }]} />
      <div className="content-area">
        {/* Datetime */}
        <Clock />

        {/* Quick Edit Cards — matches reference design */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {QUICK_EDIT.map((card, i) => (
            <Link key={i} href={card.link} className="edit-card">
              <div>
                <div className="edit-card-label">{card.label}</div>
                <div className="edit-card-title">{card.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{card.desc}</div>
              </div>
              <div className="edit-card-action">Update Details →</div>
            </Link>
          ))}
        </div>

        {/* Stat info-boxes — matches reference orange/dark cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {STAT_BOXES.map((box, i) => (
            <Link key={i} href={box.link} className={`info-box ${box.color}`} style={{ textDecoration: 'none' }}>
              <div className="info-box-icon">{box.icon}</div>
              <div className="info-box-content">
                <span className="info-box-text">{box.label}</span>
                <div className="info-box-number">{box.value}</div>
                <span className="info-box-footer">{box.footer} →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Enquiries */}
        <div className="box">
          <div className="box-header">
            <span className="box-title">✉ Recent Enquiries</span>
            <Link href="/dashboard/enquiries" className="btn btn-primary btn-sm">View All</Link>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Product Interest</th>
                    <th>Received</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ENQUIRIES.map(enq => (
                    <tr key={enq.id}>
                      <td style={{ color: '#999', fontSize: '12px' }}>{enq.id}</td>
                      <td style={{ fontWeight: 600 }}>{enq.name}</td>
                      <td>{enq.company}</td>
                      <td>{enq.product}</td>
                      <td style={{ color: '#999', fontSize: '12px' }}>{enq.date}</td>
                      <td>
                        <span className={`badge badge-${enq.status === 'new' ? 'warning' : enq.status === 'replied' ? 'success' : 'primary'}`}>
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links grid */}
        <div className="box">
          <div className="box-header">
            <span className="box-title">⚡ Quick Navigation</span>
          </div>
          <div className="box-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {[
                { label: 'Add Banner', href: '/dashboard/home/banner' },
                { label: 'Edit About Section', href: '/dashboard/home/about' },
                { label: 'Why Choose Items', href: '/dashboard/home/why-choose' },
                { label: 'Homepage SEO', href: '/dashboard/home/seo' },
                { label: 'Corporate Overview', href: '/dashboard/about/corporate-overview' },
                { label: 'Vision & Mission', href: '/dashboard/about/vision-mission' },
                { label: 'Add Product', href: '/dashboard/products' },
                { label: 'Write Blog Post', href: '/dashboard/blogs' },
                { label: 'View Enquiries', href: '/dashboard/enquiries' },
                { label: 'Gallery Upload', href: '/dashboard/gallery' },
                { label: 'Manage Team', href: '/dashboard/team' },
                { label: 'Site Settings', href: '/dashboard/settings' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="btn btn-default" style={{ justifyContent: 'flex-start', fontSize: '12px' }}>
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
