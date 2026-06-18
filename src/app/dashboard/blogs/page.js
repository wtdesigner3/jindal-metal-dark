'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import Link from 'next/link'

const INIT = [
  { id: 1, title: 'Understanding SS Grades: 304 vs 316', slug: 'understanding-ss-grades-304-vs-316', category: 'Technical', author: 'Admin', excerpt: 'A detailed comparison of the most popular stainless steel grades.', date: '2024-01-10', status: 'published' },
  { id: 2, title: 'Cold Rolling Process Explained', slug: 'cold-rolling-process-explained', category: 'Manufacturing', author: 'Admin', excerpt: 'An inside look at how precision strips are made.', date: '2024-01-05', status: 'published' },
  { id: 3, title: 'H&T Steel in Automotive Applications', slug: 'ht-steel-automotive', category: 'Application', author: 'Admin', excerpt: 'How hardened & tempered steel strips are used in springs and blades.', date: '2023-12-20', status: 'draft' },
  { id: 4, title: 'Ultra-Thin Foils for Medical Devices', slug: 'ultra-thin-foils-medical', category: 'Application', author: 'Admin', excerpt: 'Medical grade ultra-thin foils demand exceptional precision.', date: '2023-12-15', status: 'published' },
]

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState(INIT)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  const filtered = blogs.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || b.status === filter
    return matchSearch && matchFilter
  })

  function handleDelete(id) {
    if (!confirm('Delete this blog post?')) return
    setBlogs(b => b.filter(x => x.id !== id))
    addToast('Blog post deleted.', 'warning')
  }

  function toggleStatus(id) {
    setBlogs(b => b.map(x => x.id === id ? { ...x, status: x.status === 'published' ? 'draft' : 'published' } : x))
    addToast('Status updated.')
  }

  return (
    <div>
      <Breadcrumb title="Blogs Management" crumbs={[{ label: 'Blogs Management' }, { label: 'All Blogs' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">✎ All Blog Posts ({blogs.length})</span>
            <Link href="/dashboard/blogs/add" className="btn btn-primary btn-sm">+ New Post</Link>
          </div>
          <div className="box-body" style={{ paddingBottom: 0 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              <input className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search posts..." style={{ maxWidth: 280 }} />
              <div style={{ display: 'flex', gap: 6 }}>
                {['all', 'published', 'draft'].map(s => (
                  <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-default'}`} onClick={() => setFilter(s)} style={{ textTransform: 'capitalize' }}>{s}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead>
                  <tr><th>#</th><th>Title</th><th>Category</th><th>Slug</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', color: '#999', padding: 30 }}>No posts found</td></tr>}
                  {filtered.map((blog, i) => (
                    <tr key={blog.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{blog.title}</div>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{blog.excerpt}</div>
                      </td>
                      <td><span className="badge badge-info">{blog.category}</span></td>
                      <td style={{ fontSize: 11, fontFamily: 'monospace', color: '#666' }}>{blog.slug}</td>
                      <td style={{ fontSize: 12, color: '#999' }}>{blog.date}</td>
                      <td>
                        <div className="toggle-wrap">
                          <div className={`toggle ${blog.status === 'published' ? 'on' : ''}`} onClick={() => toggleStatus(blog.id)}><div className="toggle-knob" /></div>
                          <span className={`badge badge-${blog.status === 'published' ? 'success' : 'warning'}`}>{blog.status}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Link href={`/dashboard/blogs/add?id=${blog.id}`} className="btn btn-warning btn-xs">✎ Edit</Link>
                          <button className="btn btn-danger btn-xs" onClick={() => handleDelete(blog.id)}>✕ Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
