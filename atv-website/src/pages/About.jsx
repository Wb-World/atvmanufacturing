import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const missionPoints = [
  'To manufacture high-precision components that meet and exceed customer expectations.',
  'To maintain world-class quality standards through advanced technology and continuous improvement.',
  'To strengthen our manufacturing capabilities through innovation, automation, and engineering excellence.',
  'To build long-term partnerships through reliability, transparency, and timely delivery.',
  'To promote sustainable manufacturing practices while ensuring operational efficiency.',
  'To deliver defect-free products and establish lasting trust with customers across global markets.',
]

const whyChoose = [
  { icon: 'fas fa-cut', title: 'Superior Edge Quality' },
  { icon: 'fas fa-ruler-combined', title: 'Superb Dimensional Control' },
  { icon: 'fas fa-layer-group', title: 'Enhanced Part Flatness' },
  { icon: 'fas fa-cogs', title: 'Multiple Features in One Operation' },
  { icon: 'fas fa-flask', title: 'In-house Material Testing Lab' },
  { icon: 'fas fa-leaf', title: 'Environmental Sustainability' },
  { icon: 'fas fa-globe', title: 'Global Export Reach' },
  { icon: 'fas fa-certificate', title: 'IATF 16949 Certified' },
]

const infrastructure = [
  {
    img: '/images/manufacturing/feintool.jpg',
    title: 'Fine Blanking Press — Feintool SMG',
    desc: 'World-class Feintool SMG press delivering high-precision components with smooth, burr-free edges.',
  },
  {
    img: '/images/manufacturing/wasino-press.jpg',
    title: 'Heavy-Duty WASINO Press',
    desc: 'Heavy-duty industrial press designed for precision metal forming with consistent, repeatable output.',
  },
  {
    img: '/images/manufacturing/automation-machine.jpg',
    title: 'Automated Industrial Processing Machine',
    desc: 'Enclosed automated processing machine with digital controls for consistent, precision-oriented output.',
  },
  {
    img: '/images/manufacturing/robotic-welding.jpg',
    title: 'Robotic Welding Machine',
    desc: 'Industrial robotic welding for automated precision welding with uniform quality and high throughput.',
  },
  {
    img: '/images/manufacturing/metallurgical-testing.jpg',
    title: 'Metallurgical Testing Laboratory',
    desc: 'Equipped for material characterization, metallographic examination, and quality evaluation.',
  },
  {
    img: '/images/manufacturing/manufacturing-hall.jpg',
    title: 'Manufacturing Hall',
    desc: 'State-of-the-art facility housing all presses and auxiliary equipment under one roof.',
  },
]

