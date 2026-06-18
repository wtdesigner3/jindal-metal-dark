'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'

const INIT = { metatitle: 'Steel Strip Products | Jindal Metals & Alloys', metakeyword: 'stainless steel strips products, H&T strips, precision foils', metadescription: 'Explore our full range of cold rolled precision stainless steel strips, ultra-thin foils, and hardened & tempered steel strips.', metatags: '', scripts: '' }

export default function ProductsSeoPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div>
      <Breadcrumb title="Products SEO" crumbs={[{ label: 'Products' }, { label: 'SEO' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">🔍 Products Page SEO</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'Saved!', type: 'success' }]) }}>
              <FormField label="Meta Title"><input className="form-control" value={form.metatitle} onChange={e => f('metatitle', e.target.value)} /></FormField>
              <FormField label="Meta Keywords"><textarea className="form-control" value={form.metakeyword} onChange={e => f('metakeyword', e.target.value)} rows={3} /></FormField>
              <FormField label="Meta Description"><textarea className="form-control" value={form.metadescription} onChange={e => f('metadescription', e.target.value)} rows={4} /></FormField>
              <FormField label="Additional Meta Tags"><textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.metatags} onChange={e => f('metatags', e.target.value)} rows={4} /></FormField>
              <FormField label="Scripts"><textarea className="form-control" style={{ fontFamily: 'monospace', fontSize: 12 }} value={form.scripts} onChange={e => f('scripts', e.target.value)} rows={4} /></FormField>
              <button type="submit" className="btn btn-success">✓ Save SEO</button>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
