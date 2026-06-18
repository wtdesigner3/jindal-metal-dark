'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../../components/dashboard/FormField'

const INIT = [
  { id: 1, icon: '', alt: 'Cold rolled strips', title: 'Cold Rolled Strips', status: 'active', sort: 1 },
  { id: 2, icon: '', alt: 'Ultra thin foils', title: 'Ultra Thin Foils', status: 'active', sort: 2 },
  { id: 3, icon: '', alt: 'H&T steel strips', title: 'H&T Steel Strips', status: 'active', sort: 3 },
  { id: 4, icon: '', alt: 'Precision slitting', title: 'Precision Slitting', status: 'active', sort: 4 },
]
const EMPTY = { icon: '', alt: '', title: '', status: 'active', sort: '' }

function ItemModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h4>{item ? 'Edit Our Work Item' : 'Add Our Work Item'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <FormField label="Icon / Image" hint="Icon image or product photo">
              <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('icon', URL.createObjectURL(e.target.files[0])) }} />
              {form.icon && <img src={form.icon} alt="" className="img-preview" />}
            </FormField>
            <div className="grid-2">
              <FormField label="Title" required>
                <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required />
              </FormField>
              <FormField label="ALT Text">
                <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} />
              </FormField>
            </div>
            <div className="grid-2">
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

export default function OurWorkPage() {
  const [rows, setRows] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleSave(form) {
    if (form.id) setRows(r => r.map(x => x.id === form.id ? form : x))
    else setRows(r => [...r, { ...form, id: Date.now() }])
    setModal(null); addToast('Saved!')
  }

  return (
    <div>
      <Breadcrumb title="Our Work" crumbs={[{ label: 'Home Management' }, { label: 'Our Work' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">⊞ Our Work Items</span>
            <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Item</button>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Icon/Image</th><th>Title</th><th>ALT</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {rows.sort((a, b) => a.sort - b.sort).map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.icon ? <img src={row.icon} className="table-img" alt={row.alt} /> : <div style={{ width: 50, height: 36, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 20 }}>⊞</div>}</td>
                      <td style={{ fontWeight: 600 }}>{row.title}</td>
                      <td style={{ fontSize: 12, color: '#777' }}>{row.alt}</td>
                      <td style={{ textAlign: 'center' }}>{row.sort}</td>
                      <td>
                        <div className="toggle-wrap">
                          <div className={`toggle ${row.status === 'active' ? 'on' : ''}`} onClick={() => { setRows(r => r.map(x => x.id === row.id ? { ...x, status: x.status === 'active' ? 'inactive' : 'active' } : x)); addToast('Status updated.') }}><div className="toggle-knob" /></div>
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