export default function About() {
  return (
    <div
      className="about-page-wrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url("/images/background-aboutus.jpg")`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <PageHero
        title="About Us"
        crumbs={[{ label: 'About Us' }]}
        bgImage="/images/dashboard-aboutus.jpg"
      />

      {/* ── 1. LEADERSHIP SPOTLIGHT AT THE TOP (Refer: venuengg.com) ── */}
      <section className="leadership-spotlight-section">
        <div className="container">
          <div className="leadership-card" data-aos="fade-up">
            <div className="leadership-photo-wrap">
              <div className="leadership-photo-backdrop-glow"></div>
              <img
                src="/images/manager.jpeg"
                alt="K. Raghavendran B.E. - Managing Director"
                className="leadership-photo"
              />
            </div>
            <div className="leadership-info">
              <div className="leadership-badge">
                <span className="badge-pill">FOUNDER &amp; MANAGING DIRECTOR</span>
              </div>
              <h2 className="leadership-name">K. RAGHAVENDRAN <span>B.E.</span></h2>
              <div className="leadership-title">
                <i className="fas fa-briefcase"></i> Managing Director, ATV Precision Components Pvt. Ltd.
              </div>
              <div className="leadership-divider"></div>
              <p className="leadership-quote">
                “A visionary leader advocating strong ethical business practices and an uncompromising quality
                culture that drives the entire organisation to scale new heights year over year. At ATV, our passion
                for precision and technological innovation powers our customer partnerships worldwide.”
              </p>
              <div className="leadership-meta">
                <div className="meta-item">
                  <i className="fas fa-award"></i>
                  <div>
                    <strong>15+ Years</strong>
                    <span>Engineering Leadership</span>
                  </div>
                </div>
                <div className="meta-item">
                  <i className="fas fa-shield-alt"></i>
                  <div>
                    <strong>Zero-Defect</strong>
                    <span>World-Class Quality</span>
                  </div>
                </div>
                <div className="meta-item">
                  <i className="fas fa-globe-asia"></i>
                  <div>
                    <strong>Global Reach</strong>
                    <span>OEM Export Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY OVERVIEW (Exact text provided by user) ── */}
      <section className="section">
        <div className="container">
          <div className="about-overview">
            <div className="about-image-wrap" data-aos="fade-right">
              <img src="/images/manufacturing/manufacturing-hall.jpg" alt="ATV Precision Manufacturing Facility" loading="lazy" />
              <div className="about-badge">
                <strong>15+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
            <div className="about-text" data-aos="fade-left">
              <span className="section-label">About Us</span>
              <h2 className="section-title">Precision Engineering &amp; <span>Manufacturing Excellence</span></h2>
              <div className="section-divider"></div>
              <p style={{ color: 'var(--body-text)', lineHeight: 1.85, marginBottom: 18, fontSize: 15.5 }}>
                ATV is a precision engineering and manufacturing company based in Chennai, India, specializing in
                high-quality sheet metal components, precision press parts, CNC machining, fine blanking, laser
                welding, and customized sub-assemblies. With advanced manufacturing capabilities, in-house tooling,
                and state-of-the-art quality inspection facilities, we deliver reliable, durable, and
                precision-engineered solutions to diverse industries.
              </p>
              <p style={{ color: 'var(--body-text)', lineHeight: 1.85, marginBottom: 24, fontSize: 15.5 }}>
                Our integrated manufacturing ecosystem, experienced technical team, and commitment to continuous
                improvement enable us to meet complex customer requirements while maintaining high standards of
                quality, performance, and efficiency. We serve industries including <strong>Automotive, E-Mobility,
                Electrical &amp; Electronics, Aerospace &amp; Defense, and Industrial Hydraulics</strong>.
              </p>
              <div className="about-highlights">
                {whyChoose.slice(0, 6).map((w) => (
                  <div className="about-highlight" key={w.title}>
                    <i className={w.icon}></i>
                    <span>{w.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION (Exact text provided by user) ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="section-label" data-aos="fade-up">Guiding Principles</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Our Vision &amp; <span>Mission</span></h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="vm-grid">
            {/* Vision */}
            <div className="vm-card vision" data-aos="fade-right">
              <div className="vm-icon"><i className="fas fa-eye"></i></div>
              <h3>Our Vision</h3>
              <p className="vm-vision-text">
                To become a globally recognized leader in precision engineering and advanced manufacturing by
                delivering innovative, reliable, and sustainable engineering solutions while setting new benchmarks
                in quality, technology, and customer satisfaction.
              </p>
              <div className="vm-tagline-box">
                <i className="fas fa-compass"></i>
                <span>“To be a globally trusted leader in precision engineering through innovation, quality, and excellence.”</span>
              </div>
            </div>

            {/* Mission */}
            <div className="vm-card mission" data-aos="fade-left">
              <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
              <h3>Our Mission</h3>
              <ul className="mission-list">
                {missionPoints.map((point, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check-circle" style={{ color: 'var(--primary-red)', marginTop: 4, flexShrink: 0 }}></i>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="vm-tagline-box">
                <i className="fas fa-flag-checkered"></i>
                <span>“To deliver high-quality, reliable, and innovative manufacturing solutions while ensuring customer satisfaction and continuous improvement.”</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. INFRASTRUCTURE ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">World-Class Setup</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Our <span>Infrastructure</span></h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Modern manufacturing facility housing world-class presses, robotic welding, and inspection equipment.
            </p>
          </div>
          <div className="infra-grid">
            {infrastructure.map((inf, i) => (
              <div className="infra-card" key={inf.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="infra-img">
                  <img src={inf.img} alt={inf.title} loading="lazy" />
                </div>
                <div className="infra-body">
                  <h4>{inf.title}</h4>
                  <p>{inf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
