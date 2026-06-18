'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../components/dashboard/FormField'

const INIT = [
  { id: 1, name: 'ISO 9001:2015', body: 'Bureau Veritas', description: 'Quality Management System', valid_from: '2022-03-01', valid_until: '2025-02-28', logo: '', file_url: '', status: 'active', sort: 1 },
  { id: 2, name: 'ISO 14001:2015', body: 'Bureau Veritas', description: 'Environmental Management System', valid_from: '2022-03-01', valid_until: '2025-02-28', logo: '', file_url: '', status: 'active', sort: 2 },
  { id: 3, name: 'ISO 45001:2018', body: 'Bureau Veritas', description: 'Occupational Health & Safety', valid_from: '2022-03-01', valid_until: '2025-02-28', logo: '', file_url: '', status: 'active', sort: 3 },
  { id: 4, name: 'IS-6911-2017', body: 'Bureau of Indian Standards', description: 'SS Sheet, Strip & Plates Standard', valid_from: '2021-06-01', valid_until: '2026-05-31', logo: '', file_url: '', status: 'active', sort: 4 },
  { id: 5, name: 'IS-2507', body: 'Bureau of Indian Standards', description: 'SS Cold Reduced Strips', valid_from: '2021-06-01', valid_until: '2026-05-31', logo: '', file_url: '', status: 'active', sort: 5 },
  { id: 6, name: 'IS-15997', body: 'Bureau of Indian Standards', description: 'SS Cold Rolled Narrow Strip', valid_from: '2021-06-01', valid_until: '2026-05-31', logo: '', file_url: '', status: 'active', sort: 6 },
  { id: 7, name: 'ISSDA Certificate', body: 'Indian Stainless Steel Dev. Assoc.', description: 'Association Membership', valid_from: '2023-01-01', valid_until: '2025-12-31', logo: '', file_url: '', status: 'active', sort: 7 },
]

function CertModal({ cert, onClose, onSave }) {
  const [form, setForm] = useState(cert || { name: '', body: '', description: '', valid_from: '', valid_until: '', logo: '', file_url: '', status: 'active', sort: '' })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 560 }}>
        <div className="modal-header"><h4>{cert ? 'Edit Certificate' : 'Add Certificate'}</h4><button className="modal-close" onClick={onClose}>×</button></div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <div className="grid-2">
              <FormField label="Certificate Name" required><input className="form-control" value={form.name} onChange={e => f('name', e.target.value)} required /></FormField>
              <FormField label="Certifying Body" required><input className="form-control" value={form.body} onChange={e => f('body', e.target.value)} required /></FormField>
            </div>
            <FormField label="Description"><input className="form-control" value={form.description} onChange={e => f('description', e.target.value)} /></FormField>
            <div className="grid-2">
              <FormField label="Valid From"><input className="form-control" type="date" value={form.valid_from} onChange={e => f('valid_from', e.target.value)} /></FormField>
              <FormField label="Valid Until"><input className="form-control" type="date" value={form.valid_until} onChange={e => f('valid_until', e.target.value)} /></FormField>
            </div>
            <FormField label="Certificate Logo PNG"><input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('logo', URL.createObjectURL(e.target.files[0])) }} />{form.logo && <img src={form.logo} className="img-preview" alt="" />}</FormField>
            <FormField label="Certificate File URL (PDF)" hint="Link to downloadable certificate PDF"><input className="form-control" value={form.file_url} onChange={e => f('file_url', e.target.value)} placeholder="/uploads/cert.pdf or https://..." /></FormField>
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

export default function CertificationsPage() {
  const [certs, setCerts] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleSave(form) {
    if (form.id) setCerts(c => c.map(x => x.id === form.id ? form : x))
    else setCerts(c => [...c, { ...form, id: Date.now() }])
    setModal(null); addToast('Certificate saved!')
  }

  function getDaysLeft(until) {
    if (!until) return null
    return Math.ceil((new Date(until) - new Date()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div>
      <Breadcrumb title="Certifications" crumbs={[{ label: 'Certifications' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">✦ Company Certifications ({certs.filter(c => c.status === 'active').length} active)</span>
            <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Certificate</button>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Logo</th><th>Name</th><th>Certifying Body</th><th>Description</th><th>Validity</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {certs.sort((a, b) => a.sort - b.sort).map((cert, i) => {
                    const daysLeft = getDaysLeft(cert.valid_until)
                    const isExpired = daysLeft !== null && daysLeft <= 0
                    const isExpiringSoon = daysLeft !== null && daysLeft > 0 && daysLeft < 90
                    return (
                      <tr key={cert.id}>
                        <td>{i + 1}</td>
                        <td>{cert.logo ? <img src={cert.logo} className="table-img" alt="" /> : <div style={{ width: 50, height: 36, background: '#fff8e1', border: '1px solid #ffe082', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, borderRadius: 2 }}>🏅</div>}</td>
                        <td style={{ fontWeight: 700 }}>{cert.name}</td>
                        <td style={{ fontSize: 12 }}>{cert.body}</td>
                        <td style={{ fontSize: 12, color: '#666' }}>{cert.description}</td>
                        <td style={{ fontSize: 12 }}>
                          <div>{cert.valid_from} →</div>
                          <div style={{ fontWeight: 600, color: isExpired ? '#dd4b39' : isExpiringSoon ? '#f39c12' : '#00a65a' }}>{cert.valid_until}</div>
                          {isExpired && <span className="badge badge-danger" style={{ marginTop: 2 }}>Expired</span>}
                          {isExpiringSoon && <span className="badge badge-warning" style={{ marginTop: 2 }}>{daysLeft}d left</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>{cert.sort}</td>
                        <td><span className={`badge badge-${cert.status === 'active' ? 'success' : 'danger'}`}>{cert.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {cert.file_url && <a href={cert.file_url} target="_blank" rel="noreferrer" className="btn btn-default btn-xs">📄</a>}
                            <button className="btn btn-warning btn-xs" onClick={() => setModal(cert)}>✎</button>
                            <button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Delete?')) { setCerts(c => c.filter(x => x.id !== cert.id)); addToast('Deleted.', 'warning') } }}>✕</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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
