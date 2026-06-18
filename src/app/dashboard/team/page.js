'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../components/dashboard/FormField'
import RichEditor from '../../../components/dashboard/RichEditor'
import Link from 'next/link'

const DEPTS = ['Management', 'Operations', 'Quality', 'HR', 'Sales', 'Finance', 'R&D', 'Maintenance']
const INIT = [
  { id: 1, name: 'Rajesh Kumar Gupta', designation: 'Managing Director', department: 'Management', email: 'rajesh@jindalmetal.com', phone: '+91 98765 00001', bio: '<p>Leading Jindal Metals for over 20 years with a strong focus on quality and global expansion.</p>', photo: '', status: 'active', sort: 1 },
  { id: 2, name: 'Sunita Sharma', designation: 'GM — Operations', department: 'Operations', email: 'sunita@jindalmetal.com', phone: '+91 98765 00002', bio: '<p>Oversees all plant operations and ensures production targets are consistently met.</p>', photo: '', status: 'active', sort: 2 },
  { id: 3, name: 'Amit Verma', designation: 'Head — Quality', department: 'Quality', email: 'amit@jindalmetal.com', phone: '+91 98765 00003', bio: '<p>Responsible for maintaining QEHS standards and all national and international certifications.</p>', photo: '', status: 'active', sort: 3 },
  { id: 4, name: 'Pooja Singh', designation: 'HR Manager', department: 'HR', email: 'pooja@jindalmetal.com', phone: '+91 98765 00004', bio: '<p>Manages recruitment, training programs, and employee welfare initiatives.</p>', photo: '', status: 'active', sort: 4 },
  { id: 5, name: 'Deepak Joshi', designation: 'Sales Manager', department: 'Sales', email: 'deepak@jindalmetal.com', phone: '+91 98765 00005', bio: '<p>Handles domestic and international sales, export enquiries, and key account management.</p>', photo: '', status: 'active', sort: 5 },
]

function MemberModal({ member, onClose, onSave }) {
  const [form, setForm] = useState(member || { name: '', designation: '', department: 'Management', email: '', phone: '', bio: '', photo: '', status: 'active', sort: '' })
  const [tab, setTab] = useState('basic')
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <h4>{member ? 'Edit Team Member' : 'Add Team Member'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e8e8e8', padding: '0 18px', background: '#f9f9f9' }}>
            {[['basic', 'Basic Info'], ['bio', 'Bio / Profile'], ['media', 'Photo']].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setTab(key)} style={{ padding: '8px 14px', fontSize: 13, fontWeight: tab === key ? 700 : 400, color: tab === key ? '#3c8dbc' : '#777', background: 'none', border: 'none', borderBottom: tab === key ? '2px solid #3c8dbc' : '2px solid transparent', cursor: 'pointer', fontFamily: 'inherit', marginBottom: -1 }}>{label}</button>
            ))}
          </div>
          <div className="modal-body">
            {tab === 'basic' && (
              <>
                <div className="grid-2">
                  <FormField label="Full Name" required><input className="form-control" value={form.name} onChange={e => f('name', e.target.value)} required /></FormField>
                  <FormField label="Designation" required><input className="form-control" value={form.designation} onChange={e => f('designation', e.target.value)} required /></FormField>
                </div>
                <div className="grid-2">
                  <FormField label="Department"><select className="form-control" value={form.department} onChange={e => f('department', e.target.value)}>{DEPTS.map(d => <option key={d}>{d}</option>)}</select></FormField>
                  <FormField label="Email"><input className="form-control" type="email" value={form.email} onChange={e => f('email', e.target.value)} /></FormField>
                </div>
                <div className="grid-2">
                  <FormField label="Phone"><input className="form-control" value={form.phone} onChange={e => f('phone', e.target.value)} /></FormField>
                  <div />
                </div>
                <div className="grid-2">
                  <StatusField value={form.status} onChange={v => f('status', v)} />
                  <SortField value={form.sort} onChange={v => f('sort', v)} />
                </div>
              </>
            )}
            {tab === 'bio' && (
              <FormField label="Bio / Profile" hint="Supports rich text formatting">
                <RichEditor value={form.bio} onChange={v => f('bio', v)} placeholder="Write a short professional bio..." minHeight={220} />
              </FormField>
            )}
            {tab === 'media' && (
              <FormField label="Profile Photo" hint="Square image recommended, min 300×300px">
                <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('photo', URL.createObjectURL(e.target.files[0])) }} />
                {form.photo && <img src={form.photo} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', border: '2px solid #d2d6de', marginTop: 10, display: 'block' }} />}
              </FormField>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">✓ Save Member</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function TeamPage() {
  const [members, setMembers] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])
  const stripHtml = html => (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  function handleSave(form) {
    if (form.id) setMembers(m => m.map(x => x.id === form.id ? form : x))
    else setMembers(m => [...m, { ...form, id: Date.now() }])
    setModal(null); addToast('Team member saved!')
  }

  return (
    <div>
      <Breadcrumb title="Team Management" crumbs={[{ label: 'Team Management' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">☻ Team Members ({members.length})</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/dashboard/team/jobs" className="btn btn-default btn-sm">💼 Job Openings</Link>
              <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Member</button>
            </div>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Photo</th><th>Name</th><th>Designation</th><th>Department</th><th>Contact</th><th>Sort</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {members.sort((a, b) => a.sort - b.sort).map((m, i) => (
                    <tr key={m.id}>
                      <td>{i + 1}</td>
                      <td>
                        {m.photo
                          ? <img src={m.photo} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid #d2d6de' }} alt={m.name} />
                          : <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#3c8dbc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15 }}>{m.name.charAt(0)}</div>}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{stripHtml(m.bio).substring(0, 55)}…</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{m.designation}</td>
                      <td><span className="badge badge-info">{m.department}</span></td>
                      <td style={{ fontSize: 11 }}>
                        <div style={{ color: '#3c8dbc' }}>{m.email}</div>
                        <div style={{ color: '#999', marginTop: 2 }}>{m.phone}</div>
                      </td>
                      <td style={{ textAlign: 'center' }}>{m.sort}</td>
                      <td><span className={`badge badge-${m.status === 'active' ? 'success' : 'danger'}`}>{m.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-warning btn-xs" onClick={() => setModal(m)}>✎</button>
                          <button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Remove?')) { setMembers(x => x.filter(r => r.id !== m.id)); addToast('Removed.', 'warning') } }}>✕</button>
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
      {modal && <MemberModal member={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
