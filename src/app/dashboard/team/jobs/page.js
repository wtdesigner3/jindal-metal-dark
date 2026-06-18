'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField, { StatusField } from '../../../../components/dashboard/FormField'
import Link from 'next/link'

const DEPTS = ['Management', 'Operations', 'Quality', 'HR', 'Sales', 'Finance', 'R&D', 'Maintenance']
const INIT = [
  { id: 1, title: 'Junior Quality Inspector', department: 'Quality', location: 'Bahadurgarh, Haryana', type: 'Full-time', experience: '1-3 years', description: 'Responsible for in-process and final inspection of steel strips...', status: 'open' },
  { id: 2, title: 'Sales Executive — Exports', department: 'Sales', location: 'Bahadurgarh / Remote', type: 'Full-time', experience: '2-5 years', description: 'Handle export enquiries, quotations, and international client relationships...', status: 'open' },
  { id: 3, title: 'Maintenance Engineer', department: 'Maintenance', location: 'Bahadurgarh, Haryana', type: 'Full-time', experience: '3-7 years', description: 'Preventive and breakdown maintenance of rolling mill machinery...', status: 'closed' },
]

function JobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState(job || { title: '', department: 'Sales', location: 'Bahadurgarh, Haryana', type: 'Full-time', experience: '', description: '', status: 'open' })
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 560 }}>
        <div className="modal-header"><h4>{job ? 'Edit Job Opening' : 'Add Job Opening'}</h4><button className="modal-close" onClick={onClose}>×</button></div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          <div className="modal-body">
            <FormField label="Job Title" required><input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required /></FormField>
            <div className="grid-2">
              <FormField label="Department"><select className="form-control" value={form.department} onChange={e => f('department', e.target.value)}>{DEPTS.map(d => <option key={d}>{d}</option>)}</select></FormField>
              <FormField label="Type"><select className="form-control" value={form.type} onChange={e => f('type', e.target.value)}>{['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}</select></FormField>
            </div>
            <div className="grid-2">
              <FormField label="Location"><input className="form-control" value={form.location} onChange={e => f('location', e.target.value)} /></FormField>
              <FormField label="Experience Required"><input className="form-control" value={form.experience} onChange={e => f('experience', e.target.value)} placeholder="e.g. 2-5 years" /></FormField>
            </div>
            <FormField label="Job Description"><textarea className="form-control" value={form.description} onChange={e => f('description', e.target.value)} rows={5} /></FormField>
            <FormField label="Status">
              <select className="form-control" value={form.status} onChange={e => f('status', e.target.value)}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </FormField>
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

export default function JobsPage() {
  const [jobs, setJobs] = useState(INIT)
  const [modal, setModal] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleSave(form) {
    if (form.id) setJobs(j => j.map(x => x.id === form.id ? form : x))
    else setJobs(j => [...j, { ...form, id: Date.now() }])
    setModal(null); addToast('Job opening saved!')
  }

  return (
    <div>
      <Breadcrumb title="Job Openings" crumbs={[{ label: 'Team', href: '/dashboard/team' }, { label: 'Job Openings' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">💼 Job Openings ({jobs.filter(j => j.status === 'open').length} open)</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/dashboard/team" className="btn btn-default btn-sm">← Team Members</Link>
              <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Opening</button>
            </div>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead><tr><th>#</th><th>Job Title</th><th>Department</th><th>Location</th><th>Type</th><th>Experience</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {jobs.map((job, i) => (
                    <tr key={job.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{job.title}</div>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{job.description.substring(0, 60)}...</div>
                      </td>
                      <td><span className="badge badge-info">{job.department}</span></td>
                      <td style={{ fontSize: 12 }}>📍 {job.location}</td>
                      <td style={{ fontSize: 12 }}>{job.type}</td>
                      <td style={{ fontSize: 12 }}>{job.experience}</td>
                      <td><span className={`badge badge-${job.status === 'open' ? 'success' : 'danger'}`}>{job.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-warning btn-xs" onClick={() => setModal(job)}>✎</button>
                          <button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Delete?')) { setJobs(j => j.filter(x => x.id !== job.id)); addToast('Deleted.', 'warning') } }}>✕</button>
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
      {modal && <JobModal job={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
