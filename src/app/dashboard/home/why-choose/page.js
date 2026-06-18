'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = [
  { id: 1, icon: '🏭', title: 'State-of-the-Art Facility', content: '<p>Our manufacturing plant is equipped with the latest cold rolling technology ensuring consistent quality.</p>', status: 'active', sort: 1 },
  { id: 2, icon: '✦', title: 'ISO Certified Quality', content: '<p>ISO 9001, 14001 and 45001 certified for quality, environment and safety management systems.</p>', status: 'active', sort: 2 },
  { id: 3, icon: '🌍', title: 'Global Exports', content: '<p>Exporting to 40+ countries across Europe, Middle East, and Asia with on-time reliable delivery.</p>', status: 'active', sort: 3 },
  { id: 4, icon: '📐', title: 'Ultra Precision', content: '<p>Thickness tolerances as tight as ±0.001mm for the most demanding industrial applications.</p>', status: 'active', sort: 4 },
  { id: 5, icon: '⏱', title: 'On-Time Delivery', content: '<p>Reliable production planning and logistics ensure your order reaches you on schedule.</p>', status: 'active', sort: 5 },
  { id: 6, icon: '🤝', title: 'Customer First', content: '<p>Dedicated technical support and customer service team available to guide you at every step.</p>', status: 'active', sort: 6 },
]
const EMPTY = { icon: '', title: '', content: '', status: 'active', sort: '' }

function ItemModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <h4>{item ? 'Edit Why Choose Item' : 'Add Why Choose Item'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <div className="grid-2">
              <FormField label="Icon" hint="Emoji, icon class or SVG">
                <input className="form-control" value={form.icon} onChange={e => f('icon', e.target.value)} placeholder="e.g. 🏭 or fa-factory" />
              </FormField>
              <FormField label="Title" required>
                <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required />
              </FormField>
            </div>
            <FormField label="Content" required hint="Supports rich text formatting">
              <RichEditor value={form.content} onChange={v => f('content', v)} placeholder="Describe this point..." minHeight={150} />
            </FormField>
            <div className="grid-2" style={{ marginTop: 8 }}>
              <StatusField value={form.status} onChange={v => f('status', v)} />
              <SortField value={form.sort} onChange={v => f('sort', v)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">✓ Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function WhyChoosePage() {
  const [rows, setRows] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleSave(form) {
    if (form.id) setRows(r => r.map(x => x.id === form.id ? form : x))
    else setRows(r => [...r, { ...form, id: Date.now() }])
    setModal(null); addToast('Item saved!')
  }

  function toggleStatus(id) {
    setRows(r => r.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x))
    addToast('Status updated.')
  }

  // Strip HTML for table preview
  const stripHtml = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  return (
    <div>
      <Breadcrumb title="Why Choose" crumbs={[{ label: 'Home Management' }, { label: 'Why Choose' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">✦ Why Choose Items</span>
            <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Item</button>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Icon</th><th>Title</th><th>Content Preview</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {rows.sort((a, b) => a.sort - b.sort).map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontSize: 24, textAlign: 'center' }}>{row.icon}</td>
                      <td style={{ fontWeight: 600 }}>{row.title}</td>
                      <td style={{ color: '#777', fontSize: 12, maxWidth: 260 }}>{stripHtml(row.content).substring(0, 100)}{stripHtml(row.content).length > 100 ? '…' : ''}</td>
                      <td style={{ textAlign: 'center' }}>{row.sort}</td>
                      <td>
                        <div className="toggle-wrap">
                          <div className={`toggle ${row.status === 'active' ? 'on' : ''}`} onClick={() => toggleStatus(row.id)}><div className="toggle-knob" /></div>
                          <span className={`badge badge-${row.status === 'active' ? 'success' : 'danger'}`}>{row.status}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-warning btn-xs" onClick={() => setModal(row)}>✎ Edit</button>
                          <button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Delete?')) { setRows(r => r.filter(x => x.id !== row.id)); addToast('Deleted.', 'warning') } }}>✕</button>
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
      {modal && <ItemModal item={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
