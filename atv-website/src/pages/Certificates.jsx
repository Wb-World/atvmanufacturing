import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const certificatesData = [
  {
    id: 'iatf-16949',
    title: 'IATF 16949:2016',
    category: 'Automotive Quality Management System',
    standard: 'IATF 16949 (First Edition 2016-10-01)',
    badgeType: 'image',
    badgeSrc: '/certificates/tuv-sud-iatf-badge.jpeg',
    badgeAlt: 'TÜV SÜD IATF 16949 Certification Mark',
    issuer: 'TÜV SÜD Management Service GmbH (Munich, Germany)',
    certNo: '12 111 51333 TMS',
    iatfNo: '0499136',
    usi: 'Unit-1: GATSWX | Unit-2: LATYCZ',
    validity: 'Valid: 2024-02-02 to 2027-02-01',
    validityPill: 'Active & Valid (until Feb 2027)',
    statusColor: '#10B981',
    themeColor: '#1565C0',
    scope: 'Manufacture of Fine blanked parts, Stamped Parts, Deep drawn Sheet Metal Parts and Fabricated Assemblies for Turbo Chargers, Brake System, Seating System and Transmission Systems (without Product Design as per Chapter 8.3).',
    facility: 'Unit 1 (No.19) & Unit 2 (No.36), New SIDCO Industrial Estate, Maraimalai Nagar',
    pdfUrl: '/certificates/IATF-16949-Certificate.pdf',
    pages: [
      { num: 1, title: 'Page 1 — Main Certificate', img: '/certificates/iatf-cert-page1.jpg' },
      { num: 2, title: 'Page 2 — Extended Site Enclosure', img: '/certificates/iatf-cert-page2.jpg' },
    ],
    featured: true,
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001:2015',
    category: 'Environmental Management System (EMS)',
    standard: 'ISO 14001:2015',
    badgeType: 'icon',
    badgeIcon: 'fas fa-leaf',
    badgeColor: '#00897B',
    issuer: 'Quest Certification (P) Ltd',
    accreditation: 'Accredited by JAS-ANZ & IAF (No: M4430310IC)',
    certNo: 'RE91/JA/RE/2935',
    validity: 'Valid: 09.05.2023 to 08.05.2027 (Since 2012)',
    validityPill: 'Active & Valid (until May 2027)',
    statusColor: '#10B981',
    themeColor: '#00897B',
    scope: 'Manufacture of Fine Blanked Parts, Stamped Parts, Deep Drawn Sheet Metal Parts and Fabricated Assemblies for Turbo Chargers, Brake System, Seating System and Transmission Systems.',
    facility: 'Unit 1 (No.19) & Unit 2 (No.36), New SIDCO Industrial Estate, Maraimalai Nagar',
    pdfUrl: '/certificates/ISO-14001-2015-Certificate.pdf',
    pages: [
      { num: 1, title: 'Certificate of Registration', img: '/certificates/iso-14001-cert.jpg' },
    ],
    featured: true,
  },
  {
    id: 'hyundai-100ppm',
    title: '100 PPM Certificate',
    category: 'Supplier Quality Distinction (SQ)',
    standard: 'Hyundai Supplier Quality Assurance Compliance',
    badgeType: 'icon',
    badgeIcon: 'fas fa-trophy',
    badgeColor: '#D97706',
    issuer: 'Hyundai Motor India Ltd. & Woosu Automotive India',
    accreditation: 'Tier-1 Automotive Supplier Quality Benchmark',
    certNo: 'HMI/100PPM/276-14',
    validity: 'Awarded March 2014 — Quality Excellence',
    validityPill: 'Quality Benchmark Award',
    statusColor: '#F59E0B',
    themeColor: '#0284C7',
    scope: 'Awarded to ATV Precision Components (Pressing, Chennai) in pursuant for fulfilling stringent Quality Assurance Compliance and sustaining zero-defect performance.',
    facility: 'ATV Precision Components, Chennai Pressing Division',
    pdfUrl: '/certificates/Hyundai-100-PPM-Certificate.pdf',
    pages: [
      { num: 1, title: '100 PPM Certificate of Supplier Quality', img: '/certificates/hyundai-100ppm-cert.jpg' },
    ],
    featured: false,
  },
]

