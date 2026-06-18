'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import FormField from '../../../components/dashboard/FormField'

const INIT = {
  company_name: 'Jindal Metals & Alloys Ltd.',
  tagline: 'Part of O P Jindal Group, Under the Major Holding Jindal SAW Ltd.',
  email: 'info@jindalmetal.com',
  phone: '+91-01276-241805',
  mobile: '+91 98765 43210',
  fax: '+91-01276-241804',
  address: 'Dehkora Road, Vill. Rohad, Distt. Jhajjar, Bahadurgarh, Haryana – 124 501, INDIA',
  gstin: '06AAACJ0000A1ZX',
  website: 'https://jindalmetal.com',
  linkedin: '',
  facebook: '',
  twitter: '',
  youtube: '',
  enquiry_email: 'admin@jindalmetal.com',
  email_on_enquiry: true,
  daily_digest: false,
}

const PWD_INIT = { current: '', newpwd: '', confirm: '' }

export default function SettingsPage() {
  const [form, setForm] = useState(INIT)
  const [pwd, setPwd] = useState(PWD_INIT)
  const [tab, setTab] = useState('company')
  const [toasts, setToasts] = useState([])
  const [showPwd, setShowPwd] = useState({})
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleSave(e) {
    e.preventDefault()
    // PUT /api/settings  { ...form }
    addToast('Settings saved successfully!')
  }

  function handlePwdChange(e) {
    e.preventDefault()
    if (pwd.newpwd !== pwd.confirm) { addToast('Passwords do not match.', 'error'); return }
    if (pwd.newpwd.length < 6) { addToast('Password must be at least 6 characters.', 'error'); return }
    // PUT /api/auth/change-password
    setPwd(PWD_INIT)
    addToast('Password changed successfully!')
  }

  const TABS = [['company', '🏢 Company'], ['social', '🌐 Social'], ['notifications', '🔔 Notifications'], ['security', '🔒 Security']]

  return (
    <div>
      <Breadcrumb title="Settings" crumbs={[{ label: 'Settings' }]} />
      <div className="content-area">
        {/* Tab pills */}
        <ul style={{ display: 'flex', gap: 2, listStyle: 'none', marginBottom: 0, padding: 0 }}>
          {TABS.map(([key, label]) => (
            <li key={key}>
              <button onClick={() => setTab(key)} style={{ padding: '8px 18px', border: '1px solid #d2d6de', borderBottom: tab === key ? '1px solid #fff' : '1px solid #d2d6de', borderRadius: '3px 3px 0 0', background: tab === key ? '#fff' : '#f4f4f4', color: tab === key ? '#444' : '#777', fontWeight: tab === key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, marginBottom: -1 }}>{label}</button>
            </li>
          ))}
        </ul>

        <div className="box" style={{ borderRadius: '0 3px 3px 3px', margin: 0 }}>
          {tab === 'company' && (
            <div className="box-body">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3c8dbc', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>Company Information</div>
              <form onSubmit={handleSave}>
                <div className="grid-2">
                  <FormField label="Company Name"><input className="form-control" value={form.company_name} onChange={e => f('company_name', e.target.value)} /></FormField>
                  <FormField label="GSTIN"><input className="form-control" value={form.gstin} onChange={e => f('gstin', e.target.value)} /></FormField>
                </div>
                <FormField label="Tagline"><input className="form-control" value={form.tagline} onChange={e => f('tagline', e.target.value)} /></FormField>
                <div className="grid-2">
                  <FormField label="Email"><input className="form-control" type="email" value={form.email} onChange={e => f('email', e.target.value)} /></FormField>
                  <FormField label="Phone"><input className="form-control" value={form.phone} onChange={e => f('phone', e.target.value)} /></FormField>
                </div>
                <div className="grid-2">
                  <FormField label="Mobile"><input className="form-control" value={form.mobile} onChange={e => f('mobile', e.target.value)} /></FormField>
                  <FormField label="Fax"><input className="form-control" value={form.fax} onChange={e => f('fax', e.target.value)} /></FormField>
                </div>
                <FormField label="Address"><textarea className="form-control" value={form.address} onChange={e => f('address', e.target.value)} rows={3} /></FormField>
                <FormField label="Website URL"><input className="form-control" value={form.website} onChange={e => f('website', e.target.value)} /></FormField>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" className="btn btn-success">✓ Save Changes</button>
                  <button type="button" className="btn btn-default" onClick={() => setForm(INIT)}>↺ Reset</button>
                </div>
              </form>
            </div>
          )}

          {tab === 'social' && (
            <div className="box-body">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3c8dbc', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>Social Media Links</div>
              <form onSubmit={handleSave}>
                {[['linkedin', '🔗 LinkedIn URL'], ['facebook', 'Facebook URL'], ['twitter', 'Twitter / X URL'], ['youtube', 'YouTube Channel URL']].map(([key, label]) => (
                  <FormField key={key} label={label}><input className="form-control" type="url" value={form[key]} onChange={e => f(key, e.target.value)} placeholder="https://..." /></FormField>
                ))}
                <button type="submit" className="btn btn-success">✓ Save Social Links</button>
              </form>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="box-body">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3c8dbc', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>Notification Settings</div>
              <form onSubmit={handleSave}>
                <FormField label="Notifications Email"><input className="form-control" type="email" value={form.enquiry_email} onChange={e => f('enquiry_email', e.target.value)} style={{ maxWidth: 340 }} /></FormField>

                {[
                  { key: 'email_on_enquiry', label: 'Email on new enquiry', desc: 'Send email when a new enquiry form is submitted' },
                  { key: 'daily_digest', label: 'Daily summary digest', desc: 'Receive a daily report of enquiries and activity' },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: 3, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{desc}</div>
                    </div>
                    <div className={`toggle ${form[key] ? 'on' : ''}`} onClick={() => f(key, !form[key])} style={{ flexShrink: 0 }}><div className="toggle-knob" /></div>
                  </div>
                ))}
                <button type="submit" className="btn btn-success">✓ Save Preferences</button>
              </form>
            </div>
          )}

          {tab === 'security' && (
            <div className="box-body">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3c8dbc', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>Change Password</div>
              <form onSubmit={handlePwdChange} style={{ maxWidth: 420 }}>
                {[['current', 'Current Password'], ['newpwd', 'New Password'], ['confirm', 'Confirm New Password']].map(([key, label]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <div style={{ position: 'relative' }}>
                      <input className="form-control" type={showPwd[key] ? 'text' : 'password'} value={pwd[key]} onChange={e => setPwd(p => ({ ...p, [key]: e.target.value }))} style={{ paddingRight: 36 }} required />
                      <button type="button" onClick={() => setShowPwd(p => ({ ...p, [key]: !p[key] }))} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: 15 }}>{showPwd[key] ? '🙈' : '👁'}</button>
                    </div>
                  </div>
                ))}
                <div style={{ background: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: 3, padding: '10px 12px', fontSize: 12, color: '#777', marginBottom: 14 }}>
                  Use at least 6 characters. Mix letters, numbers, and symbols for a strong password.
                </div>
                <button type="submit" className="btn btn-danger">🔒 Update Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
