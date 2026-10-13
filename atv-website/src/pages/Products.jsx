import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const productCategories = [
  {
    id: 'brake',
    img: '/images/products/Brake-parts.jpg',
    badge: 'Safety',
    title: 'Brake Parts',
    desc: 'High-precision fine blanked brake components engineered to meet the most stringent safety and performance standards for automotive and commercial vehicle applications.',
    industry: 'Automotive / Commercial Vehicles',
  },
  {
    id: 'daimler',
    img: '/images/products/daimler-truck-products.jpg',
    badge: 'Commercial',
    title: 'Daimler Truck Chassis & Body Parts',
    desc: 'Precision chassis and body components manufactured to exact Daimler specifications, ensuring perfect fit and long-term durability in heavy commercial vehicle applications.',
    industry: 'Commercial Vehicles (Trucks)',
  },
  {
    id: 'engine',
    img: '/images/products/Truck-parts.jpg',
    badge: 'Powertrain',
    title: 'Engine & Mounting Parts',
    desc: 'Close-tolerance engine and mounting components that withstand extreme temperatures, pressures, and vibrations in automotive and commercial vehicle powertrains.',
    industry: 'Automotive / Commercial Vehicles',
  },
  {
    id: 'transmission',
    img: '/images/products/car-parts.jpg',
    badge: 'Drivetrain',
    title: 'Transmission Parts',
    desc: 'Near-net-shape fine blanked transmission components for passenger cars, motorcycles, and commercial vehicles — ready for assembly without secondary machining.',
    industry: 'Automotive / Two-Wheelers',
  },
  {
    id: 'turbo',
    img: '/images/products/client-products.jpg',
    badge: 'Performance',
    title: 'Turbocharger Parts',
    desc: 'Precision turbocharger components manufactured with the finest materials and tight tolerances to ensure optimal performance and longevity in demanding conditions.',
    industry: 'Automotive',
  },
  {
    id: 'seating',
    img: '/images/products/car-parts.jpg',
    badge: 'Interior',
    title: 'Seating System Parts',
    desc: 'Fine blanked seating system components including recliners, tracks, and adjuster parts — precision formed for perfect fit and reliable long-term operation.',
    industry: 'Automotive',
  },
  {
    id: 'exhaust',
    img: '/images/products/bike-parts.jpg',
    badge: 'Two-Wheeler',
    title: 'Exhaust Parts',
    desc: 'Heat-resistant fine blanked exhaust components for motorcycles and automotive applications, manufactured with materials that withstand extreme thermal cycles.',
    industry: 'Two-Wheelers / Automotive',
  },
  {
    id: 'disc',
    img: '/images/products/Brake-parts.jpg',
    badge: 'Braking',
    title: 'Disc Brake Parts',
    desc: 'Precision disc brake components for motorcycles and passenger cars, manufactured to the tightest tolerances for consistent braking performance and safety.',
    industry: 'Automotive / Two-Wheelers',
  },
  {
    id: 'genuine',
    img: '/images/products/Daimler-truck.jpg',
    badge: 'OEM',
    title: 'Other Genuine Parts',
    desc: 'Custom precision fine blanked components manufactured to client specifications for specialized automotive and industrial applications with exacting quality requirements.',
    industry: 'Multi-Industry',
  },
]

const industries = [
  {
    icon: 'fas fa-car',
    title: 'Automotive (Passenger Cars)',
    desc: 'Precision components for leading passenger car OEMs and Tier-1 suppliers worldwide.',
  },
  {
    icon: 'fas fa-motorcycle',
    title: 'Motorcycles & Two-Wheelers',
    desc: 'Fine blanked parts for transmission, exhaust, and braking systems in two-wheelers.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Commercial Vehicles (Trucks)',
    desc: 'Heavy-duty precision components for chassis, body, and drivetrain of commercial trucks.',
  },
  {
    icon: 'fas fa-industry',
    title: 'Industrial Machinery',
    desc: 'High-accuracy components for industrial equipment, machinery, and equipment manufacturers.',
  },
]

