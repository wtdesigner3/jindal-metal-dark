'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TiptapLink from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useCallback } from 'react'

/* ─── Toolbar button ───────────────────────────────────────────────── */
function Btn({ active, disabled, title, onClick, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 28, height: 26, border: '1px solid transparent',
        borderRadius: 3, background: active ? '#3c8dbc' : 'transparent',
        color: active ? '#fff' : '#555', cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 12, fontWeight: 700, padding: '0 4px', opacity: disabled ? 0.4 : 1,
        transition: 'all 0.1s', fontFamily: 'inherit', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { if (!active && !disabled) e.currentTarget.style.background = '#eee' }}
      onMouseLeave={e => { if (!active && !disabled) e.currentTarget.style.background = 'transparent' }}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <div style={{ width: 1, background: '#d2d6de', margin: '2px 3px', alignSelf: 'stretch' }} />
}

/* ─── Main Editor ──────────────────────────────────────────────────── */
export default function RichEditor({ value = '', onChange, placeholder = 'Enter content here...', minHeight = 200 }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      TextStyle,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange && onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        style: `min-height:${minHeight}px; outline:none; padding:12px 14px; font-size:13px; color:#444; line-height:1.75;`,
      },
    },
  })

  // Sync external value changes (reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value]) // eslint-disable-line

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Enter URL (leave empty to remove link):', prev || 'https://')
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  if (!editor) return (
    <div style={{ border: '1px solid #d2d6de', borderRadius: 3, minHeight, background: '#fff', padding: 12, color: '#bbb', fontSize: 13 }}>
      Loading editor...
    </div>
  )

  const h = editor.isActive.bind(editor)

  /* word count */
  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length

  return (
    <div style={{ border: '1px solid #d2d6de', borderRadius: 3, background: '#fff', overflow: 'hidden' }}>

      {/* ── Toolbar ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2,
        padding: '5px 8px', background: '#f4f4f4',
        borderBottom: '1px solid #d2d6de', userSelect: 'none',
      }}>

        {/* Paragraph / Heading select */}
        <select
          value={
            h('heading', { level: 2 }) ? 'h2' :
            h('heading', { level: 3 }) ? 'h3' :
            h('heading', { level: 4 }) ? 'h4' : 'p'
          }
          onMouseDown={e => e.stopPropagation()}
          onChange={e => {
            const val = e.target.value
            if (val === 'p') editor.chain().focus().setParagraph().run()
            else editor.chain().focus().setHeading({ level: parseInt(val[1]) }).run()
          }}
          style={{ height: 26, border: '1px solid #d2d6de', borderRadius: 3, fontSize: 12, color: '#555', background: '#fff', padding: '0 6px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <Sep />

        {/* Text formatting */}
        <Btn active={h('bold')} title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
        <Btn active={h('italic')} title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()}><i style={{ fontStyle: 'italic' }}>I</i></Btn>
        <Btn active={h('underline')} title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
        <Btn active={h('strike')} title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></Btn>

        <Sep />

        {/* Alignment */}
        <Btn active={h({ textAlign: 'left' })} title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()}>L</Btn>
        <Btn active={h({ textAlign: 'center' })} title="Center" onClick={() => editor.chain().focus().setTextAlign('center').run()}>C</Btn>
        <Btn active={h({ textAlign: 'right' })} title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()}>R</Btn>
        <Btn active={h({ textAlign: 'justify' })} title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()}>J</Btn>

        <Sep />

        {/* Lists */}
        <Btn active={h('bulletList')} title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn active={h('orderedList')} title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>

        <Sep />

        {/* Blockquote & HR */}
        <Btn active={h('blockquote')} title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>" "</Btn>
        <Btn active={false} title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>— HR</Btn>

        <Sep />

        {/* Link */}
        <Btn active={h('link')} title="Insert/Edit Link" onClick={setLink}>🔗 Link</Btn>
        <Btn active={false} title="Remove Link" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!h('link')}>✕Link</Btn>

        <Sep />

        {/* Undo / Redo */}
        <Btn active={false} title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>↩ Undo</Btn>
        <Btn active={false} title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>↪ Redo</Btn>

        <Sep />

        <Btn active={false} title="Clear Formatting" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>✕ Clear</Btn>

        {/* Word count */}
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#aaa', whiteSpace: 'nowrap', alignSelf: 'center', paddingRight: 4 }}>
          {wordCount} word{wordCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* ── Editor content area ── */}
      <EditorContent editor={editor} />

      {/* ── Status bar ── */}
      <div style={{ padding: '3px 12px', background: '#fafafa', borderTop: '1px solid #f0f0f0', fontSize: 11, color: '#ccc', display: 'flex', gap: 14 }}>
        <span>Ctrl+B = Bold</span>
        <span>Ctrl+I = Italic</span>
        <span>Ctrl+Z = Undo</span>
        <span style={{ marginLeft: 'auto' }}>Output: HTML</span>
      </div>
    </div>
  )
}
