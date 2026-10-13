import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const certs = [
  {
    abbr: 'ISO',
    title: 'ISO 9001:2015',
    authority: 'Quality Management System',
    issuer: 'Bureau Veritas / TÜV',
    validity: 'Valid — [CLIENT TO UPDATE]',
    color: '#2E7D32',
    desc: 'International standard for quality management systems, demonstrating our commitment to consistent product quality and customer satisfaction.',
  },
  {
    abbr: 'IATF',
    title: 'IATF 16949:2016',
    authority: 'Automotive Quality Management',
    issuer: 'Bureau Veritas / TÜV',
    validity: 'Valid — [CLIENT TO UPDATE]',
    color: '#1565C0',
    desc: 'Global automotive quality management standard, ensuring our manufacturing processes meet the exacting requirements of automotive OEMs worldwide.',
  },
  {
    abbr: 'ENV',
    title: 'ISO 14001:2015',
    authority: 'Environmental Management System',
    issuer: 'Bureau Veritas / TÜV',
    validity: 'Valid — [CLIENT TO UPDATE]',
    color: '#00695C',
    desc: 'Confirms our commitment to minimizing environmental impact, conserving resources, and continuously improving our environmental performance.',
  },
  {
    abbr: 'OH&S',
    title: 'ISO 45001:2018',
    authority: 'Occupational Health & Safety',
    issuer: '[CLIENT TO CONFIRM]',
    validity: '[CLIENT TO UPDATE]',
    color: '#E65100',
    desc: 'Demonstrates our commitment to providing a safe and healthy working environment for all employees and contractors.',
  },
]

const commitments = [
  { icon: 'fas fa-award', title: 'Zero Defect Philosophy', desc: 'Every component is manufactured with a zero-defect mindset, backed by robust process controls.' },
  { icon: 'fas fa-chart-line', title: 'Continuous Improvement', desc: 'Regular audits, kaizen activities, and process refinements ensure we keep getting better.' },
  { icon: 'fas fa-users', title: 'Employee Involvement', desc: 'Our entire workforce is trained and empowered to maintain and improve quality standards.' },
  { icon: 'fas fa-handshake', title: 'Customer Satisfaction', desc: 'Customer feedback is systematically captured and acted upon to exceed expectations every time.' },
  { icon: 'fas fa-shield-alt', title: 'Regulatory Compliance', desc: 'Full compliance with applicable legal, regulatory, and customer-specific quality requirements.' },
  { icon: 'fas fa-sync-alt', title: 'Management Review', desc: 'Regular top management quality reviews ensure strategic alignment with quality objectives.' },
]

export default function Certificates() {
  return (
    <>
      <PageHero title="Certificates" crumbs={[{ label: 'Certificates' }]} />

      {/* ── INTRO ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Our Credentials</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Quality <span>Certifications</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Quality is at the core of everything we do. Our certifications reflect our commitment to
              maintaining the highest standards in manufacturing and customer satisfaction.
            </p>
          </div>

          <div className="certs-grid">
            {certs.map((c, i) => (
              <div className="cert-card" key={c.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div
                  className="cert-logo"
                  style={{
                    background: `linear-gradient(135deg, ${c.color}18, ${c.color}28)`,
                    color: c.color,
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: 0,
                  }}
                >
                  {c.abbr}
                </div>
                <h3>{c.title}</h3>
                <p className="cert-authority">{c.authority}</p>
                <p style={{ fontSize: 13, color: 'var(--muted-text)', marginBottom: 12, lineHeight: 1.6 }}>{c.desc}</p>
                <div style={{ fontSize: 12, color: 'var(--muted-text)', marginBottom: 12 }}>
                  <i className="fas fa-building" style={{ color: c.color, marginRight: 4 }}></i>
                  Issuing Body: <strong>{c.issuer}</strong>
                </div>
                <span className="cert-validity" style={{ background: `${c.color}15`, color: c.color }}>
                  {c.validity}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              padding: '16px 24px',
              background: 'rgba(255,193,7,0.1)',
              border: '1px solid rgba(255,193,7,0.3)',
              borderRadius: 'var(--radius)',
              fontSize: 14,
              color: '#F57F17',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
            data-aos="fade-up"
          >
            <i className="fas fa-info-circle"></i>
            <span>
              <strong>Note for client:</strong> Certificate images, exact issuing authority names, certificate numbers,
              and validity dates should be provided and updated in this section.
            </span>
          </div>
        </div>
      </section>

      {/* ── QUALITY POLICY ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="section-label" data-aos="fade-up">Our Promise</span>
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
              <div style={{ marginTop: 24, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--primary-green)' }}>
                — K. RAGHAVENDRAN B.E., Managing Director
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
              Quality <span>Commitments</span>
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
                  borderTop: '3px solid var(--primary-green)',
                  transition: 'all 0.3s ease',
                }}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <i className={c.icon} style={{ fontSize: 28, color: 'var(--primary-green)', marginBottom: 14, display: 'block' }}></i>
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
            <h2 data-aos="fade-up">Quality You Can Rely On</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Our certifications are backed by rigorous audits and continuous improvement programs.
              Contact us to learn more about our quality systems.
            </p>
            <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-certificate"></i> Enquire About Our Quality Systems
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
