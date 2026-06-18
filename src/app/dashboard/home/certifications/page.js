'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../../components/dashboard/FormField'

const INIT = [
  { id: 1, logo: '', title: 'ISO 9001:2015', status: 'active', sort: 1 },
  { id: 2, logo: '', title: 'ISO 14001:2015', status: 'active', sort: 2 },
  { id: 3, logo: '', title: 'ISO 45001:2018', status: 'active', sort: 3 },
  { id: 4, logo: '', title: 'BIS – IS-6911', status: 'active', sort: 4 },
  { id: 5, logo: '', title: 'ISSDA Member', status: 'active', sort: 5 },
]
const EMPTY = { logo: '', title: '', status: 'active', sort: '' }

function CertModal({ cert, onClose, onSave }) {
  const [form, setForm] = useState(cert ? { ...cert } : { ...EMPTY })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h4>{cert ? 'Edit Certification Logo' : 'Add Certification Logo'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <FormField label="Certificate Logo Image" hint="PNG with transparent background preferred">
              <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('logo', URL.createObjectURL(e.target.files[0])) }} />
              {form.logo && <img src={form.logo} alt="" className="img-preview" />}
            </FormField>
            <FormField label="Certificate Title" required>
              <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required />
            </FormField>
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

export default function HomeCertificationsPage() {
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
      <Breadcrumb title="Certifications (Home)" crumbs={[{ label: 'Home Management' }, { label: 'Certifications' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">✦ Certification Logos on Home Page</span>
            <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add</button>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Logo</th><th>Title</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {rows.sort((a, b) => a.sort - b.sort).map((row, i) => (
                    <tr key={row.id}>
                      <td>{i + 1}</td>
                      <td>{row.logo ? <img src={row.logo} className="table-img" alt={row.title} /> : <div style={{ width: 50, height: 36, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏅</div>}</td>
                      <td style={{ fontWeight: 600 }}>{row.title}</td>
                      <td style={{ textAlign: 'center' }}>{row.sort}</td>
                      <td><span className={`badge badge-${row.status === 'active' ? 'success' : 'danger'}`}>{row.status}</span></td>
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
      {modal && <CertModal cert={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
