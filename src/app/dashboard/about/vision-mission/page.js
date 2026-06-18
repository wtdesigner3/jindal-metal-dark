'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'

const INIT = {
  vision_heading: 'Our Vision',
  vision_content: '<p>To be the most trusted and innovative manufacturer of precision stainless steel strips globally, delivering excellence through superior quality, technological advancement, and sustainable practices.</p>',
  mission_heading: 'Our Mission',
  mission_content: '<p>To manufacture and deliver world-class cold rolled precision steel strips that exceed customer expectations in quality, dimensions, and consistency — supported by prompt service and technical expertise.</p>',
  values_heading: 'Our Core Values',
  values: [
    { title: 'Quality Excellence', desc: '<p>Uncompromising commitment to product quality at every stage of manufacturing.</p>' },
    { title: 'Customer Focus', desc: '<p>Customer satisfaction drives every decision we make.</p>' },
    { title: 'Integrity', desc: '<p>Honest, transparent, and ethical in all our business dealings.</p>' },
    { title: 'Innovation', desc: '<p>Continuously improving processes, products, and people.</p>' },
  ]
}

export default function VisionMissionPage() {
  const [form, setForm] = useState(INIT)
  const [toasts, setToasts] = useState([])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function updateValue(i, key, val) {
    const updated = [...form.values]
    updated[i] = { ...updated[i], [key]: val }
    f('values', updated)
  }
  function addValue() { f('values', [...form.values, { title: '', desc: '' }]) }
  function removeValue(i) { f('values', form.values.filter((_, idx) => idx !== i)) }

  return (
    <div>
      <Breadcrumb title="Vision & Mission" crumbs={[{ label: 'About Us' }, { label: 'Vision & Mission' }]} />
      <div className="content-area">
        <form onSubmit={e => { e.preventDefault(); setToasts(t => [...t, { id: Date.now(), message: 'Vision & Mission saved!', type: 'success' }]) }}>

          <div className="grid-2" style={{ marginBottom: 0 }}>
            <div className="box">
              <div className="box-header"><span className="box-title">👁 Vision</span></div>
              <div className="box-body">
                <FormField label="Section Heading">
                  <input className="form-control" value={form.vision_heading} onChange={e => f('vision_heading', e.target.value)} />
                </FormField>
                <FormField label="Vision Statement" required hint="Supports rich text">
                  <RichEditor value={form.vision_content} onChange={v => f('vision_content', v)} placeholder="Enter vision statement..." minHeight={180} />
                </FormField>
              </div>
            </div>
            <div className="box">
              <div className="box-header"><span className="box-title">🎯 Mission</span></div>
              <div className="box-body">
                <FormField label="Section Heading">
                  <input className="form-control" value={form.mission_heading} onChange={e => f('mission_heading', e.target.value)} />
                </FormField>
                <FormField label="Mission Statement" required hint="Supports rich text">
                  <RichEditor value={form.mission_content} onChange={v => f('mission_content', v)} placeholder="Enter mission statement..." minHeight={180} />
                </FormField>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-header">
              <span className="box-title">✦ Core Values</span>
              <button type="button" className="btn btn-primary btn-sm" onClick={addValue}>+ Add Value</button>
            </div>
            <div className="box-body">
              {form.values.map((val, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16, padding: 14, background: '#f9f9f9', borderRadius: 3, border: '1px solid #e8e8e8' }}>
                  <div style={{ minWidth: 26, height: 26, background: '#3c8dbc', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginTop: 4, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 8 }}>
                      <label className="form-label">Value Title</label>
                      <input className="form-control" value={val.title} onChange={e => updateValue(i, 'title', e.target.value)} placeholder="e.g. Quality Excellence" />
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <RichEditor value={val.desc} onChange={v => updateValue(i, 'desc', v)} placeholder="Describe this core value..." minHeight={100} />
                    </div>
                  </div>
                  <button type="button" className="btn btn-danger btn-xs" onClick={() => removeValue(i)} style={{ marginTop: 4, flexShrink: 0 }}>✕ Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button type="submit" className="btn btn-success">✓ Save All</button>
            <button type="button" className="btn btn-default" onClick={() => setForm(INIT)}>↺ Reset</button>
          </div>
        </form>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
