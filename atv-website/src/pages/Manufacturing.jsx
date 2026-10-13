import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const machines = [
  {
    img: '/images/manufacturing/feintool.jpg',
    title: 'Fine Blanking Press Machine — Feintool SMG',
    brand: 'Feintool SMG',
    desc: 'Precision manufacturing machine used for producing high-quality metal components with accurate dimensions and smooth, burr-free edges. The machine performs a controlled blanking process to achieve excellent surface finish and dimensional accuracy.',
    features: [
      'High-precision metal component manufacturing',
      'Smooth and clean cutting edges — 100% tear-free',
      'Excellent dimensional accuracy and repeatability',
      'Suitable for complex and intricate components',
      'Consistent production quality across all runs',
      'Ideal for automotive and industrial applications',
    ],
    applications: 'Automotive parts, gears, brackets, plates, and other high-accuracy sheet-metal components.',
    reverse: false,
  },
  {
    img: '/images/manufacturing/feintool-2.jpg',
    title: 'Automated Industrial Processing Machine',
    brand: 'Automated System',
    desc: 'Designed for controlled and consistent manufacturing operations. Its enclosed working area and integrated control panel enable operators to monitor and manage key machine parameters during production.',
    features: [
      'Automated production operation',
      'Digital control panel for process monitoring',
      'Enclosed working chamber for safer operation',
      'Consistent and repeatable output',
      'Suitable for continuous industrial production',
      'Designed for precision-oriented manufacturing',
    ],
    applications: 'Industrial component processing, precision manufacturing, and high-volume production operations.',
    reverse: true,
  },
  {
    img: '/images/manufacturing/robotic-welding.jpg',
    title: 'Robotic Welding Machine',
    brand: 'Industrial Robot',
    desc: 'Industrial robotic welding system used for automated and precise welding of metal components. The robotic arm performs welding operations with consistent movement and controlled welding parameters, helping achieve uniform weld quality and improved production efficiency.',
    features: [
      'Automated robotic welding with high precision',
      'Uniform weld quality across all components',
      'Reduced manual intervention and human error',
      'Suitable for repetitive high-volume production',
      'Improved productivity and process efficiency',
      'Real-time process monitoring and control',
    ],
    applications: 'Automotive components, fabricated metal parts, brackets, frames, and other industrial components.',
    reverse: false,
  },
  {
    img: '/images/manufacturing/wasino-press.jpg',
    title: 'WASINO Press Machine',
    brand: 'WASINO',
    desc: 'Heavy-duty industrial press designed for precision metal forming and component manufacturing. The machine applies controlled pressing force to shape and form metal materials, enabling consistent dimensions, repeatable production, and reliable component quality.',
    features: [
      'Heavy-duty pressing force for thick materials',
      'Precision metal forming capability',
      'Consistent dimensions across production runs',
      'Repeatable and reliable component quality',
      'Robust construction for long-term reliability',
      'Advanced control systems for process management',
    ],
    applications: 'Precision metal forming, component shaping, and high-force industrial pressing operations.',
    reverse: true,
  },
  {
    img: '/images/manufacturing/metallurgical-testing.jpg',
    title: 'Metallurgical & Material Testing Laboratory',
    brand: 'In-House Lab',
    desc: 'Equipped for material characterization, metallographic examination, and quality evaluation of manufactured components. Advanced microscopy and testing facilities help assess material microstructure, surface characteristics, and mechanical properties for consistent product quality.',
    features: [
      'Material characterization and testing',
      'Metallographic examination of components',
      'Advanced microscopy capabilities',
      'Surface characteristics assessment',
      'Mechanical property evaluation',
      'Quality control for every production batch',
    ],
    applications: 'Quality assurance, incoming material inspection, in-process testing, and final product verification.',
    reverse: false,
  },
]

const qualityItems = [
  { icon: 'fas fa-flask', title: 'In-House Lab Testing', desc: 'Comprehensive metallurgical and material testing performed on-site for rapid quality feedback.' },
  { icon: 'fas fa-ruler', title: 'Dimensional Inspection', desc: 'Precise dimensional verification using advanced measurement equipment to ensure tight tolerances.' },
  { icon: 'fas fa-file-certificate', title: 'Material Certification', desc: 'All raw materials are certified and tested to meet fine blanking grade specifications.' },
  { icon: 'fas fa-chart-line', title: 'Process Control', desc: 'Statistical Process Control (SPC) ensures consistent quality throughout every production run.' },
]

export default function Manufacturing() {
  return (
    <>
      <PageHero title="Manufacturing" crumbs={[{ label: 'Manufacturing' }]} />

      {/* ── INTRO ── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label" data-aos="fade-up">Our Capability</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              World-Class <span>Manufacturing Facility</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p style={{ color: 'var(--muted-text)', lineHeight: 1.9, fontSize: 16 }} data-aos="fade-up" data-aos-delay="200">
              Our manufacturing facility is equipped with world-class machinery and technology to deliver
              precision fine blanked components. From material sourcing to final inspection, every step
              is controlled to ensure the highest quality. Our investment in advanced equipment ensures
              we can meet the most demanding specifications across all industries we serve.
            </p>
          </div>
        </div>
      </section>

      {/* ── MACHINES ── */}
      {machines.map((m, i) => (
        <section
          key={m.title}
          className={i % 2 === 0 ? 'section' : 'section-alt'}
          style={{ paddingTop: 60, paddingBottom: 60 }}
        >
          <div className="container">
            <div className={`machine-layout${m.reverse ? ' reverse' : ''}`}>
              <div className="machine-image" data-aos={m.reverse ? 'fade-left' : 'fade-right'}>
                <img src={m.img} alt={m.title} loading="lazy" />
              </div>
              <div className="machine-content" data-aos={m.reverse ? 'fade-right' : 'fade-left'}>
                <span className="machine-brand">
                  <i className="fas fa-industry"></i> {m.brand}
                </span>
                <h2>{m.title}</h2>
                <p className="machine-desc">{m.desc}</p>
                <div className="machine-features">
                  {m.features.map((f) => (
                    <div className="mfeature" key={f}>
                      <i className="fas fa-check-circle"></i>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="machine-apps">
                  <strong><i className="fas fa-wrench"></i> Applications</strong>
                  <p>{m.applications}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── QUALITY ASSURANCE ── */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Standards We Keep</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Quality <span>Assurance</span></h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Every component that leaves our facility has been rigorously tested and verified against
              the highest quality standards.
            </p>
          </div>
          <div className="quality-grid">
            {qualityItems.map((q, i) => (
              <div className="quality-card" key={q.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="quality-icon"><i className={q.icon}></i></div>
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2 data-aos="fade-up">Request a Manufacturing Consultation</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Discuss your component requirements with our engineering team and discover how our
              fine blanking technology can deliver the precision you need.
            </p>
            <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-phone-alt"></i> Talk to Our Engineers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
