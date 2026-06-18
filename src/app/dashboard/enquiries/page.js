'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'

const INIT = [
  { id: 'ENQ-248', name: 'Rahul Sharma', email: 'rahul@steelcorp.in', phone: '+91 98765 43210', company: 'Steel Corp India', product: 'Cold Rolled SS Strips', grade: '304', thk_min: '0.10', thk_max: '0.50', wid_min: '20', wid_max: '100', standard: 'IS-6911', message: 'Need urgently for production line, 2MT per month required.', date: '2024-01-15', status: 'new' },
  { id: 'ENQ-247', name: 'Priya Mehta', email: 'priya@autoparts.com', phone: '+91 87654 32109', company: 'AutoParts Ltd', product: 'H&T Steel Strips', grade: 'C75', thk_min: '0.30', thk_max: '1.00', wid_min: '15', wid_max: '50', standard: 'ASTM', message: 'Hardened strips for automotive springs.', date: '2024-01-15', status: 'replied' },
  { id: 'ENQ-246', name: 'James Wilson', email: 'james@ukmetals.co.uk', phone: '+44 7911 123456', company: 'UK Metals Co.', product: 'Ultra Thin Foils', grade: '316L', thk_min: '0.02', thk_max: '0.05', wid_min: '10', wid_max: '200', standard: 'EN-10088', message: 'Medical grade foils, need ISO cert copy.', date: '2024-01-14', status: 'replied' },
  { id: 'ENQ-245', name: 'Ahmed Al-Farsi', email: 'ahmed@gulfsteel.ae', phone: '+971 50 234 5678', company: 'Gulf Steel FZCO', product: 'SS Precision Strips', grade: '201', thk_min: '0.50', thk_max: '2.00', wid_min: '50', wid_max: '300', standard: 'JIS', message: 'Large quantity for utensil manufacturing.', date: '2024-01-13', status: 'closed' },
  { id: 'ENQ-244', name: 'Vivek Kumar', email: 'vivek@textilemach.in', phone: '+91 76543 21098', company: 'Textile Machines Ltd', product: 'Cold Rolled Strips', grade: '304', thk_min: '0.20', thk_max: '0.80', wid_min: '30', wid_max: '120', standard: 'IS-6911', message: 'For textile machinery parts, monthly requirement.', date: '2024-01-12', status: 'new' },
  { id: 'ENQ-243', name: 'Li Wei', email: 'liwei@chinamanuf.cn', phone: '+86 138 0013 8000', company: 'China Manufacturing Co.', product: 'H&T Steel Strips', grade: 'C100', thk_min: '0.15', thk_max: '0.40', wid_min: '10', wid_max: '80', standard: 'ASTM', message: 'Springs and blades application, need samples.', date: '2024-01-11', status: 'closed' },
]

const STATUS_BADGE = { new: 'badge-warning', replied: 'badge-success', closed: 'badge-primary' }

