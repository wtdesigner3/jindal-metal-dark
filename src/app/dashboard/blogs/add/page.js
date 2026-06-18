'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import FormField from '../../../../components/dashboard/FormField'
import RichEditor from '../../../../components/dashboard/RichEditor'
import Link from 'next/link'

const CATS = ['Technical', 'Manufacturing', 'Application', 'Industry News', 'Company Update']
const EMPTY = {
  title: '', slug: '', category: 'Technical', author: 'Admin',
  excerpt: '', content: '', featured_image: '', alt: '',
  date: new Date().toISOString().split('T')[0], status: 'draft',
  metatitle: '', metakeyword: '', metadescription: ''
}

export default function BlogAddPage() {
  const [form, setForm] = useState(EMPTY)
  const [tab, setTab] = useState('content')
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleTitleChange(val) {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setForm(p => ({ ...p, title: val, slug, metatitle: p.metatitle || val }))
  }

  function handleSave(status) {
    // POST /api/blogs  { ...form, status }
    setForm(p => ({ ...p, status }))
    addToast(status === 'published' ? '✓ Post published successfully!' : '✓ Draft saved!', 'success')
  }

  const TABS = [['content', '✎ Content'], ['media', '🖼 Featured Image'], ['seo', '🔍 SEO']]

  return (
    <div>
      <Breadcrumb title="Write Blog Post" crumbs={[{ label: 'Blogs', href: '/dashboard/blogs' }, { label: 'New Post' }]} />
      <div className="content-area">

        {/* Top meta bar */}
        <div className="box" style={{ marginBottom: 14 }}>
          <div className="box-body" style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: 2, minWidth: 200 }}>
                <label className="form-label">Post Title <span style={{ color: '#dd4b39' }}>*</span></label>
                <input className="form-control" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Enter post title here..." style={{ fontSize: 15, fontWeight: 600 }} required />
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                <label className="form-label">Category</label>
                <select className="form-control" value={form.category} onChange={e => f('category', e.target.value)}>
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 130 }}>
                <label className="form-label">Publish Date</label>
                <input className="form-control" type="date" value={form.date} onChange={e => f('date', e.target.value)} />
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <label className="form-label">Author</label>
                <input className="form-control" value={form.author} onChange={e => f('author', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul style={{ display: 'flex', gap: 2, listStyle: 'none', padding: 0, margin: 0 }}>
          {TABS.map(([key, label]) => (
            <li key={key}>
              <button type="button" onClick={() => setTab(key)} style={{ padding: '8px 18px', border: '1px solid #d2d6de', borderBottom: tab === key ? '1px solid #fff' : '1px solid #d2d6de', borderRadius: '3px 3px 0 0', background: tab === key ? '#fff' : '#f4f4f4', color: tab === key ? '#3c8dbc' : '#666', fontWeight: tab === key ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, marginBottom: -1 }}>{label}</button>
            </li>
          ))}
        </ul>

        <div className="box" style={{ borderRadius: '0 3px 3px 3px', margin: 0 }}>

          {/* Content tab */}
          {tab === 'content' && (
            <div className="box-body">
              <FormField label="URL Slug" hint="Auto-generated from title — edit if needed">
                <input className="form-control" value={form.slug} onChange={e => f('slug', e.target.value)} style={{ fontFamily: 'monospace', fontSize: 12 }} placeholder="url-slug-here" />
              </FormField>
              <FormField label="Excerpt / Summary" hint="Short description shown in blog listing">
                <textarea className="form-control" value={form.excerpt} onChange={e => f('excerpt', e.target.value)} rows={3} placeholder="Write a short 1-2 sentence summary of the post..." />
              </FormField>
              <FormField label="Full Content" required hint="Use the toolbar for formatting — bold, headings, lists, links etc. Saves as HTML.">
                <RichEditor
                  value={form.content}
                  onChange={v => f('content', v)}
                  placeholder="Start writing your blog post here... Use the toolbar above to format text, add headings, lists, and links."
                  minHeight={480}
                />
              </FormField>
            </div>
          )}

          {/* Media tab */}
          {tab === 'media' && (
            <div className="box-body">
              <FormField label="Featured Image" hint="Recommended 1200×630px — shown in blog listing and social sharing">
                <label style={{ display: 'block', border: '2px dashed #d2d6de', borderRadius: 3, padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.15s', color: '#aaa' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#3c8dbc'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#d2d6de'}>
                  {form.featured_image
                    ? <img src={form.featured_image} alt="preview" style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 3 }} />
                    : <div><div style={{ fontSize: 40, marginBottom: 8 }}>🖼</div><div style={{ fontWeight: 600 }}>Click to select featured image</div><div style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG or WEBP · Max 5MB</div></div>}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) f('featured_image', URL.createObjectURL(e.target.files[0])) }} />
                </label>
              </FormField>
              <FormField label="Image ALT Text" hint="For accessibility and SEO">
                <input className="form-control" value={form.alt} onChange={e => f('alt', e.target.value)} placeholder="Describe the image for screen readers" />
              </FormField>
            </div>
          )}

          {/* SEO tab */}
          {tab === 'seo' && (
            <div className="box-body">
              <FormField label="SEO Title" hint={`${form.metatitle.length}/60 characters`}>
                <input className="form-control" value={form.metatitle} onChange={e => f('metatitle', e.target.value)} />
                <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, marginTop: 4 }}>
                  <div style={{ width: `${Math.min(100, (form.metatitle.length / 60) * 100)}%`, height: '100%', background: form.metatitle.length > 60 ? '#dd4b39' : '#00a65a', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
              </FormField>
              <FormField label="Meta Keywords" hint="Comma-separated keywords for this post">
                <textarea className="form-control" value={form.metakeyword} onChange={e => f('metakeyword', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Meta Description" hint={`${form.metadescription.length}/160 characters`}>
                <textarea className="form-control" value={form.metadescription} onChange={e => f('metadescription', e.target.value)} rows={4} />
                <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, marginTop: 4 }}>
                  <div style={{ width: `${Math.min(100, (form.metadescription.length / 160) * 100)}%`, height: '100%', background: form.metadescription.length > 160 ? '#dd4b39' : '#00a65a', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
              </FormField>

              {/* Google search preview */}
              <div style={{ background: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: 4, padding: '16px 20px', marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.06em' }}>Google Search Preview</div>
                <div style={{ fontSize: 18, color: '#1a0dab', fontWeight: 400, marginBottom: 3, lineHeight: 1.3 }}>{form.metatitle || form.title || 'Post Title Appears Here'}</div>
                <div style={{ fontSize: 13, color: '#006621', marginBottom: 5 }}>https://jindalmetal.com/blog/{form.slug || 'post-slug'}</div>
                <div style={{ fontSize: 13, color: '#545454', lineHeight: 1.55 }}>{form.metadescription || form.excerpt || 'Meta description will appear here — write a compelling 1–2 sentence summary of the post.'}</div>
              </div>
            </div>
          )}

          {/* Action bar */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard/blogs" className="btn btn-default">← Back to Blogs</Link>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn-default" onClick={() => handleSave('draft')}>💾 Save Draft</button>
              <button type="button" className="btn btn-success" onClick={() => handleSave('published')}>🌐 Publish Post</button>
            </div>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
