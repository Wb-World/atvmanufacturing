import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ExportWorldMap from '../components/ExportWorldMap'

const features = [
  {
    icon: 'fas fa-cut',
    title: 'Superior Edge Quality',
    desc: 'Unsurpassed by any other stamping process — 100% tear-free cut edges suitable for mechanical function without subsequent machining.',
  },
  {
    icon: 'fas fa-ruler-combined',
    title: 'Superb Dimensional Control',
    desc: 'Exceptional accuracy and repeatability in every component, ensuring close tolerances are maintained consistently across production runs.',
  },
  {
    icon: 'fas fa-layer-group',
    title: 'Enhanced Part Flatness',
    desc: 'Fine blanking technology delivers superior flatness compared to conventional stamping, enabling direct assembly without rework.',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Multiple Features',
    desc: 'Multiple features can be added simultaneously in a single operation to maintain perfect precision between all features.',
  },
]

const applications = [
  {
    img: '/images/products/car-parts.jpg',
    tag: 'Automotive',
    title: 'Passenger Cars',
    items: ['Transmission Parts', 'Engine Mounting Parts', 'Brake System Parts'],
  },
  {
    img: '/images/products/bike-parts.jpg',
    tag: 'Two-Wheelers',
    title: 'Motorcycles',
    items: ['Exhaust Parts', 'Transmission Parts', 'Engine Mounting Parts'],
  },
  {
    img: '/images/products/Truck-parts.jpg',
    tag: 'Commercial Vehicles',
    title: 'Trucks',
    items: ['Daimler Truck Parts', 'Engine Mounting Parts', 'Heavy Chassis Pressings'],
  },
]

const clients = [
  { name: 'Woosu Automotive India', img: '/images/clients/woosu-india-client.jpg' },
  { name: 'Delphi-TVS Technologies', img: '/images/clients/delphi-tvs-tech-client.jpg' },
  { name: 'Nash Industries', img: '/images/clients/nash-industries-client.jpg' },
  { name: 'TVS Brakes India', img: '/images/clients/brakes-india-ivs-client.jpg' },
  { name: 'Gestamp', img: '/images/clients/gestamp-client.jpg' },
  { name: 'Enkei', img: '/images/clients/ENKEI-client.jpg' },
  { name: 'Garrett Advancing Motion', img: '/images/clients/garrett-advancing-motion-client.jpg' },
  { name: 'ZF / Rane', img: '/images/clients/zf-rane-client.jpg' },
  { name: 'Saurer', img: '/images/clients/Saurer-client.jpg' },
  { name: 'TEL Turbo Energy', img: '/images/clients/Tel-turbo-energy-client.jpg' },
  { name: 'Inzi Controls', img: '/images/clients/inzi-controls-client.jpg' },
  { name: 'ABI Showatech', img: '/images/clients/ABI-showatech.jpg' },
]

const feintoolFeatures = [
  { icon: 'fas fa-bullseye', title: 'Precision Manufacturing', desc: 'Produces accurate and high-quality metal components.' },
  { icon: 'fas fa-cogs', title: 'Production Efficiency', desc: 'Supports consistent and reliable manufacturing operations.' },
  { icon: 'fas fa-recycle', title: 'Material Utilization', desc: 'Optimized production processes help reduce unnecessary material wastage.' },
  { icon: 'fas fa-leaf', title: 'Environmental Responsibility', desc: 'Proper energy management, hydraulic oil monitoring and waste management support environmentally responsible manufacturing.' },
  { icon: 'fas fa-shield-alt', title: 'Quality Assurance', desc: 'Helps achieve the required high precision and consistent quality.' },
]

const inductionFeatures = [
  { icon: 'fas fa-shield-alt', title: 'Surface Hardness', desc: 'Improves the surface hardness of metal components for better performance.' },
  { icon: 'fas fa-layer-group', title: 'Wear Resistance', desc: 'Enhances resistance to friction and surface wear.' },
  { icon: 'fas fa-fire', title: 'Controlled Heating', desc: 'Provides precise and localized heating for specific component areas.' },
  { icon: 'fas fa-tachometer-alt', title: 'Production Efficiency', desc: 'Supports fast processing and consistent manufacturing results.' },
  { icon: 'fas fa-check-double', title: 'Quality Assurance', desc: 'Helps achieve the required hardness and durability through process monitoring.' },
]

const stats = [
  { val: '15+', label: 'Years of Excellence' },
  { val: '100%', label: 'Tear-Free Edges' },
  { val: '50+', label: 'Global Clients' },
  { val: '5', label: 'Press Machines' },
]