function ViewModal({ enq, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(enq.status)

  function saveStatus(s) {
    setStatus(s)
    onUpdateStatus(enq.id, s)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 660 }}>
        <div className="modal-header" style={{ background: '#222d32' }}>
          <h4>Enquiry Details — {enq.id}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {/* Status bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', background: '#f9f9f9', borderRadius: 3, border: '1px solid #e8e8e8' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Update Status:</span>
            {['new', 'replied', 'closed'].map(s => (
              <button key={s} className={`btn btn-sm ${status === s ? 'btn-primary' : 'btn-default'}`} style={{ textTransform: 'capitalize' }} onClick={() => saveStatus(s)}>{s}</button>
            ))}
            <a href={`mailto:${enq.email}?subject=Re: Enquiry ${enq.id} - ${enq.product}`} className="btn btn-success btn-sm" style={{ marginLeft: 'auto' }}>✉ Reply by Email</a>
          </div>

          <div className="grid-2" style={{ gap: 12 }}>
            {/* Contact info */}
            <div style={{ background: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: 3, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Contact Information</div>
              {[['Name', enq.name], ['Company', enq.company], ['Email', enq.email], ['Phone', enq.phone]].map(([lbl, val]) => (
                <div key={lbl} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 13 }}>
                  <span style={{ color: '#999', minWidth: 60 }}>{lbl}:</span>
                  <span style={{ color: '#444', fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
            {/* Material spec */}
            <div style={{ background: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: 3, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Material Requirements</div>
              {[
                ['Product', enq.product],
                ['Standard', enq.standard],
                ['Grade', enq.grade],
                ['Thickness', `${enq.thk_min} – ${enq.thk_max} mm`],
                ['Width', `${enq.wid_min} – ${enq.wid_max} mm`],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
                  <span style={{ color: '#999' }}>{lbl}:</span>
                  <span style={{ color: '#444', fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 12, background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 3, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f57c00', textTransform: 'uppercase', marginBottom: 6 }}>Special Requirements / Message</div>
            <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>{enq.message}</p>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: '#999' }}>Received: {enq.date}</div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-default" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState(INIT)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.company.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()) || e.product.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || e.status === filter
    return matchSearch && matchFilter
  })

  function handleUpdateStatus(id, status) {
    // PUT /api/enquiries/:id  { status }
    setEnquiries(e => e.map(x => x.id === id ? { ...x, status } : x))
    addToast(`Enquiry marked as ${status}`)
  }

  function handleDelete(id) {
    if (!confirm('Delete this enquiry?')) return
    setEnquiries(e => e.filter(x => x.id !== id))
    addToast('Enquiry deleted.', 'warning')
  }

  const counts = { new: enquiries.filter(e => e.status === 'new').length, replied: enquiries.filter(e => e.status === 'replied').length, closed: enquiries.filter(e => e.status === 'closed').length }

  return (
    <div>
      <Breadcrumb title="Enquiry Management" crumbs={[{ label: 'Enquiry Management' }]} />
      <div className="content-area">
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Total Enquiries', value: enquiries.length, color: 'bg-blue' },
            { label: 'New', value: counts.new, color: 'bg-orange' },
            { label: 'Replied', value: counts.replied, color: 'bg-green' },
            { label: 'Closed', value: counts.closed, color: 'bg-dark' },
          ].map(s => (
            <div key={s.label} className={`info-box ${s.color}`} style={{ cursor: 'default' }}>
              <div className="info-box-content" style={{ background: 'transparent', padding: '14px 16px' }}>
                <span className="info-box-text">{s.label}</span>
                <div className="info-box-number">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="box">
          <div className="box-header">
            <span className="box-title">✉ All Enquiries</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search..." style={{ width: 220 }} />
              {['all', 'new', 'replied', 'closed'].map(s => (
                <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-default'}`} style={{ textTransform: 'capitalize' }} onClick={() => setFilter(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead>
                  <tr><th>#</th><th>ID</th><th>Customer</th><th>Company</th><th>Product Interest</th><th>Grade</th><th>Date</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && <tr><td colSpan={9} style={{ textAlign: 'center', color: '#999', padding: 30 }}>No enquiries found</td></tr>}
                  {filtered.map((enq, i) => (
                    <tr key={enq.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(enq)}>
                      <td onClick={e => e.stopPropagation()}>{i + 1}</td>
                      <td style={{ fontSize: 11, fontFamily: 'monospace', color: '#666' }}>{enq.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{enq.name}</div>
                        <div style={{ fontSize: 11, color: '#999' }}>{enq.email}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{enq.company}</td>
                      <td style={{ fontSize: 12, maxWidth: 160 }}>{enq.product}</td>
                      <td style={{ fontSize: 12, fontFamily: 'monospace', color: '#3c8dbc' }}>{enq.grade}</td>
                      <td style={{ fontSize: 11, color: '#999' }}>{enq.date}</td>
                      <td><span className={`badge ${STATUS_BADGE[enq.status]}`}>{enq.status}</span></td>
                      <td onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-primary btn-xs" onClick={() => setSelected(enq)}>👁 View</button>
                          <button className="btn btn-danger btn-xs" onClick={() => handleDelete(enq.id)}>✕</button>
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

      {selected && (
        <ViewModal
          enq={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={(id, s) => { handleUpdateStatus(id, s); setSelected(prev => ({ ...prev, status: s })) }}
        />
      )}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
