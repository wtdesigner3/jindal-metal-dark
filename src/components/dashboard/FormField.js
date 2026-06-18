// Reusable form field component
export default function FormField({ label, required, hint, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}{required && <span>*</span>}
      </label>
      {children}
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  )
}

// Reusable image upload field
export function ImageField({ label, required, value, onChange, hint }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}{required && <span style={{ color: '#dd4b39' }}>*</span>}</label>
      <input className="form-control" type="file" accept="image/*" onChange={onChange} />
      {value && (
        <img src={value} alt="preview" className="img-preview" />
      )}
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  )
}

// Status select
export function StatusField({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">Status</label>
      <select className="form-control" value={value} onChange={e => onChange(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  )
}

// Sort order field
export function SortField({ value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">Sort Order</label>
      <input className="form-control" type="number" min="1" value={value} onChange={e => onChange(e.target.value)} placeholder="e.g. 1" />
      <div className="form-hint">Lower number = displayed first</div>
    </div>
  )
}
