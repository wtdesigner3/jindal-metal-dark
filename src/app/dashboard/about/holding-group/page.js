'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  group_name: 'O.P. Jindal Group',
  parent_company: 'Jindal SAW Ltd.',
  heading: 'Holding Group Company',
  content: '<p>Jindal Metals &amp; Alloys Ltd is a subsidiary of <strong>Jindal SAW Ltd.</strong>, which is part of the multi-billion dollar diversified <strong>O.P. Jindal Group</strong>. The Jindal Group is one of India\'s most diversified and professionally managed conglomerates with interests across steel, power, infrastructure, and more.</p><p>With a strong legacy spanning over six decades, the group employs over 30,000 people and has a global presence across five continents.</p>',
  logo: '',
  website: 'https://jindalsaw.com',
  founded: '1952',
}

export default function HoldingGroupPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Breadcrumb title="Holding Group Company" crumbs={[{ label: 'About Us' }, { label: 'Holding Group' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header"><span className="box-title">🏢 Holding Group Company Management</span></div>
          <div className="box-body">
            <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'Holding group info saved!', type: 'success' }]) }}>
              <div className="grid-2">
                <FormField label="Group Name">
                  <input className="form-control" value={form.group_name} onChange={e => f('group_name', e.target.value)} />
                </FormField>
                <FormField label="Parent / Holding Company">
                  <input className="form-control" value={form.parent_company} onChange={e => f('parent_company', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Section Heading">
                <input className="form-control" value={form.heading} onChange={e => f('heading', e.target.value)} />
              </FormField>
              <FormField label="Content" hint="Supports full rich text formatting">
                <RichEditor value={form.content} onChange={v => f('content', v)} placeholder="Describe the holding group..." minHeight={220} />
              </FormField>
              <div className="grid-2">
                <FormField label="Group Founded Year">
                  <input className="form-control" value={form.founded} onChange={e => f('founded', e.target.value)} />
                </FormField>
                <FormField label="Group Website URL">
                  <input className="form-control" value={form.website} onChange={e => f('website', e.target.value)} />
                </FormField>
              </div>
              <FormField label="Group Logo" hint="Official group logo PNG">
                <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('logo', URL.createObjectURL(e.target.files[0])) }} />
                {form.logo && <img src={form.logo} alt="logo" className="img-preview" />}
              </FormField>
              <button type="submit" className="btn btn-success" style={{ marginTop: 4 }}>✓ Save Changes</button>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
