import { useState } from 'react'
import PageHero from '../components/PageHero'

const certificates = [
  {
    id: 'iatf-1',
    title: 'IATF 16949:2016',
    subtitle: 'Automotive Quality Management System',
    issuer: 'TÜV SÜD Management Service GmbH',
    img: '/certificates/iatf-cert-page1.jpg',
  },
  {
    id: 'iatf-2',
    title: 'IATF 16949:2016 (Appendix)',
    subtitle: 'Extended Manufacturing Site Enclosure',
    issuer: 'TÜV SÜD Management Service GmbH',
    img: '/certificates/iatf-cert-page2.jpg',
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001:2015',
    subtitle: 'Environmental Management System',
    issuer: 'Quest Certification (JAS-ANZ & IAF Accredited)',
    img: '/certificates/iso-14001-cert.jpg',
  },
  {
    id: 'hyundai-100ppm',
    title: 'Hyundai 100 PPM Certificate',
    subtitle: 'Supplier Quality Distinction Award',
    issuer: 'Hyundai Motor India & Woosu Automotive',
    img: '/certificates/hyundai-100ppm-cert.jpg',
  },
]

export default function Certificates() {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <>
      <PageHero
        title="Certificates"
        crumbs={[{ label: 'Certificates' }]}
        bgImage="/images/certificate.jpg"
      />

      {/* ── INTRO ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="section-label" data-aos="fade-up">Quality Accreditations</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              International <span>Standards &amp; Certifications</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Our facilities comply with the highest global standards for automotive quality management and environmental systems.
            </p>
          </div>

          {/* ── CERTIFICATE CARDS GRID (Inspired by tifineblanking.com) ── */}
          <div className="cert-cards-gallery">
            {certificates.map((cert, idx) => (
              <div
                key={cert.id}
                className="cert-gallery-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                onClick={() => setSelectedImg(cert)}
              >
                <div className="cert-gallery-frame">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="cert-gallery-thumb"
                    loading="lazy"
                  />
                  <div className="cert-gallery-overlay">
                    <span className="cert-zoom-btn">
                      <i className="fas fa-search-plus"></i> View Certificate
                    </span>
                  </div>
                </div>
                <div className="cert-gallery-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.subtitle}</p>
                  <span className="cert-issuer-badge">
                    <i className="fas fa-certificate" style={{ color: 'var(--primary-red)', marginRight: 6 }}></i>
                    {cert.issuer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX POPUP MODAL ── */}
      {selectedImg && (
        <div className="cert-lightbox-backdrop" onClick={() => setSelectedImg(null)}>
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setSelectedImg(null)}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, color: '#111827', fontSize: 18, fontFamily: 'var(--font-heading)' }}>
                {selectedImg.title}
              </h3>
              <span style={{ fontSize: 13, color: 'var(--muted-text)' }}>{selectedImg.subtitle}</span>
            </div>
            <div className="cert-lightbox-img-wrap">
              <img src={selectedImg.img} alt={selectedImg.title} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
