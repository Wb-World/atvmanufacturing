import { useState } from 'react'
import PageHero from '../components/PageHero'

const subjects = [
  'General Enquiry',
  'Request a Quote',
  'Product Information',
  'Manufacturing Consultation',
  'Partnership Enquiry',
  'Quality / Certificates',
  'Other',
]

const contactDetails = [
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Our Address',
    content: (
      <>
        No.19, New SIDCO Industrial Estate,<br />
        Maraimalai Nagar,<br />
        Tamil Nadu – 603209, India
      </>
    ),
  },
  {
    icon: 'fas fa-phone-alt',
    title: 'Phone',
    content: <a href="tel:+914447418989">+91 44-4741-8989</a>,
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile',
    content: <a href="tel:+919841028167">+91-98410-28167</a>,
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    content: <a href="mailto:info@atvmanufacturing.com">info@atvmanufacturing.com</a>,
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Managing Director',
    content: <>K. RAGHAVENDRAN B.E.</>,
  },
]

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate form submission (replace with Formspree / EmailJS endpoint)
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ label: 'Contact Us' }]} />

      {/* ── CONTACT MAIN ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Get in Touch</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Let's Talk About <span>Your Project</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              After we get some information from you, we'll set up a time to discuss your project in further detail.
            </p>
          </div>

          <div className="contact-layout">
            {/* LEFT — FORM */}
            <div data-aos="fade-right">
              <div className="contact-form">
                <h3><i className="fas fa-paper-plane" style={{ color: 'var(--primary-green)', marginRight: 8 }}></i>Send Us a Message</h3>

                {status === 'success' && (
                  <div
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(76,175,80,0.1)',
                      border: '1px solid rgba(76,175,80,0.4)',
                      borderRadius: 'var(--radius)',
                      color: 'var(--primary-green)',
                      fontWeight: 600,
                      marginBottom: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <i className="fas fa-check-circle"></i>
                    Thank you! Your message has been sent. We'll get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company name"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your project or query in detail..."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                    ) : (
                      <><i className="fas fa-paper-plane"></i> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT — DETAILS */}
            <div data-aos="fade-left">
              <div className="contact-info">
                {contactDetails.map((d) => (
                  <div className="contact-info-card" key={d.title}>
                    <div className="ci-icon"><i className={d.icon}></i></div>
                    <div className="ci-body">
                      <strong>{d.title}</strong>
                      <p>{d.content}</p>
                    </div>
                  </div>
                ))}

                {/* Business Hours */}
                <div className="hours-card">
                  <h4><i className="fas fa-clock" style={{ marginRight: 8 }}></i>Business Hours</h4>
                  {hours.map((h) => (
                    <div className="hours-row" key={h.day}>
                      <span>{h.day}</span>
                      <strong style={{ color: h.time === 'Closed' ? 'rgba(255,255,255,0.5)' : '#fff' }}>
                        {h.time}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="section-label" data-aos="fade-up">Find Us</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Our <span>Location</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="map-container" data-aos="fade-up">
            <iframe
              title="ATV Precision Components Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0!2d80.0194!3d12.7785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f78e5c5f62bd%3A0xf06e0b2e28d8be13!2sMaraimalai%20Nagar%2C%20Tamil%20Nadu%20603209!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Directions note */}
          <div
            style={{
              marginTop: 20,
              padding: '14px 20px',
              background: 'var(--bg-section)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
              color: 'var(--muted-text)',
            }}
          >
            <i className="fas fa-directions" style={{ color: 'var(--primary-green)', fontSize: 18 }}></i>
            <span>
              <strong>Getting Here:</strong> No.19, New SIDCO Industrial Estate, Maraimalai Nagar, Tamil Nadu – 603209.
              Located approx. 45 km from Chennai city centre via GST Road (NH-44).
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
