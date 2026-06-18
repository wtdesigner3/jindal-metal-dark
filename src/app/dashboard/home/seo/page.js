'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'

const INIT = {
  metatitle: 'Stainless Steel Strip Manufacturers India | Jindal Metals & Alloys',
  metakeyword: 'stainless steel strips, cold rolled strips, precision strips, ultra thin foils, H&T steel, steel manufacturer India, Jindal metals',
  metadescription: 'Jindal Metals & Alloys Ltd – Leading manufacturer of cold rolled precision stainless steel strips, ultra-thin foils, and H&T steel strips. ISO certified, exporting to 40+ countries.',
  metatags: '<meta name="robots" content="index, follow">\n<meta name="author" content="Jindal Metals & Alloys Ltd">\n<meta property="og:type" content="website">',
  scripts: '<!-- Google Analytics -->\n<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script> -->'
}

export default function HomeSeoPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="Homepage SEO" crumbs={[{ label: 'Home Management' }, { label: 'SEO Tags' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">🔍 Homepage SEO Settings</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'SEO settings saved!', type: 'success' }]) }}>
              <FormField label="Meta Title" required hint={`${form.metatitle.length}/60 characters recommended`}>
                <input className="form-control" value={form.metatitle} onChange={e => f('metatitle', e.target.value)} required />
                <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, marginTop: 4 }}>
                  <div style={{ width: `${Math.min(100, (form.metatitle.length / 60) * 100)}%`, height: '100%', background: form.metatitle.length > 60 ? '#dd4b39' : '#00a65a', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
              </FormField>
              <FormField label="Meta Keywords" hint="Comma-separated keywords">
                <textarea className="form-control" value={form.metakeyword} onChange={e => f('metakeyword', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Meta Description" hint={`${form.metadescription.length}/160 characters recommended`}>
                <textarea className="form-control" value={form.metadescription} onChange={e => f('metadescription', e.target.value)} rows={4} />
                <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, marginTop: 4 }}>
                  <div style={{ width: `${Math.min(100, (form.metadescription.length / 160) * 100)}%`, height: '100%', background: form.metadescription.length > 160 ? '#dd4b39' : '#00a65a', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
              </FormField>
              <FormField label="Additional Meta Tags" hint="Raw HTML meta tags (og:image, canonical, etc.)">
                <textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.metatags} onChange={e => f('metatags', e.target.value)} rows={5} />
              </FormField>
              <FormField label="Head / Body Scripts" hint="Analytics, Tag Manager, schema markup scripts">
                <textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.scripts} onChange={e => f('scripts', e.target.value)} rows={6} />
              </FormField>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="btn btn-success">✓ Save SEO Settings</button>
                <button type="button" className="btn btn-default" onClick={() => setForm(INIT)}>↺ Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
