import { Link } from 'react-router-dom'

export default function PageHero({ title, crumbs, bgImage = '/images/manufacturing/manufacturing-hall.jpg' }) {
  return (
    <div
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(20, 15, 20, 0.65) 50%, rgba(127, 29, 29, 0.55) 100%), url("${bgImage}")`,
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
