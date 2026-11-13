const capabilities = [
  { icon: 'fas fa-layer-group', title: 'Fine Blanked Components' },
  { icon: 'fas fa-stamp', title: 'Precision Stamped Parts' },
  { icon: 'fas fa-cogs', title: 'Precision Machined Components' },
  { icon: 'fas fa-cubes', title: 'Sub-Assemblies' },
  { icon: 'fas fa-industry', title: 'Advanced Manufacturing' },
  { icon: 'fas fa-shield-alt', title: 'Quality Assurance' },
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
      <section className="leadership-spotlight-section" style={{ paddingTop: '70px', paddingBottom: '30px' }}>
        <div className="container">
          <div className="venu-profile-wrapper" data-aos="fade-up">
            <div className="venu-avatar-wrap">
              <img
                src="/images/r1.png"
                alt="K. Raghavendran - Founder & Managing Director"
                className="venu-avatar-img"
              />
            </div>
            <h2 className="venu-profile-name">K. Raghavendran</h2>
            <p className="venu-profile-role">Founder &amp; Managing Director — ATV Precision Components</p>
            <p className="venu-profile-bio">
              He is a visionary, advocating strong ethical business practices and an uncompromising quality
              culture that drives the entire organisation to scale new highs YOY.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY PROFILE (From ABOUT US.docx) ── */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="about-company-card" data-aos="fade-up">
            <span className="section-label">Established in 2007</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              About <span>ATV Precision Components</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 24px' }}></div>
            <p className="about-lead-text">
              ATV Precision Components Pvt. Ltd. was established in 2007, specializing in the manufacturing of
              fine blanked components and assemblies. Located at Maraimalai Nagar Industrial Estate, approximately
              40 km from Chennai, we focus on delivering high-quality precision components.
            </p>
            <p className="about-sub-text">
              With advanced manufacturing technology and skilled professionals, we are committed to quality,
              accuracy, and customer satisfaction. Our capabilities include fine blanking, precision machining,
              stamping, and sub-assembly operations.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. OUR CORE CAPABILITIES (From ABOUT US.docx) ── */}
      <section className="section" style={{ paddingTop: '10px', paddingBottom: '50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-label" data-aos="fade-up">Expertise &amp; Capabilities</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Our Core <span>Capabilities</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="capabilities-grid">
            {capabilities.map((c, i) => (
              <div className="capability-card" key={c.title} data-aos="fade-up" data-aos-delay={i * 60}>
                <div className="capability-icon">
                  <i className={c.icon}></i>
                </div>
                <h4>{c.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VISION & MISSION (From ABOUT US.docx) ── */}
      <section className="section-alt" style={{ backgroundColor: 'transparent', paddingTop: '10px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="section-label" data-aos="fade-up">Guiding Principles</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Our Vision &amp; <span>Mission</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="vm-grid">
            {/* Vision */}
            <div className="vm-card vision" data-aos="fade-right">
              <div className="vm-icon"><i className="fas fa-eye"></i></div>
              <h3>Our Vision</h3>
              <p className="vm-vision-text">
                To become a trusted leader in precision engineering and advanced manufacturing by delivering
                innovative solutions and maintaining the highest quality standards. We strive to build strong
                customer relationships, embrace modern technology, and achieve continuous growth and excellence
                in the manufacturing industry.
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card mission" data-aos="fade-left">
              <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
              <h3>Our Mission</h3>
              <p className="vm-vision-text">
                To manufacture high-quality precision components that meet customer expectations through
                advanced technology and efficient production processes. We are committed to maintaining
                quality, ensuring product reliability, improving operational efficiency, and promoting safe
                and sustainable manufacturing practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
