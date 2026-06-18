'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  title: 'Need Custom Steel Strips?',
  subtitle: 'Get a Free Quote Today',
  content: '<p>Tell us your requirements and our technical team will provide the best solution tailored to your industry needs. We respond within 24 hours.</p>',
  button_txt: 'Get a Quote',
  url: '/contact',
  know_more_url: '/products'
}

export default function CtaTwoPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="Something CTA" crumbs={[{ label: 'Home Management' }, { label: 'Something CTA' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">◆ Edit Something CTA Section</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'CTA saved!', type: 'success' }]) }}>
              <div className="grid-2">
                <FormField label="Title" required>
                  <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required />
                </FormField>
                <FormField label="Subtitle">
                  <input className="form-control" value={form.subtitle} onChange={e => f('subtitle', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Content" hint="Supports rich text formatting">
                <RichEditor value={form.content} onChange={v => f('content', v)} placeholder="Enter CTA description..." minHeight={160} />
              </FormField>
              <div className="grid-2" style={{ marginTop: 8 }}>
                <FormField label="Button Text">
                  <input className="form-control" value={form.button_txt} onChange={e => f('button_txt', e.target.value)} placeholder="e.g. Get a Quote" />
                </FormField>
                <FormField label="Button URL">
                  <input className="form-control" value={form.url} onChange={e => f('url', e.target.value)} placeholder="/contact" />
                </FormField>
              </div>
              <FormField label="Know More URL" hint="Secondary link (optional)">
                <input className="form-control" value={form.know_more_url} onChange={e => f('know_more_url', e.target.value)} placeholder="/products" />
              </FormField>
              <button type="submit" className="btn btn-success" style={{ marginTop: 4 }}>✓ Save Changes</button>
            </form>
          </div>
        </div>

        {/* Live Preview */}
        <div className="box">
          <div className="box-header"><span className="box-title">👁 Live Preview</span></div>
          <div className="box-body">
            <div style={{ background: '#3c8dbc', borderRadius: 4, padding: '28px 24px', color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{form.title}</div>
              <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{form.subtitle}</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 10, maxWidth: 520, margin: '10px auto 0', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: form.content.replace(/<[^>]+>/g, ' ').trim() }} />
              <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {form.button_txt && <a href={form.url} style={{ background: '#fff', color: '#3c8dbc', padding: '8px 22px', borderRadius: 3, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>{form.button_txt}</a>}
                {form.know_more_url && <a href={form.know_more_url} style={{ border: '2px solid rgba(255,255,255,0.75)', color: '#fff', padding: '6px 20px', borderRadius: 3, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>Know More</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
