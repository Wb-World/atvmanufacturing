const missionPoints = [
  'To manufacture high-precision components that meet and exceed customer expectations.',
  'To maintain world-class quality standards through advanced technology and continuous improvement.',
  'To strengthen our manufacturing capabilities through innovation, automation, and engineering excellence.',
  'To build long-term partnerships through reliability, transparency, and timely delivery.',
  'To promote sustainable manufacturing practices while ensuring operational efficiency.',
  'To deliver defect-free products and establish lasting trust with customers across global markets.',
]

export default function About() {
  return (
    <div
      className="about-page-wrapper"
      style={{
        backgroundImage: 'url("/images/background-aboutus.jpg")',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center top',
        backgroundColor: '#f5f4f2',
        minHeight: '100vh',
      }}
    >
      {/* ── 1. LEADERSHIP SPOTLIGHT AT THE TOP (Exact venuengg.com style) ── */}
      <section className="leadership-spotlight-section" style={{ paddingTop: '70px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="venu-profile-wrapper" data-aos="fade-up">
            <div className="venu-avatar-wrap">
              <img
                src="/images/r1.png"
                alt="K. Raghavendran - Founder & Managing Director"
                className="venu-avatar-img"
              />
            </div>
            <h2 className="venu-profile-name">K Raghavendran</h2>
            <p className="venu-profile-role">Founder &amp; Managing Director — ATV Precision Components</p>
            <p className="venu-profile-bio">
              He is a visionary, advocating strong ethical business practices and an uncompromising quality
              culture that drives the entire organisation to scale new highs YOY.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. VISION & MISSION (Exact text provided by user) ── */}
      <section className="section-alt" style={{ backgroundColor: 'transparent' }}>
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
    </div>
  )
}
