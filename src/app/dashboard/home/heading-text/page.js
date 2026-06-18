'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  why_choose_title: 'Why Choose Us',
  why_choose_subtitle: 'Decades of precision. Trusted worldwide.',
  product_title: 'Our Products',
  product_subtitle: 'Comprehensive range of precision steel strips',
  our_work_title: 'Our Work',
  our_work_subtitle: 'Excellence in every strip we manufacture',
  contact_title: 'Get In Touch',
  contact_subtitle: 'We are here to help',
  contact_content: '<p>Reach out to our sales team for quotations, technical queries, or to discuss your specific requirements. We typically respond within <strong>24 hours</strong>.</p>',
}

export default function HeadingTextPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const sections = [
    { key: 'why_choose', label: 'Why Choose Us Section' },
    { key: 'product', label: 'Products Section' },
    { key: 'our_work', label: 'Our Work Section' },
    { key: 'contact', label: 'Contact Section', hasContent: true },
  ]

  return (
    <div>
      <Breadcrumb title="Home Page Heading Text" crumbs={[{ label: 'Home Management' }, { label: 'Heading Text' }]} />
      <div className="content-area">
        <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'All heading texts saved!', type: 'success' }]) }}>
          {sections.map(sec => (
            <div key={sec.key} className="box">
              <div className="box-header"><span className="box-title">✎ {sec.label}</span></div>
              <div className="box-body">
                <div className="grid-2">
                  <FormField label="Title">
                    <input className="form-control" value={form[`${sec.key}_title`]} onChange={e => f(`${sec.key}_title`, e.target.value)} />
                  </FormField>
                  <FormField label="Subtitle">
                    <input className="form-control" value={form[`${sec.key}_subtitle`]} onChange={e => f(`${sec.key}_subtitle`, e.target.value)} />
                  </FormField>
                </div>
                {sec.hasContent && (
                  <FormField label="Content / Description" hint="Supports rich text formatting">
                    <RichEditor value={form[`${sec.key}_content`]} onChange={v => f(`${sec.key}_content`, v)} placeholder="Enter section description..." minHeight={140} />
                  </FormField>
                )}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button type="submit" className="btn btn-success">✓ Save All Headings</button>
            <button type="button" className="btn btn-default" onClick={() => setForm(INIT)}>↺ Reset</button>
          </div>
        </form>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
