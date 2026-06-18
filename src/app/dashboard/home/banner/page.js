'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'  
import Toast from '../../../../components/dashboard/Toast'
import FormField, { ImageField, StatusField, SortField } from '../../../../components/dashboard/FormField'

const INIT = [
  { id: 1, title: 'Precision Stainless Steel Strips', subtitle: 'Cold Rolled to Perfection', url: '/products/ss-strips', button_text: 'Explore Products', bnr_image: '', alt: 'Stainless steel strips manufacturing', status: 'active', sort: 1 },
  { id: 2, title: 'Ultra Thin Foils', subtitle: 'As thin as 0.01mm', url: '/products/ultra-thin-foils', button_text: 'View Products', bnr_image: '', alt: 'Ultra thin steel foils', status: 'active', sort: 2 },
  { id: 3, title: 'Hardened & Tempered Strips', subtitle: 'For industrial applications', url: '/products/ht-strips', button_text: 'Know More', bnr_image: '', alt: 'H&T steel strips', status: 'inactive', sort: 3 },
  { id: 4, title: 'ISO Certified Quality', subtitle: 'Quality you can trust', url: '/about', button_text: 'About Us', bnr_image: '', alt: 'ISO certified manufacturer', status: 'active', sort: 4 },
]

const EMPTY = { title: '', subtitle: '', url: '', button_text: '', bnr_image: '', alt: '', status: 'active', sort: '' }

function BannerModal({ banner, onClose, onSave }) {
  const [form, setForm] = useState(banner ? { ...banner } : { ...EMPTY })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h4>{banner ? 'Edit Banner' : 'Add New Banner'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <div className="grid-2">
              <FormField label="Title" required>
                <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} placeholder="Banner heading" required />
              </FormField>
              <FormField label="Subtitle">
                <input className="form-control" value={form.subtitle} onChange={e => f('subtitle', e.target.value)} placeholder="Sub-heading text" />
              </FormField>
            </div>
            <div className="grid-2">
              <FormField label="Button Text">
                <input className="form-control" value={form.button_text} onChange={e => f('button_text', e.target.value)} placeholder="e.g. Explore Products" />
              </FormField>
              <FormField label="Button URL">
                <input className="form-control" value={form.url} onChange={e => f('url', e.target.value)} placeholder="/products or https://..." />
              </FormField>
            </div>
            <FormField label="Banner Image" hint="Recommended: 1920×680px JPG/PNG">
              <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('bnr_image', URL.createObjectURL(e.target.files[0])) }} />
              {form.bnr_image && <img src={form.bnr_image} alt="preview" className="img-preview" style={{ width: '100%', height: '120px' }} />}
            </FormField>
            <FormField label="Image ALT Text" hint="For SEO and accessibility">
              <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} placeholder="Descriptive alt text" />
            </FormField>
            <div className="grid-2">
              <StatusField value={form.status} onChange={v => f('status', v)} />
              <SortField value={form.sort} onChange={v => f('sort', v)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">✓ Save Banner</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function BannerPage() {
  const [rows, setRows] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])

  function addToast(message, type = 'success') {
    setToasts(t => [...t, { id: Date.now(), message, type }])
  }

  function handleSave(form) {
    if (form.id) {
      setRows(r => r.map(x => x.id === form.id ? form : x))
      addToast('Banner updated successfully!')
    } else {
      setRows(r => [...r, { ...form, id: Date.now() }])
      addToast('Banner added successfully!')
    }
    setModal(null)
  }

  function handleDelete(id) {
    if (!confirm('Delete this banner?')) return
    // DELETE /api/banners/:id
    setRows(r => r.filter(x => x.id !== id))
    addToast('Banner deleted.', 'warning')
  }

  function toggleStatus(id) {
    setRows(r => r.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))
    addToast('Status updated.')
  }

  return (
    <div>
      <Breadcrumb title="Banner Management" crumbs={[{ label: 'Home Management' }, { label: 'Banner Management' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">🖼 All Banners</span>
            <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Banner</button>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Button</th>
                    <th>URL</th>
                    <th>Sort</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.sort((a, b) => a.sort - b.sort).map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.bnr_image ? <img src={row.bnr_image} className="table-img" alt={row.alt} /> : <div style={{ width: 50, height: 36, background: '#f0f0f0', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#ccc' }}>🖼</div>}</td>
                      <td style={{ fontWeight: 600, maxWidth: 180 }}>{row.title}</td>
                      <td style={{ color: '#777', fontSize: 12 }}>{row.subtitle}</td>
                      <td>{row.button_text}</td>
                      <td style={{ fontSize: 12, color: '#3c8dbc' }}>{row.url}</td>
                      <td style={{ textAlign: 'center' }}>{row.sort}</td>
                      <td>
                        <div className="toggle-wrap">
                          <div className={`toggle ${row.status === 'active' ? 'on' : ''}`} onClick={() => toggleStatus(row.id)}>
                            <div className="toggle-knob" />
                          </div>
                          <span className={`badge badge-${row.status === 'active' ? 'success' : 'danger'}`}>{row.status}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-warning btn-xs" onClick={() => setModal(row)}>✎ Edit</button>
                          <button className="btn btn-danger btn-xs" onClick={() => handleDelete(row.id)}>✕ Del</button>
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

      {modal && <BannerModal banner={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
