import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/manufacturing', label: 'Manufacturing' },
  { to: '/products', label: 'Our Products' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact', label: 'Contact Us' },
]

const products = [
  'Brake Parts',
  'Turbocharger Parts',
  'Transmission Parts',
  'Seating System Parts',
  'Engine & Mounting Parts',
  'Disc Brake Parts',
  'Daimler Truck Parts',
  'Exhaust Parts',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 — Company Info */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">A</div>
              <div className="footer-logo-text">
                <strong>ATV Precision Components</strong>
                <span>Pvt. Ltd.</span>
              </div>
            </div>
            <p className="footer-desc">
              A leading fine blanking and precision metal component manufacturer
              based in Maraimalai Nagar, Tamil Nadu. Delivering excellence through
              cutting-edge technology and unwavering commitment to quality.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://wa.me/919841028167" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <nav className="footer-links">
              {quickLinks.map(({ to, label }) => (
                <Link key={to} to={to}>{label}</Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Products */}
          <div className="footer-col">
            <h4>Products</h4>
            <nav className="footer-links">
              {products.map((p) => (
                <Link key={p} to="/products">{p}</Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                No.19, New SIDCO Industrial Estate,<br />
                Maraimalai Nagar,<br />
                Tamil Nadu – 603209, India
              </div>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone-alt"></i>
              <div><a href="tel:+914447418989">+91 44-4741-8989</a></div>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-mobile-alt"></i>
              <div><a href="tel:+919841028167">+91-98410-28167</a></div>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope"></i>
              <div><a href="mailto:info@atvmanufacturing.com">info@atvmanufacturing.com</a></div>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-user-tie"></i>
              <div>
                <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>K. RAGHAVENDRAN B.E.</strong><br />
                Managing Director
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div className="footer-bottom">
            <span>© 2025 ATV Precision Components Pvt. Ltd. All Rights Reserved.</span>
            <span>Designed with <i className="fas fa-heart" style={{ color: '#e53935' }}></i> for Precision Manufacturing</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
