import { Link } from 'react-router-dom'

export default function PageHero({ title, crumbs }) {
  return (
    <div className="page-hero">
      <div className="container">
        <div className="page-hero-content">
          <h1>{title}</h1>
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="breadcrumb-sep">›</span>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
