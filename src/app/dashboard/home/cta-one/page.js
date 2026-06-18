'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  image: '',
  title: 'Quality Steel Strips Since 1975',
  content: '<p>With decades of experience, Jindal Metals delivers precision stainless steel strips trusted by industries worldwide. Partner with us for unmatched quality and reliability.</p>'
}

export default function CtaOnePage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="Some CTA" crumbs={[{ label: 'Home Management' }, { label: 'Some CTA' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">◆ Edit CTA Section</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'CTA saved!', type: 'success' }]) }}>
              <FormField label="Background / Feature Image" hint="Recommended: 1200×600px">
                <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('image', URL.createObjectURL(e.target.files[0])) }} />
                {form.image && <img src={form.image} alt="preview" className="img-preview" style={{ width: '100%', height: 120 }} />}
              </FormField>
              <FormField label="CTA Title" required>
                <input className="form-control" value={form.title} onChange={e => f('title', e.target.value)} required />
              </FormField>
              <FormField label="CTA Content" hint="Supports rich text formatting">
                <RichEditor value={form.content} onChange={v => f('content', v)} placeholder="Enter CTA content..." minHeight={160} />
              </FormField>
              <button type="submit" className="btn btn-success" style={{ marginTop: 8 }}>✓ Save Changes</button>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
