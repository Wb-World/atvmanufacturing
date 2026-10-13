import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/products', label: 'Products' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location])

  return (
    <nav className="navbar" style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.12)' } : {}}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">A</div>
            <div className="logo-text">
              <strong>ATV Precision Components</strong>
              <span>Pvt. Ltd. — Passion for Precision</span>
            </div>
          </Link>

          {/* Nav Links */}
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contact" className="nav-link nav-cta">Get a Quote</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 998, backdropFilter: 'blur(2px)'
          }}
        />
      )}
    </nav>
  )
}
