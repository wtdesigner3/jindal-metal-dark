'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  heading: 'Corporate Overview',
  intro: '<p>Jindal Metals &amp; Alloys Ltd as a subsidiary unit of Jindal SAW Ltd. (part of the multi-billion dollar diversified O.P. Jindal Group).</p>',
  content: '<p>Began operations over more than four decades ago with the objective of manufacturing high quality Cold Rolled Precision Stainless Steel Strips and Hardened &amp; Tempered Steel Strips for the domestic and international markets.</p><p>The Company is equipped with the latest manufacturing processes and has the capacity to produce precision strips to very close tolerances in the range of <strong>0.01 to 6.00mm in thickness</strong> and <strong>4mm to 650mm in width</strong>.</p><p>Jindal Metals &amp; Alloys Ltd. is a recognized export house with customers in over 40 countries across Europe, Middle East, USA, and Asia.</p>',
  image: '',
  alt: 'Jindal Metals manufacturing facility',
  established: '1975',
  employees: '500+',
  countries: '40+',
}

export default function CorporateOverviewPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="Corporate Overview" crumbs={[{ label: 'About Us' }, { label: 'Corporate Overview' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">◉ Corporate Overview Management</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'Corporate overview saved!', type: 'success' }]) }}>
              <div className="grid-2">
                <FormField label="Page Heading">
                  <input className="form-control" value={form.heading} onChange={e => f('heading', e.target.value)} />
                </FormField>
                <FormField label="Year Established">
                  <input className="form-control" value={form.established} onChange={e => f('established', e.target.value)} />
                </FormField>
              </div>

              <FormField label="Intro / Tagline" hint="Short first paragraph displayed prominently — supports formatting">
                <RichEditor value={form.intro} onChange={v => f('intro', v)} placeholder="Short introductory paragraph..." minHeight={120} />
              </FormField>

              <FormField label="Full Content" required hint="Main corporate overview text — supports full rich text formatting">
                <RichEditor value={form.content} onChange={v => f('content', v)} placeholder="Enter full corporate overview content..." minHeight={300} />
              </FormField>

              <div className="grid-2">
                <FormField label="Number of Employees">
                  <input className="form-control" value={form.employees} onChange={e => f('employees', e.target.value)} placeholder="e.g. 500+" />
                </FormField>
                <FormField label="Export Countries">
                  <input className="form-control" value={form.countries} onChange={e => f('countries', e.target.value)} placeholder="e.g. 40+" />
                </FormField>
              </div>

              <FormField label="Overview Image" hint="Facility or team photo, 800×500px recommended">
                <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('image', URL.createObjectURL(e.target.files[0])) }} />
                {form.image && <img src={form.image} alt="preview" className="img-preview" />}
              </FormField>
              <FormField label="Image ALT Text">
                <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} />
              </FormField>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button type="submit" className="btn btn-success">✓ Save Overview</button>
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