const matFeatures = [
  { icon: 'fas fa-database', label: 'Steel sourced from TI group and renowned overseas fine blanking steel mills' },
  { icon: 'fas fa-fire', label: 'Special spheroidization annealing process ensures perfect fine blanking quality' },
  { icon: 'fas fa-flask', label: 'In-house metallurgical laboratory validates every material batch before production' },
  { icon: 'fas fa-check-double', label: '100% material traceability from mill certificate to finished component' },
]

const FILTERS = ['All', 'Automotive', 'Commercial Vehicles', 'Two-Wheelers', 'OEM']

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? productCategories
    : productCategories.filter((p) => p.industry.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <>
      <PageHero title="Our Products" crumbs={[{ label: 'Products' }]} />

      {/* ── INTRO ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" data-aos="fade-up">Product Range</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Precision <span>Components Catalogue</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Fine blanking produces close tolerance parts from materials of higher thickness. Cut edges are
              100% free of tear and in most cases parts are suitable for mechanical function without the need
              for subsequent machining.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }} data-aos="fade-up">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '8px 22px',
                  border: `2px solid ${activeFilter === f ? 'var(--primary-green)' : 'var(--border-color)'}`,
                  background: activeFilter === f ? 'var(--primary-green)' : '#fff',
                  color: activeFilter === f ? '#fff' : 'var(--muted-text)',
                  borderRadius: 50,
                  fontFamily: 'var(--font-heading)',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filtered.map((p, i) => (
              <div className="product-card" key={p.id} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="product-image">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="product-badge">{p.badge}</span>
                </div>
                <div className="product-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <i className="fas fa-industry" style={{ color: 'var(--secondary-green)', fontSize: 12 }}></i>
                    <span style={{ fontSize: 12, color: 'var(--muted-text)' }}>{p.industry}</span>
                  </div>
                  <Link to="/contact" className="product-enquire">
                    <i className="fas fa-paper-plane"></i> Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Sectors Served</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Industries <span>We Serve</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div className="industry-card" key={ind.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <i className={ind.icon}></i>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="materials-section">
        <div className="container">
          <div className="materials-grid">
            <div data-aos="fade-right">
              <span className="section-label" style={{ color: 'var(--light-green)' }}>Raw Material</span>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Material <span style={{ color: 'var(--light-green)' }}>Capabilities</span>
              </h2>
              <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--light-green), transparent)' }}></div>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, fontSize: 15, marginBottom: 28 }}>
                Ability to source steel from within TI and our association with renowned fine blanking
                steel mills and suppliers from overseas. Special spheroidization annealing process of
                raw material enables the manufacturing of a perfect fine blanking part.
              </p>
              <div className="mat-features">
                {matFeatures.map((f) => (
                  <div className="mat-feature" key={f.label}>
                    <i className={f.icon}></i>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="mat-stats">
                <div className="mat-stat">
                  <strong>1.6mm</strong>
                  <span>Minimum Material Thickness</span>
                </div>
                <div className="mat-stat">
                  <strong>16mm</strong>
                  <span>Maximum Material Thickness</span>
                </div>
                <div className="mat-stat">
                  <strong>±0.01</strong>
                  <span>Tolerance (mm)</span>
                </div>
                <div className="mat-stat">
                  <strong>100%</strong>
                  <span>Material Traceability</span>
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius)',
                padding: '20px 24px',
                marginTop: 20,
                backdropFilter: 'blur(10px)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--light-green)', display: 'block', marginBottom: 8 }}>
                    <i className="fas fa-download"></i> Product Catalogue
                  </strong>
                  For a complete list of materials, thicknesses, and product specifications,
                  contact our engineering team or request our product catalogue.
                </p>
                <Link to="/contact" className="btn btn-outline" style={{ marginTop: 16, fontSize: 13, padding: '10px 24px' }}>
                  Request Catalogue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2 data-aos="fade-up">Need a Custom Component?</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Share your drawings and specifications with us — our engineers will evaluate and provide a detailed quotation.
            </p>
            <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-file-alt"></i> Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
