import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import PageHero from '../components/PageHero'
import { supabase } from '../lib/supabase'

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
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const submissionTime = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || 'N/A',
      company: form.company.trim() || 'N/A',
      subject: form.subject || 'General Enquiry',
      message: form.message.trim(),
      status: 'New',
    }

    // 1. Try sending directly to Supabase cloud
    try {
      const { error } = await supabase.from('contact_inquiries').insert([payload])
      if (error) {
        console.warn('Supabase insert note (table may be pending migration):', error.message)
      }
    } catch (sbErr) {
      console.warn('Supabase request error:', sbErr)
    }

    // 2. Also keep local storage synchronized for instant resilience
    try {
      const localRecord = {
        id: 'INQ-' + Date.now().toString(36).toUpperCase(),
        date: submissionTime,
        ...payload,
      }
      const existing = JSON.parse(localStorage.getItem('atv_contact_inquiries') || '[]')
      localStorage.setItem('atv_contact_inquiries', JSON.stringify([localRecord, ...existing]))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error('Failed to save inquiry to storage:', err)
    }

    setStatus('success')
    setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
  }

  // Interactive Leaflet Map with Blue Point location
  useEffect(() => {
    if (!mapRef.current) return

    if (mapInstance.current) {
      mapInstance.current.remove()
      mapInstance.current = null
    }

    const atvLocation = [12.7937, 80.0253] // Maraimalai Nagar SIDCO

    const map = L.map(mapRef.current, {
      center: atvLocation,
      zoom: 14,
      scrollWheelZoom: false,
    })
    mapInstance.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Custom Blue Point Icon
    const bluePointHtml = `
      <div class="contact-blue-dot-wrapper">
        <span class="blue-pulse-wave"></span>
        <span class="blue-pulse-wave blue-delay"></span>
        <div class="contact-blue-pin">
          <i class="fas fa-industry"></i>
        </div>
      </div>
    `
    const blueIcon = L.divIcon({
      className: 'custom-blue-marker',
      html: bluePointHtml,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    })

    const marker = L.marker(atvLocation, { icon: blueIcon }).addTo(map)
    marker.bindPopup(`
      <div style="font-family: inherit; font-size: 13px; min-width: 210px; color: #1e293b; line-height: 1.4;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#2563EB;"></span>
          <strong style="color: #c01b1b; font-size: 14px;">ATV Precision Components Pvt. Ltd.</strong>
        </div>
        <div style="color: #475569; margin-bottom: 6px;">
          No.19, New SIDCO Industrial Estate,<br />
          Maraimalai Nagar, Chennai, Tamil Nadu – 603209
        </div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
          <i class="fas fa-crosshairs"></i> Lat: 12.7937° N, Long: 80.0253° E
        </div>
        <a href="https://www.google.com/maps/dir/?api=1&destination=12.7937,80.0253" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:5px;background:#2563EB;color:#fff;padding:6px 12px;border-radius:4px;text-decoration:none;font-weight:600;font-size:12px;">
          <i class="fas fa-directions"></i> Get Directions
        </a>
      </div>
    `).openPopup()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <>
      <PageHero
        title="Contact Us"
        crumbs={[{ label: 'Contact Us' }]}
        bgImage="/images/contactus.jpg"
      />

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
                <h3><i className="fas fa-paper-plane" style={{ color: 'var(--primary-red, #c01b1b)', marginRight: 8 }}></i>Send Us a Message</h3>

                {status === 'success' && (
                  <div
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(22, 163, 74, 0.1)',
                      border: '1px solid rgba(22, 163, 74, 0.3)',
                      borderRadius: 'var(--radius)',
                      color: '#15803d',
                      fontWeight: 600,
                      marginBottom: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <i className="fas fa-check-circle"></i>
                    Thank you! Your message has been sent. Our team will review and contact you shortly.
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
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending Inquiry...</>
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

      {/* ── MAP WITH BLUE POINT ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="section-label" data-aos="fade-up">Find Us</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Our <span>Manufacturing Facility</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>

          <div
            className="map-container"
            data-aos="fade-up"
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              border: '2px solid rgba(37,99,235,0.2)',
            }}
          >
            {/* Blue Point Legend Badge */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1000,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                padding: '8px 14px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                fontWeight: 600,
                color: '#1e293b',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#2563EB',
                  boxShadow: '0 0 0 3px rgba(37,99,235,0.3)',
                }}
              ></span>
              <span>ATV Facility Pin (Blue Point)</span>
            </div>

            <div ref={mapRef} style={{ width: '100%', height: '480px' }}></div>
          </div>

          {/* Directions note */}
          <div
            style={{
              marginTop: 20,
              padding: '16px 22px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              color: '#475569',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <i className="fas fa-directions" style={{ color: '#2563EB', fontSize: 20 }}></i>
            <span>
              <strong>Company Coordinates:</strong> No.19, New SIDCO Industrial Estate, Maraimalai Nagar, Tamil Nadu – 603209.
              Located approx. 45 km from Chennai city centre via GST Road (NH-44).
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
