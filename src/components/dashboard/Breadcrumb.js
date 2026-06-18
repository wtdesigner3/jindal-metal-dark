export default function Breadcrumb({ title, crumbs = [] }) {
  return (
    <div className="breadcrumb-bar">
      <h1 className="breadcrumb-title">{title}</h1>
      <nav className="breadcrumb-nav">
        <a href="/dashboard">Home</a>
        {crumbs.map((c, i) => (
          <span key={i}>
            <span className="breadcrumb-sep"> / </span>
            {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
          </span>
        ))}
      </nav>
    </div>
  )
}
