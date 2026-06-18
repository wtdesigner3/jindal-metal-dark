'use client'
import { useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import Link from 'next/link'

const ALBUMS = [
  { id: 1, name: 'Manufacturing Facility' },
  { id: 2, name: 'Products' },
  { id: 3, name: 'Infrastructure' },
  { id: 4, name: 'Team' },
  { id: 5, name: 'Events' },
]

export default function GalleryUploadPage() {
  const [albumId, setAlbumId] = useState(1)
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [captions, setCaptions] = useState({})
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  function handleFiles(e) {
    const selected = Array.from(e.target.files)
    setFiles(selected)
    const caps = {}
    selected.forEach((f, i) => { caps[i] = f.name.replace(/\.[^.]+$/, '') })
    setCaptions(caps)
    setPreviews(selected.map(f => URL.createObjectURL(f)))
  }

  function handleUpload(e) {
    e.preventDefault()
    if (files.length === 0) { addToast('Please select images first.', 'error'); return }
    // POST /api/gallery/upload — FormData with files[], albumId, captions[]
    addToast(`${files.length} image(s) uploaded to album!`, 'success')
    setFiles([]); setPreviews([]); setCaptions({})
  }

  function removeFile(i) {
    setFiles(f => f.filter((_, idx) => idx !== i))
    setPreviews(p => p.filter((_, idx) => idx !== i))
    setCaptions(c => { const n = { ...c }; delete n[i]; return n })
  }

  return (
    <div>
      <Breadcrumb title="Upload Images" crumbs={[{ label: 'Gallery', href: '/dashboard/gallery' }, { label: 'Upload' }]} />
      <div className="content-area">
        <div className="box">
          <div className="box-header">
            <span className="box-title">⬆ Upload Images to Gallery</span>
            <Link href="/dashboard/gallery" className="btn btn-default btn-sm">← Back to Gallery</Link>
          </div>
          <div className="box-body">
            <form onSubmit={handleUpload}>
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Select Album <span style={{ color: '#dd4b39' }}>*</span></label>
                <select className="form-control" style={{ maxWidth: 320 }} value={albumId} onChange={e => setAlbumId(Number(e.target.value))}>
                  {ALBUMS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Select Images <span style={{ color: '#dd4b39' }}>*</span></label>
                <label className="upload-box" style={{ display: 'block' }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>⬆</div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Click to select images or drag & drop</div>
                  <div style={{ fontSize: 12 }}>JPG, PNG, WEBP — Max 10MB each — Multiple allowed</div>
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
                </label>
              </div>

              {previews.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="form-label">Selected Images ({previews.length}) — Add captions:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                    {previews.map((src, i) => (
                      <div key={i} style={{ border: '1px solid #e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={src} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                          <button type="button" onClick={() => removeFile(i)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(221,75,57,0.9)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                        </div>
                        <div style={{ padding: '6px 8px' }}>
                          <input className="form-control" value={captions[i] || ''} onChange={e => setCaptions(c => ({ ...c, [i]: e.target.value }))} placeholder="Caption..." style={{ fontSize: 12, padding: '4px 7px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-success" disabled={files.length === 0}>⬆ Upload {files.length > 0 ? `${files.length} Image(s)` : 'Images'}</button>
            </form>
          </div>
        </div>
      </div>
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
