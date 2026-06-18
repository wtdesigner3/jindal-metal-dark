'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../../components/dashboard/FormField'

const INIT = [
  { id: 1, name: 'Stainless Steel', slug: 'stainless-steel', description: 'Cold rolled precision stainless steel strips in various grades', status: 'active', sort: 1 },
  { id: 2, name: 'H&T Steel', slug: 'ht-steel', description: 'Hardened and tempered steel strips for industrial use', status: 'active', sort: 2 },
  { id: 3, name: 'Alloy Steel', slug: 'alloy-steel', description: 'Special alloy steel strips for demanding applications', status: 'active', sort: 3 },
]

function CatModal({ cat, onClose, onSave }) {
  const [form, setForm] = useState(cat || { name: '', slug: '', description: '', status: 'active', sort: '' })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 460 }}>
        <div className="modal-header"><h4>{cat ? 'Edit Category' : 'Add Category'}</h4><button className="modal-close" onClick={onClose}>×</button></div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <FormField label="Category Name" required><input className="form-control" value={form.name} onChange={e => { f('name', e.target.value); f('slug', e.target.value.toLowerCase().replace(/\s+/g, '-')) }} required /></FormField>
            <FormField label="URL Slug"><input className="form-control" value={form.slug} onChange={e => f('slug', e.target.value)} /></FormField>
            <FormField label="Description"><textarea className="form-control" value={form.description} onChange={e => f('description', e.target.value)} rows={3} /></FormField>
            <div className="grid-2"><StatusField value={form.status} onChange={v => f('status', v)} /><SortField value={form.sort} onChange={v => f('sort', v)} /></div>
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

export default function CategoriesPage() {
  const [rows, setRows] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleSave(form) {
    if (form.id) setRows(r => r.map(x => x.id === form.id ? form : x))
    else setRows(r => [...r, { ...form, id: Date.now() }])
    setModal(null); addToast('Category saved!')
  }

  return (
    <div>
      <Breadcrumb title="Product Categories" crumbs={[{ label: 'Products' }, { label: 'Categories' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">▦ Categories</span><button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Category</button></div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Name</th><th>Slug</th><th>Description</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{row.name}</td>
                      <td style={{ fontSize: 12, fontFamily: 'monospace', color: '#666' }}>{row.slug}</td>
                      <td style={{ fontSize: 12, color: '#777', maxWidth: 220 }}>{row.description}</td>
                      <td style={{ textAlign: 'center' }}>{row.sort}</td>
                      <td><span className={`badge badge-${row.status === 'active' ? 'success' : 'danger'}`}>{row.status}</span></td>
                      <td><div style={{ display: 'flex', gap: 4 }}><button className="btn btn-warning btn-xs" onClick={() => setModal(row)}>✎</button><button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Delete?')) { setRows(r => r.filter(x => x.id !== row.id)); addToast('Deleted.', 'warning') } }}>✕</button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal && <CatModal cat={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
