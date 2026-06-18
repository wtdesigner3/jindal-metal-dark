'use client'
import { useState } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import Toast from '../../../components/dashboard/Toast'
import Link from 'next/link'

const INIT_ALBUMS = [
  { id: 1, name: 'Manufacturing Facility', count: 18 },
  { id: 2, name: 'Products', count: 32 },
  { id: 3, name: 'Infrastructure', count: 14 },
  { id: 4, name: 'Team', count: 9 },
  { id: 5, name: 'Events', count: 12 },
]

const INIT_IMAGES = [
  { id: 1, albumId: 1, url: 'https://picsum.photos/seed/s1/300/200', caption: 'Cold Rolling Mill', date: '2024-01-10' },
  { id: 2, albumId: 1, url: 'https://picsum.photos/seed/s2/300/200', caption: 'Slitting Machine', date: '2024-01-10' },
  { id: 3, albumId: 1, url: 'https://picsum.photos/seed/s3/300/200', caption: 'QC Lab', date: '2024-01-08' },
  { id: 4, albumId: 2, url: 'https://picsum.photos/seed/s4/300/200', caption: 'SS Strips Bundle', date: '2024-01-05' },
  { id: 5, albumId: 2, url: 'https://picsum.photos/seed/s5/300/200', caption: 'Foil Coils', date: '2024-01-05' },
  { id: 6, albumId: 3, url: 'https://picsum.photos/seed/s6/300/200', caption: 'Plant Entrance', date: '2023-12-20' },
]

export default function GalleryPage() {
  const [albums, setAlbums] = useState(INIT_ALBUMS)
  const [images, setImages] = useState(INIT_IMAGES)
  const [activeAlbum, setActiveAlbum] = useState('all')
  const [newAlbum, setNewAlbum] = useState('')
  const [showNewAlbum, setShowNewAlbum] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [toasts, setToasts] = useState([])
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  const displayed = activeAlbum === 'all' ? images : images.filter(i => i.albumId === activeAlbum)

  function addAlbum(e) {
    e.preventDefault()
    if (!newAlbum.trim()) return
    setAlbums(a => [...a, { id: Date.now(), name: newAlbum.trim(), count: 0 }])
    setNewAlbum(''); setShowNewAlbum(false); addToast('Album created!')
  }

  function deleteImage(id) {
    if (!confirm('Delete this image?')) return
    const img = images.find(i => i.id === id)
    setImages(i => i.filter(x => x.id !== id))
    setAlbums(a => a.map(x => x.id === img.albumId ? { ...x, count: Math.max(0, x.count - 1) } : x))
    addToast('Image deleted.', 'warning')
  }

  function deleteAlbum(id) {
    if (!confirm('Delete this album and all its images?')) return
    setImages(i => i.filter(x => x.albumId !== id))
    setAlbums(a => a.filter(x => x.id !== id))
    if (activeAlbum === id) setActiveAlbum('all')
    addToast('Album deleted.', 'warning')
  }

  return (
    <div>
      <Breadcrumb title="Gallery Management" crumbs={[{ label: 'Gallery Management' }]} />
      <div className="content-area">
        <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 20 }}>

          {/* Albums sidebar */}
          <div>
            <div className="box">
              <div className="box-header" style={{ padding: '10px 12px' }}>
                <span className="box-title" style={{ fontSize: 13 }}>Albums</span>
                <button className="btn btn-primary btn-xs" onClick={() => setShowNewAlbum(p => !p)}>+ New</button>
              </div>
              {showNewAlbum && (
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
                  <form onSubmit={addAlbum} style={{ display: 'flex', gap: 6 }}>
                    <input className="form-control" value={newAlbum} onChange={e => setNewAlbum(e.target.value)} placeholder="Album name" autoFocus style={{ flex: 1 }} />
                    <button type="submit" className="btn btn-success btn-xs">✓</button>
                  </form>
                </div>
              )}
              <div style={{ padding: '6px 0' }}>
                <div
                  onClick={() => setActiveAlbum('all')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 14px', cursor: 'pointer', background: activeAlbum === 'all' ? '#3c8dbc' : 'transparent', color: activeAlbum === 'all' ? '#fff' : '#444', fontSize: 13 }}
                >
                  <span>All Images</span>
                  <span style={{ fontSize: 11, background: activeAlbum === 'all' ? 'rgba(255,255,255,0.25)' : '#e8e8e8', color: activeAlbum === 'all' ? '#fff' : '#666', borderRadius: 10, padding: '1px 7px' }}>{images.length}</span>
                </div>
                {albums.map(album => (
                  <div key={album.id} onClick={() => setActiveAlbum(album.id)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 14px', cursor: 'pointer', background: activeAlbum === album.id ? '#3c8dbc' : 'transparent', color: activeAlbum === album.id ? '#fff' : '#444', fontSize: 13 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{album.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, background: activeAlbum === album.id ? 'rgba(255,255,255,0.25)' : '#e8e8e8', color: activeAlbum === album.id ? '#fff' : '#666', borderRadius: 10, padding: '1px 7px' }}>{album.count}</span>
                      <button onClick={e => { e.stopPropagation(); deleteAlbum(album.id) }} style={{ background: 'none', border: 'none', color: activeAlbum === album.id ? 'rgba(255,255,255,0.7)' : '#ccc', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: '0 2px' }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image grid */}
          <div>
            <div className="box">
              <div className="box-header">
                <span className="box-title">🖼 {activeAlbum === 'all' ? 'All Images' : albums.find(a => a.id === activeAlbum)?.name} ({displayed.length})</span>
                <Link href="/dashboard/gallery/upload" className="btn btn-primary btn-sm">+ Upload Images</Link>
              </div>
              <div className="box-body">
                {displayed.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#ccc', padding: '40px 0' }}>
                    <div style={{ fontSize: 48 }}>🖼</div>
                    <div style={{ marginTop: 10, fontSize: 14 }}>No images. <Link href="/dashboard/gallery/upload" style={{ color: '#3c8dbc' }}>Upload some</Link></div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                    {displayed.map(img => (
                      <div key={img.id} style={{ border: '1px solid #e0e0e0', borderRadius: 3, overflow: 'hidden', background: '#fff' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={img.url} alt={img.caption} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block', cursor: 'pointer' }} onClick={() => setLightbox(img)} />
                          <button onClick={() => deleteImage(img.id)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(221,75,57,0.9)', border: 'none', color: '#fff', borderRadius: 2, width: 22, height: 22, cursor: 'pointer', fontSize: 14, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                        </div>
                        <div style={{ padding: '6px 8px' }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.caption}</div>
                          <div style={{ fontSize: 10, color: '#999', marginTop: 2 }}>{img.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ maxWidth: '85vw', position: 'relative' }}>
            <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 4 }} />
            <div style={{ textAlign: 'center', color: '#ddd', marginTop: 10, fontSize: 14 }}>{lightbox.caption}</div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>×</button>
          </div>
        </div>
      )}

      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
