import { Link } from 'react-router-dom'

export default function PageHero({ title, crumbs, bgImage = '/images/manufacturing/manufacturing-hall.jpg' }) {
  return (
    <div
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(7, 19, 36, 0.72) 0%, rgba(11, 25, 44, 0.58) 50%, rgba(30, 58, 138, 0.52) 100%), url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
