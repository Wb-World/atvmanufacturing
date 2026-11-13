import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const machines = [
  {
    img: '/images/manufacturing/feintool.jpg',
    title: 'Feintool SMG — Fineblanking Press',
    brand: 'Feintool SMG',
    desc: 'The Feintool SMG Fineblanking Press is used for precision metal component manufacturing. It helps produce high-quality metal parts with accurate dimensions, smooth edges and consistent results. This technology supports efficient manufacturing for automotive and industrial applications.',
    features: [
      { title: 'Precision Manufacturing', desc: 'Produces accurate and high-quality metal components.' },
      { title: 'Production Efficiency', desc: 'Supports consistent and reliable manufacturing operations.' },
      { title: 'Material Utilization', desc: 'Optimized production processes help reduce unnecessary material wastage.' },
      { title: 'Environmental Responsibility', desc: 'Proper energy management, hydraulic oil monitoring and waste management support environmentally responsible manufacturing.' },
      { title: 'Quality Assurance', desc: 'Supports process monitoring for consistent, high-precision component quality.' },
    ],
    applications: 'Automotive parts, gears, brackets, plates, and other high-accuracy sheet-metal components.',
    reverse: false,
  },
  {
    img: '/images/manufacturing/automation-machine.jpg',
    title: 'Induction Hardening Machine',
    brand: 'Advanced Thermal Processing',
    desc: [
      'The Induction Hardening Machine uses advanced electromagnetic heating technology to improve the surface hardness, strength and wear resistance of metal components. The process involves rapidly heating specific areas of the component followed by controlled quenching to achieve the required hardness and durability.',
      'Our induction hardening process supports consistent quality, improved component performance and reliable manufacturing for automotive and industrial applications.',
    ],
    features: [
      { title: 'Surface Hardness', desc: 'Improves the surface hardness of metal components for better performance.' },
      { title: 'Wear Resistance', desc: 'Enhances resistance to friction and surface wear.' },
      { title: 'Controlled Heating', desc: 'Provides precise and localized heating for specific component areas.' },
      { title: 'Production Efficiency', desc: 'Supports fast processing and consistent manufacturing results.' },
      { title: 'Quality Assurance', desc: 'Helps achieve the required hardness and durability through process monitoring.' },
    ],
    applications: 'Automotive drive and transmission components, shafts, gears, pins, and high-wear precision industrial parts.',
    reverse: true,
  },
  {
    img: '/images/manufacturing/robotic-welding.jpg',
    title: 'Robotic Welding Machine',
    brand: 'Industrial Robot',
    desc: 'Industrial robotic welding system used for automated and precise welding of metal components. The robotic arm performs welding operations with consistent movement and controlled welding parameters, helping achieve uniform weld quality and improved production efficiency.',
    features: [
      { title: 'Automated Precision', desc: 'High-precision automated robotic welding with uniform quality.' },
      { title: 'Consistent Quality', desc: 'Uniform weld quality across all manufactured components.' },
      { title: 'Error Reduction', desc: 'Reduced manual intervention and minimal human error.' },
      { title: 'High-Volume Production', desc: 'Suitable for repetitive, high-speed manufacturing runs.' },
      { title: 'Enhanced Productivity', desc: 'Improved production throughput and overall process efficiency.' },
      { title: 'Process Monitoring', desc: 'Real-time parameter control and continuous monitoring.' },
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
      { title: 'Heavy-Duty Force', desc: 'Heavy-duty pressing force for thick, high-strength materials.' },
      { title: 'Precision Forming', desc: 'Advanced metal forming capability with high dimensional accuracy.' },
      { title: 'Consistent Output', desc: 'Repeatable dimensions and reliable component quality across production runs.' },
      { title: 'Robust Construction', desc: 'Industrial durability engineered for long-term continuous reliability.' },
      { title: 'Process Control', desc: 'Advanced digital control systems for pressing parameter management.' },
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
      { title: 'Material Characterization', desc: 'Rigorous chemical and physical testing of incoming materials.' },
      { title: 'Metallographic Examination', desc: 'Microstructure assessment using advanced microscopy facilities.' },
      { title: 'Surface Assessment', desc: 'Detailed surface roughness, profile, and flatness measurement.' },
      { title: 'Mechanical Testing', desc: 'Tensile, hardness, and mechanical property evaluation.' },
      { title: 'Batch Traceability', desc: '100% material traceability and verification for every production batch.' },
    ],
    applications: 'Quality assurance, incoming material inspection, in-process testing, and final product verification.',
    reverse: false,
  },
]

const qualityItems = [
  { icon: 'fas fa-flask', title: 'In-House Lab Testing', desc: 'Comprehensive metallurgical and material testing performed on-site for rapid quality feedback.' },
  { icon: 'fas fa-ruler-combined', title: 'Dimensional Inspection', desc: 'Precise dimensional verification using advanced measurement equipment to ensure tight tolerances.' },
  { icon: 'fas fa-certificate', title: 'Material Certification', desc: 'All raw materials are certified and tested to meet fine blanking grade specifications.' },
  { icon: 'fas fa-chart-line', title: 'Process Control', desc: 'Statistical Process Control (SPC) ensures consistent quality throughout every production run.' },
]

export default function Manufacturing() {
  return (
    <>
      <PageHero
        title="Manufacturing"
        crumbs={[{ label: 'Manufacturing' }]}
        bgImage="/images/manufacturing.jpg"
      />

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
                {Array.isArray(m.desc) ? (
                  m.desc.map((paragraph, pIdx) => (
                    <p
                      className="machine-desc"
                      key={pIdx}
                      style={{ marginBottom: pIdx < m.desc.length - 1 ? 12 : 20 }}
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="machine-desc">{m.desc}</p>
                )}
                <div className="machine-features">
                  {m.features.map((f, fIdx) => (
                    <div className="mfeature" key={typeof f === 'string' ? f : f.title || fIdx}>
                      <i className="fas fa-check-circle"></i>
                      <span>
                        {typeof f === 'string' ? (
                          f
                        ) : (
                          <>
                            <strong>{f.title}: </strong>
                            {f.desc}
                          </>
                        )}
                      </span>
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