const trustMetrics = [
  { icon: 'fas fa-shield-alt', color: '#1565C0', title: 'TÜV SÜD Certified', sub: 'IATF 16949:2016 Global Standard' },
  { icon: 'fas fa-globe-asia', color: '#00897B', title: 'JAS-ANZ & IAF Accredited', sub: 'ISO 14001 Environmental System' },
  { icon: 'fas fa-medal', color: '#D97706', title: 'Hyundai 100 PPM', sub: 'Supplier Quality Excellence Award' },
  { icon: 'fas fa-industry', color: '#4F46E5', title: 'Dual-Facility Certified', sub: 'Unit 1 & Unit 2 Maraimalai Nagar' },
]

const commitments = [
  { icon: 'fas fa-award', title: 'Zero Defect Philosophy', desc: 'Every component is manufactured with a zero-defect mindset, backed by robust process controls and 100 PPM discipline.' },
  { icon: 'fas fa-chart-line', title: 'Continuous Improvement', desc: 'Regular audits, kaizen initiatives, and statistical process controls ensure systematic quality refinement.' },
  { icon: 'fas fa-users', title: 'Empowered Workforce', desc: 'Comprehensive technician training and rigorous SOP adherence ensure quality is built in at every machine.' },
  { icon: 'fas fa-handshake', title: 'Customer Satisfaction', desc: 'Collaborating closely with automotive OEMs and Tier-1 leaders to exceed dimensional and functional targets.' },
  { icon: 'fas fa-shield-alt', title: 'Statutory & OEM Compliance', desc: 'Strict conformity with IATF 16949 automotive criteria and customer-specific engineering specifications.' },
  { icon: 'fas fa-sync-alt', title: 'Rigorous Management Reviews', desc: 'Scheduled leadership reviews to drive traceability, environmental stewardship, and manufacturing efficiency.' },
]

