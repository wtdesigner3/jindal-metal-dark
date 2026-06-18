'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  image: '',
  alt: '',
  heading: 'About Jindal Metals & Alloys Ltd.',
  content: '<p>Jindal Metals &amp; Alloys Ltd as a subsidiary unit of Jindal SAW Ltd. (part of the multi-billion dollar diversified O.P. Jindal Group). Began operations over more than four decades ago with the objective of manufacturing high quality Cold Rolled Precision Stainless Steel Strips and Hardened &amp; Tempered Steel Strips for the domestic and international markets.</p><p>The Company is equipped with the latest manufacturing processes and has the capacity to produce precision strips to very close tolerances in the range of 0.01 to 6.00mm in thickness and 4mm to 650mm in width.</p>'
}

export default function HomeAboutPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleSave(e) {
    e.preventDefault()
    // PUT /api/home/about  { form }
    setToasts(t => [...t, { id: Date.now(), message: 'About section saved successfully!', type: 'success' }])
  }

  return (
    <div>
      <Breadcrumb title="Home Page About" crumbs={[{ label: 'Home Management' }, { label: 'About Section' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">◉ Edit About Section (Home Page)</span>
          </div>
          <div className="box-body">
            <form onSubmit={handleSave}>
              <FormField label="Section Image" hint="Recommended: 600×450px">
                <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('image', URL.createObjectURL(e.target.files[0])) }} />
                {form.image && <img src={form.image} alt="preview" className="img-preview" />}
              </FormField>
              <FormField label="Image ALT Text">
                <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} placeholder="Descriptive alt text for SEO" />
              </FormField>
              <FormField label="Heading" required>
                <input className="form-control" value={form.heading} onChange={e => f('heading', e.target.value)} required />
              </FormField>
              <FormField label="Content" required hint="Supports rich text formatting — HTML is saved">
                <RichEditor
                  value={form.content}
                  onChange={v => f('content', v)}
                  placeholder="Enter the about section content..."
                  minHeight={220}
                />
              </FormField>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button type="submit" className="btn btn-success">✓ Save Changes</button>
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
