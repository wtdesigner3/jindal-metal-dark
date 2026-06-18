'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'

const INIT = {
  metatitle: 'About Jindal Metals & Alloys Ltd. | Stainless Steel Manufacturer India',
  metakeyword: 'about Jindal metals, stainless steel company India, OP Jindal group, Jindal SAW subsidiary',
  metadescription: 'Learn about Jindal Metals & Alloys Ltd., a leading precision stainless steel strip manufacturer in India, part of the OP Jindal Group.',
  metatags: '<meta name="robots" content="index, follow">\n<link rel="canonical" href="https://jindalmetal.com/about" />',
  scripts: ''
}

export default function AboutSeoPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="SEO Tags — About Page" crumbs={[{ label: 'About Us' }, { label: 'SEO Tags' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">🔍 About Page SEO Settings</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'SEO settings saved!', type: 'success' }]) }}>
              <FormField label="Meta Title" required hint={`${form.metatitle.length}/60 chars`}>
                <input className="form-control" value={form.metatitle} onChange={e => f('metatitle', e.target.value)} required />
              </FormField>
              <FormField label="Meta Keywords">
                <textarea className="form-control" value={form.metakeyword} onChange={e => f('metakeyword', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Meta Description" hint={`${form.metadescription.length}/160 chars`}>
                <textarea className="form-control" value={form.metadescription} onChange={e => f('metadescription', e.target.value)} rows={4} />
              </FormField>
              <FormField label="Additional Meta Tags">
                <textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.metatags} onChange={e => f('metatags', e.target.value)} rows={4} />
              </FormField>
              <FormField label="Scripts">
                <textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.scripts} onChange={e => f('scripts', e.target.value)} rows={4} />
              </FormField>
              <button type="submit" className="btn btn-success">✓ Save SEO</button>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