export default function Home() {
  const heroRef = useRef(null)
  const [scrollHidden, setScrollHidden] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Hide the scroll indicator once user scrolls past 80% of viewport height
      if (window.scrollY > window.innerHeight * 0.8) {
        setScrollHidden(true)
      } else {
        setScrollHidden(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollClick = () => {
    // Scroll to the section just after the hero
    const heroHeight = heroRef.current?.offsetHeight || window.innerHeight
    window.scrollTo({ top: heroHeight, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── HERO (tifineblanking.com style — centered, full-screen, play button prominent) ── */}
      <section className="hero hero-centered" id="home-hero" ref={heroRef}>
        <div className="hero-bg">
          <img
            src="/images/home-dashboard.jpg"
            alt="ATV Precision Manufacturing Facility"
            loading="eager"
          />
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-centered-content">
          {/* Company name — large centered title */}
          <h1 data-aos="fade-up" data-aos-delay="100">
            ATV Precision<br />Components
          </h1>

          {/* Tagline */}
          <p data-aos="fade-up" data-aos-delay="250">
            Passion for Precision — Cutting Edge of Fine Blanking Technology
          </p>

          {/* Big circular play button like tifineblanking.com */}
          <div className="hero-play-block" data-aos="fade-up" data-aos-delay="400">
            <button
              type="button"
              className="hero-big-play-btn"
              onClick={() => setShowVideoModal(true)}
              aria-label="View Presentation"
            >
              <i className="fas fa-play"></i>
            </button>
            <span className="hero-play-label">View Our Presentation</span>
          </div>
        </div>

        {/* Scroll arrow — bottom center, tifineblanking.com style */}
        <div
          className={`hero-scroll-arrow${scrollHidden ? ' hidden' : ''}`}
          onClick={handleScrollClick}
          role="button"
          aria-label="Scroll down"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleScrollClick()}
        >
          <svg viewBox="0 0 40 40" className="hero-scroll-svg" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <polyline points="12,16 20,25 28,16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── VIDEO PRESENTATION POPUP MODAL (Refer: tifineblanking.com) ── */}
      {showVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setShowVideoModal(false)}
              aria-label="Close presentation video"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="video-player-wrap">
              <video
                autoPlay
                controls
                playsInline
                className="modal-video-player"
              >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}


      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Why Fine Blanking?</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              The <span>Precision Advantage</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Our fine blanking technology delivers unmatched quality that no other stamping process can achieve.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={f.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="feature-icon">
                  <i className={f.icon}></i>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY APPLICATIONS ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Industry Applications</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Precision Across <span>Every Sector</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              From passenger cars to commercial trucks, our components power the world's most demanding applications.
            </p>
          </div>
          <div className="applications-grid">
            {applications.map((app, i) => (
              <div className="app-card" key={app.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <img src={app.img} alt={app.title} loading="lazy" />
                <div className="app-overlay">
                  <span className="app-tag">{app.tag}</span>
                  <h3>{app.title}</h3>
                  <ul className="app-features">
                    {app.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link to="/products" className="app-link">
                    View Products <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEINTOOL SMG FINEBLANKING PRESS ── */}
      <section className="section">
        <div className="container">
          <div className="sustainability">
            <div className="sustain-text" data-aos="fade-right">
              <span className="section-label">Fineblanking Technology</span>
              <h2 className="section-title">Feintool SMG — <span>Fineblanking Press</span></h2>
              <div className="section-divider"></div>
              <p className="section-subtitle">
                The Feintool SMG Fineblanking Press is used for precision metal component manufacturing. It helps produce high-quality metal parts with accurate dimensions, smooth edges and consistent results. This technology supports efficient manufacturing for automotive and industrial applications.
              </p>
              <div className="sustain-points">
                {feintoolFeatures.map((p) => (
                  <div className="sustain-point" key={p.title}>
                    <i className={p.icon}></i>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sustain-image" data-aos="fade-left">
              <img src="/images/manufacturing/feintool.jpg" alt="Feintool SMG Fineblanking Press" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUCTION HARDENING MACHINE ── */}
      <section className="section-alt">
        <div className="container">
          <div className="material-edge">
            <div className="material-image" data-aos="fade-right">
              <img src="/images/manufacturing/automation-machine.jpg" alt="Induction Hardening Machine" loading="lazy" />
            </div>
            <div data-aos="fade-left">
              <span className="section-label">Thermal Processing</span>
              <h2 className="section-title">Induction Hardening <span>Machine</span></h2>
              <div className="section-divider"></div>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
                The Induction Hardening Machine uses advanced electromagnetic heating technology to improve the surface hardness, strength and wear resistance of metal components. The process involves rapidly heating specific areas of the component followed by controlled quenching to achieve the required hardness and durability.
              </p>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>
                Our induction hardening process supports consistent quality, improved component performance and reliable manufacturing for automotive and industrial applications.
              </p>
              <div className="sustain-points">
                {inductionFeatures.map((p) => (
                  <div className="sustain-point" key={p.title}>
                    <i className={p.icon}></i>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGO GRID (static rows) ── */}
      <section className="section clients-grid-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="section-label" data-aos="fade-up">Trusted By</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Our <span>Clients</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="clients-logo-grid" data-aos="fade-up" data-aos-delay="200">
            {clients.map((c) => (
              <div className="client-grid-logo" key={c.name} title={c.name}>
                <img src={c.img} alt={c.name} loading="lazy" />
                <span className="client-grid-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPORTS GLOBAL WORLD MAP ── */}
      <ExportWorldMap />

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2 data-aos="fade-up">Let's Talk About Your Project</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              After we get some information from you, we'll set up a time to discuss your project in further detail.
            </p>
            <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-paper-plane"></i> Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
