'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import FormField, { StatusField, SortField } from '../../../components/dashboard/FormField'
import RichEditor from '../../../components/dashboard/RichEditor'
import Link from 'next/link'

const CATS = ['Stainless Steel', 'H&T Steel', 'Alloy Steel']
const INIT_PRODUCTS = [
  { id: 1, name: 'Cold Rolled Precision SS Strips', category: 'Stainless Steel', grade: '304, 316, 201', thk_min: '0.05', thk_max: '3.00', wid_min: '4', wid_max: '650', description: '<p>High quality cold rolled precision stainless steel strips manufactured to international standards. Available in various grades and finishes.</p><ul><li>Thickness range: 0.05 to 3.00mm</li><li>Width range: 4 to 650mm</li><li>Available in coil and cut-to-length forms</li></ul>', image: '', alt: '', status: 'active', sort: 1 },
  { id: 2, name: 'SS Ultra-Thin Foils', category: 'Stainless Steel', grade: '304, 316L', thk_min: '0.01', thk_max: '0.10', wid_min: '4', wid_max: '400', description: '<p>Precision ultra-thin stainless steel foils for demanding applications in medical, electronics, and aerospace industries.</p>', image: '', alt: '', status: 'active', sort: 2 },
  { id: 3, name: 'Hardened & Tempered Strips', category: 'H&T Steel', grade: 'C75, C80, C100', thk_min: '0.10', thk_max: '2.50', wid_min: '5', wid_max: '300', description: '<p>Hardened and tempered carbon steel strips for springs, blades, saw blades, and industrial applications requiring high hardness and flexibility.</p>', image: '', alt: '', status: 'active', sort: 3 },
]
const EMPTY = { name: '', category: 'Stainless Steel', grade: '', thk_min: '', thk_max: '', wid_min: '', wid_max: '', description: '', image: '', alt: '', status: 'active', sort: '' }

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product ? { ...product } : { ...EMPTY })
  const [tab, setTab] = useState('basic')
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-dialog" style={{ maxWidth: 700 }}>
        <div className="modal-header">
          <h4>{product ? 'Edit Product' : 'Add New Product'}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(form) }}>
          {/* Mini tabs inside modal */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e8e8e8', padding: '0 18px', background: '#f9f9f9' }}>
            {[['basic', 'Basic Info'], ['description', 'Description'], ['media', 'Image & SEO']].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setTab(key)} style={{ padding: '8px 14px', fontSize: 13, fontWeight: tab === key ? 700 : 400, color: tab === key ? '#3c8dbc' : '#777', background: 'none', border: 'none', borderBottom: tab === key ? '2px solid #3c8dbc' : '2px solid transparent', cursor: 'pointer', fontFamily: 'inherit', marginBottom: -1 }}>{label}</button>
            ))}
          </div>

          <div className="modal-body">
            {tab === 'basic' && (
              <>
                <div className="grid-2">
                  <FormField label="Product Name" required>
                    <input className="form-control" value={form.name} onChange={e => f('name', e.target.value)} required />
                  </FormField>
                  <FormField label="Category">
                    <select className="form-control" value={form.category} onChange={e => f('category', e.target.value)}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </FormField>
                </div>
                <FormField label="Grade(s)" hint="Comma separated e.g. 304, 316, 201">
                  <input className="form-control" value={form.grade} onChange={e => f('grade', e.target.value)} placeholder="304, 316, 201" />
                </FormField>
                <div className="grid-2">
                  <FormField label="Thickness Min (mm)"><input className="form-control" value={form.thk_min} onChange={e => f('thk_min', e.target.value)} placeholder="0.05" /></FormField>
                  <FormField label="Thickness Max (mm)"><input className="form-control" value={form.thk_max} onChange={e => f('thk_max', e.target.value)} placeholder="3.00" /></FormField>
                </div>
                <div className="grid-2">
                  <FormField label="Width Min (mm)"><input className="form-control" value={form.wid_min} onChange={e => f('wid_min', e.target.value)} /></FormField>
                  <FormField label="Width Max (mm)"><input className="form-control" value={form.wid_max} onChange={e => f('wid_max', e.target.value)} /></FormField>
                </div>
                <div className="grid-2">
                  <StatusField value={form.status} onChange={v => f('status', v)} />
                  <SortField value={form.sort} onChange={v => f('sort', v)} />
                </div>
              </>
            )}
            {tab === 'description' && (
              <FormField label="Product Description" hint="Supports full rich text — bold, lists, headings etc.">
                <RichEditor value={form.description} onChange={v => f('description', v)} placeholder="Enter full product description with specifications, features, and applications..." minHeight={320} />
              </FormField>
            )}
            {tab === 'media' && (
              <>
                <FormField label="Product Image">
                  <input className="form-control" type="file" accept="image/*" onChange={e => { if (e.target.files[0]) f('image', URL.createObjectURL(e.target.files[0])) }} />
                  {form.image && <img src={form.image} className="img-preview" alt="" style={{ marginTop: 8 }} />}
                </FormField>
                <FormField label="Image ALT Text" hint="For SEO and accessibility">
                  <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} placeholder="e.g. Cold rolled stainless steel strips" />
                </FormField>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">✓ Save Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState(INIT_PRODUCTS)
  const [modal, setModal] = useState(null)
  const [search, setSearch] = useState('')
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])
  const stripHtml = html => (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.grade.toLowerCase().includes(search.toLowerCase()))

  function handleSave(form) {
    if (form.id) setProducts(p => p.map(x => x.id === form.id ? form : x))
    else setProducts(p => [...p, { ...form, id: Date.now() }])
    setModal(null); addToast('Product saved!')
  }

  return (
    <div>
      <Breadcrumb title="Products" crumbs={[{ label: 'Product Management' }, { label: 'All Products' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">▦ All Products ({products.length})</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/dashboard/products/categories" className="btn btn-default btn-sm">Categories</Link>
              <Link href="/dashboard/products/seo" className="btn btn-default btn-sm">SEO</Link>
              <button className="btn btn-primary btn-sm" onClick={() => setModal('new')}>+ Add Product</button>
            </div>
          </div>
          <div className="box-body" style={{ paddingBottom: 0 }}>
            <input className="form-control" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search by name or grade..." style={{ maxWidth: 340, marginBottom: 12 }} />
          </div>
          <div className="box-body" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table className="datatable">
                <thead>
                  <tr><th>#</th><th>Name</th><th>Category</th><th>Grade</th><th>Thickness (mm)</th><th>Width (mm)</th><th>Sort</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{stripHtml(p.description).substring(0, 70)}…</div>
                      </td>
                      <td><span className="badge badge-info">{p.category}</span></td>
                      <td style={{ fontSize: 12, fontFamily: 'monospace' }}>{p.grade}</td>
                      <td style={{ fontSize: 12 }}>{p.thk_min} – {p.thk_max}</td>
                      <td style={{ fontSize: 12 }}>{p.wid_min} – {p.wid_max}</td>
                      <td style={{ textAlign: 'center' }}>{p.sort}</td>
                      <td><span className={`badge badge-${p.status === 'active' ? 'success' : 'danger'}`}>{p.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-warning btn-xs" onClick={() => setModal(p)}>✎ Edit</button>
                          <button className="btn btn-danger btn-xs" onClick={() => { if (confirm('Delete?')) { setProducts(x => x.filter(r => r.id !== p.id)); addToast('Deleted.', 'warning') } }}>✕</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modal && <ProductModal product={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