export default function Certificates() {
  const [modalCert, setModalCert] = useState(null)
  const [activePageIndex, setActivePageIndex] = useState(0)

  const openModal = (cert, pageIdx = 0) => {
    setModalCert(cert)
    setActivePageIndex(pageIdx)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalCert(null)
    setActivePageIndex(0)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <PageHero title="Certifications" crumbs={[{ label: 'Certificates' }]} />

      {/* ── INTRO & TRUST STRIP ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" data-aos="fade-up">Audited Excellence</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Official Quality <span>& Environmental Certifications</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              ATV Precision Components Pvt. Ltd. operates under rigorous international quality management,
              environmental assurance, and OEM-accredited manufacturing standards.
            </p>
          </div>

          {/* Trust Highlights Strip */}
          <div className="trust-strip" data-aos="fade-up" data-aos-delay="250">
            {trustMetrics.map((t) => (
              <div className="trust-strip-card" key={t.title}>
                <div className="trust-strip-icon" style={{ background: `${t.color}15`, color: t.color }}>
                  <i className={t.icon}></i>
                </div>
                <div className="trust-strip-text">
                  <strong>{t.title}</strong>
                  <span>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── CERTIFICATES SHOWCASE GRID ── */}
          <div className="certs-showcase-grid">
            {certificatesData.map((c, i) => (
              <div
                className={`cert-showcase-card ${c.featured ? 'featured-card' : ''}`}
                key={c.id}
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                {/* Header */}
                <div className="cert-card-header">
                  <div className="cert-card-header-top">
                    {c.badgeType === 'image' ? (
                      <img src={c.badgeSrc} alt={c.badgeAlt} className="cert-badge-img" />
                    ) : (
                      <div className="cert-badge-icon" style={{ background: `${c.badgeColor}15`, color: c.badgeColor }}>
                        <i className={c.badgeIcon}></i>
                      </div>
                    )}
                    <div className="cert-header-info">
                      <h3>{c.title}</h3>
                      <span>{c.category}</span>
                    </div>
                  </div>
                  <div className="cert-card-header-status">
                    <span
                      className="cert-status-pill"
                      style={{ background: `${c.statusColor}15`, color: c.statusColor, border: `1px solid ${c.statusColor}30` }}
                    >
                      <span className="pulse-dot"></span>
                      {c.validityPill}
                    </span>
                  </div>
                </div>

                {/* Preview Frame */}
                <div
                  className="cert-preview-frame"
                  onClick={() => openModal(c, 0)}
                  title="Click to inspect high-resolution certificate"
                >
                  <img
                    src={c.pages[0].img}
                    alt={`${c.title} Certificate Preview`}
                    className="cert-preview-thumbnail"
                    loading="lazy"
                  />
                  <div className="cert-preview-overlay">
                    <span className="cert-preview-overlay-btn">
                      <i className="fas fa-search-plus"></i> Inspect Certificate
                    </span>
                    <span style={{ fontSize: 12, opacity: 0.9 }}>Click for full-resolution view</span>
                  </div>
                  {c.pages.length > 1 && (
                    <span className="cert-pages-indicator">
                      <i className="fas fa-layer-group" style={{ marginRight: 4 }}></i>
                      {c.pages.length} Pages
                    </span>
                  )}
                </div>

                {/* Card Body & Details */}
                <div className="cert-card-body">
                  <div className="cert-meta-list">
                    <div className="cert-meta-row">
                      <span className="cert-meta-label">Cert. No:</span>
                      <span className="cert-meta-val" style={{ fontFamily: 'monospace', fontSize: 13 }}>{c.certNo}</span>
                    </div>

                    {c.iatfNo && (
                      <div className="cert-meta-row">
                        <span className="cert-meta-label">IATF No:</span>
                        <span className="cert-meta-val" style={{ fontFamily: 'monospace', fontSize: 13 }}>{c.iatfNo}</span>
                      </div>
                    )}

                    {c.usi && (
                      <div className="cert-meta-row">
                        <span className="cert-meta-label">IATF USI:</span>
                        <span className="cert-meta-val" style={{ fontSize: 12 }}>{c.usi}</span>
                      </div>
                    )}

                    <div className="cert-meta-row">
                      <span className="cert-meta-label">Issuing Body:</span>
                      <span className="cert-meta-val">{c.issuer}</span>
                    </div>

                    {c.accreditation && (
                      <div className="cert-meta-row">
                        <span className="cert-meta-label">Accreditation:</span>
                        <span className="cert-meta-val">{c.accreditation}</span>
                      </div>
                    )}

                    <div className="cert-meta-row">
                      <span className="cert-meta-label">Validity:</span>
                      <span className="cert-meta-val" style={{ color: 'var(--primary-blue)' }}>{c.validity}</span>
                    </div>
                  </div>

                  {/* Certified Scope */}
                  <div className="cert-scope-box">
                    <strong>Certified Scope</strong>
                    {c.scope}
                  </div>

                  {/* Actions */}
                  <div className="cert-card-actions">
                    <button
                      type="button"
                      className="btn-cert-primary"
                      onClick={() => openModal(c, 0)}
                    >
                      <i className="fas fa-eye"></i> View Full
                    </button>
                    <a
                      href={c.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cert-outline"
                    >
                      <i className="fas fa-file-pdf"></i> Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Automotive & ISO System Interoperability Notice */}
          <div
            style={{
              marginTop: 40,
              padding: '20px 26px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid var(--primary-blue)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
            data-aos="fade-up"
          >
            <i className="fas fa-info-circle" style={{ fontSize: 24, color: 'var(--primary-blue)', flexShrink: 0 }}></i>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--heading-color)', display: 'block', marginBottom: 2 }}>
                Integration with ISO 9001:2015 Standards
              </strong>
              IATF 16949:2016 fully incorporates and builds upon the foundational requirements of <strong>ISO 9001:2015</strong> with
              stringent automotive-specific mandates. Both our Maraimalai Nagar Unit 1 and Unit 2 facilities operate under this unified,
              audited quality management system.
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX / MODAL VIEWER ── */}
      {modalCert && (
        <div className="cert-modal-backdrop" onClick={closeModal}>
          <div className="cert-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-title">
                {modalCert.badgeType === 'image' ? (
                  <img src={modalCert.badgeSrc} alt="Badge" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                ) : (
                  <i className={modalCert.badgeIcon} style={{ fontSize: 22, color: modalCert.badgeColor }}></i>
                )}
                <div>
                  <h3>{modalCert.title}</h3>
                  <span>{modalCert.category} — {modalCert.issuer}</span>
                </div>
              </div>
              <button
                type="button"
                className="cert-modal-close-btn"
                onClick={closeModal}
                aria-label="Close certificate viewer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Toolbar for multi-page certs */}
            <div className="cert-modal-toolbar">
              <div className="cert-page-tabs">
                {modalCert.pages.map((p, idx) => (
                  <button
                    key={p.num}
                    type="button"
                    className={`cert-page-tab ${activePageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActivePageIndex(idx)}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={modalCert.pages[activePageIndex].img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <i className="fas fa-external-link-alt"></i> Open High-Res Image
                </a>
                <a
                  href={modalCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <i className="fas fa-file-pdf"></i> Download PDF
                </a>
              </div>
            </div>

            {/* Viewport */}
            <div className="cert-modal-viewport">
              <img
                src={modalCert.pages[activePageIndex].img}
                alt={`${modalCert.title} — ${modalCert.pages[activePageIndex].title}`}
                className="cert-modal-img"
              />
            </div>

            {/* Footer */}
            <div className="cert-modal-footer">
              <div>
                <strong>Certificate No:</strong> {modalCert.certNo}
                {modalCert.iatfNo ? ` | IATF No: ${modalCert.iatfNo}` : ''}
              </div>
              <div>
                <span style={{ color: modalCert.statusColor, fontWeight: 600 }}>
                  <i className="fas fa-check-circle" style={{ marginRight: 4 }}></i>
                  {modalCert.validity}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── QUALITY POLICY STATEMENT ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="section-label" data-aos="fade-up">Our Guiding Principle</span>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
                Quality <span>Policy Statement</span>
              </h2>
              <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
            </div>
            <div className="quality-policy" data-aos="fade-up" data-aos-delay="200">
              <blockquote>
                ATV Precision Components Pvt. Ltd. is committed to delivering precision components
                that consistently meet or exceed customer requirements through continuous improvement,
                employee involvement, and adherence to quality management systems. We strive for
                excellence in every component we manufacture, ensuring that our customers receive
                products of the highest quality, delivered on time, and at competitive cost.
              </blockquote>
              <div style={{ marginTop: 24, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="fas fa-user-check"></i>
                <span>— K. RAGHAVENDRAN B.E., Managing Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUALITY COMMITMENTS ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">How We Maintain Quality</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Six Pillars of <span>Quality Assurance</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {commitments.map((c, i) => (
              <div
                key={c.title}
                style={{
                  padding: '28px 24px',
                  borderRadius: 'var(--radius)',
                  background: '#fff',
                  boxShadow: 'var(--shadow)',
                  borderTop: '3px solid var(--primary-blue)',
                  transition: 'all 0.3s ease',
                }}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <i className={c.icon} style={{ fontSize: 28, color: 'var(--primary-blue)', marginBottom: 14, display: 'block' }}></i>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>{c.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--muted-text)', lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2 data-aos="fade-up">Partner With an Audited & Certified Leader</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Our fine blanking and sheet metal assembly processes meet the stringent demands of top automotive OEMs.
              Request our audit packages or schedule an on-site facility audit.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
                <i className="fas fa-envelope"></i> Request Quality Audit Package
              </Link>
              <a
                href="/certificates/IATF-16949-Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#fff' }}
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <i className="fas fa-download"></i> Download IATF Certificate
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
