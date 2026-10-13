import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const whyChoose = [
  { icon: 'fas fa-cut', title: 'Superior Edge Quality' },
  { icon: 'fas fa-ruler-combined', title: 'Superb Dimensional Control' },
  { icon: 'fas fa-layer-group', title: 'Enhanced Part Flatness' },
  { icon: 'fas fa-cogs', title: 'Multiple Features in One Operation' },
  { icon: 'fas fa-flask', title: 'In-house Material Testing Lab' },
  { icon: 'fas fa-leaf', title: 'Environmental Sustainability' },
  { icon: 'fas fa-globe', title: 'Global Client Base' },
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
    img: '/images/manufacturing/robotic-welding.jpg',
    title: 'Robotic Welding Machine',
    desc: 'Industrial robotic welding for automated precision welding with uniform quality and high throughput.',
  },
  {
    img: '/images/manufacturing/feintool-2.jpg',
    title: 'Automated Industrial Processing',
    desc: 'Enclosed automated processing machine with digital controls for consistent, precision-oriented output.',
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
    <>
      <PageHero title="About Us" crumbs={[{ label: 'About Us' }]} />

      {/* ── COMPANY OVERVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="about-overview">
            <div className="about-image-wrap" data-aos="fade-right">
              <img src="/images/manufacturing/manufacturing-hall.jpg" alt="ATV Precision Manufacturing Facility" loading="lazy" />
              <div className="about-badge">
                <strong>25+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
            <div className="about-text" data-aos="fade-left">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Pioneers in <span>Fine Blanking Technology</span></h2>
              <div className="section-divider"></div>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
                <strong>ATV Precision Components Pvt. Ltd.</strong> is a leading fine blanking and precision
                metal component manufacturer based in Maraimalai Nagar, Tamil Nadu, India.
              </p>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
                We specialize in producing close-tolerance, near-net-shape metal parts for automotive,
                commercial vehicle, and industrial applications. Our state-of-the-art manufacturing
                facility is equipped with advanced fine blanking presses, robotic welding systems,
                and a fully equipped metallurgical testing laboratory.
              </p>
              <p style={{ color: 'var(--muted-text)', lineHeight: 1.9, marginBottom: 28, fontSize: 15 }}>
                With a deep commitment to precision, quality, and environmental sustainability, we serve
                leading OEMs and Tier-1 suppliers across India and internationally.
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

      {/* ── MD MESSAGE ── */}
      <section className="md-section">
        <div className="container">
          <div className="md-card" data-aos="fade-up">
            <div className="md-photo">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <p className="md-quote">
                At ATV Precision Components, our passion for precision drives every decision we make —
                from the materials we source to the processes we employ. We believe that in manufacturing,
                excellence is not a goal but a minimum standard. Our commitment to fine blanking technology
                ensures that every component we deliver meets the exacting demands of the world's most
                demanding industries.
              </p>
              <div className="md-name">K. RAGHAVENDRAN B.E.</div>
              <div className="md-title">Managing Director, ATV Precision Components Pvt. Ltd.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Our Direction</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Vision &amp; <span>Mission</span></h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="vm-grid">
            <div className="vm-card vision" data-aos="fade-right">
              <div className="vm-icon"><i className="fas fa-eye"></i></div>
              <h3>Our Vision</h3>
              <p>
                To be a globally recognized leader in fine blanking technology, delivering precision
                components that drive the future of mobility and industrial innovation. We envision a
                world where every ATV component exemplifies the highest standard of quality and reliability.
              </p>
            </div>
            <div className="vm-card mission" data-aos="fade-left">
              <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
              <h3>Our Mission</h3>
              <p>
                To provide our customers with superior quality, cost-effective fine blanked components
                through continuous innovation, sustainable practices, and unwavering commitment to precision.
                We are dedicated to exceeding customer expectations through operational excellence and
                a culture of continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Our Strengths</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Why Choose <span>ATV Precision</span></h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="why-grid">
            {whyChoose.map((w, i) => (
              <div className="why-card" key={w.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <i className={w.icon}></i>
                <h4>{w.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Our Facility</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Infrastructure <span>Highlights</span></h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              State-of-the-art machinery and facilities to deliver world-class precision components.
            </p>
          </div>
          <div className="infra-grid">
            {infrastructure.map((item, i) => (
              <div className="infra-card" key={item.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="infra-image">
                  <img src={item.img} alt={item.title} loading="lazy" />
                </div>
                <div className="infra-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-content">
            <h2 data-aos="fade-up">Partner With Us for Precision That Performs</h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Join a growing list of global manufacturers who trust ATV Precision for their most demanding components.
            </p>
            <Link to="/contact" className="btn btn-outline" data-aos="fade-up" data-aos-delay="200">
              <i className="fas fa-handshake"></i> Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
