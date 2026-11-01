import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero'

const galleryItems = [
  { id: 'brake', name: 'Brake Parts', img: '/images/products/Brake-parts.jpg', subtitle: 'Precision Brake Components' },
  { id: 'truck-engine', name: 'Truck Parts', img: '/images/products/Truck-parts.jpg', subtitle: 'Engine & Mounting Parts (Truck)' },
  { id: 'truck-daimler', name: 'Truck Parts', img: '/images/products/Daimler-truck.jpg', subtitle: 'Daimler Truck Pressings' },
  { id: 'car', name: 'Car Parts', img: '/images/products/car-parts.jpg', subtitle: 'Transmission Components' },
  { id: 'bike', name: 'Bike Parts', img: '/images/products/bike-parts.jpg', subtitle: 'Exhaust Components' },
  { id: 'regular', name: 'Regular Products Client Buying from Us', img: '/images/products/client-regular-products.jpg', subtitle: 'Turbocharger Components' },
]

function TruckPartsSlider({ onOpenLightbox }) {
  const images = [
    { src: '/images/products/Truck-parts.jpg', label: 'Engine Mounting (Truck)', galleryIdx: 1 },
    { src: '/images/products/Daimler-truck.jpg', label: 'Daimler Truck Parts', galleryIdx: 2 },
  ]
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div
      className="product-card truck-merged-card"
      data-aos="fade-up"
      onClick={() => onOpenLightbox(images[currentIdx].galleryIdx)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image full-view-product-img slider-container">
        {images.map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.label}
            className={`slider-img ${idx === currentIdx ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
        <div className="slider-nav-pills" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`slider-pill ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Slide to ${img.label}`}
              title={img.label}
            />
          ))}
        </div>
        <div className="product-zoom-hint">
          <i className="fas fa-search-plus"></i> View Full Photo
        </div>
      </div>
      <div className="product-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
        <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--heading-color)' }}>
          Truck Parts
        </h3>
      </div>
    </div>
  )
}

const simpleProducts = [
  {
    id: 'brake',
    img: '/images/products/Brake-parts.jpg',
    title: 'Brake Parts',
    galleryIdx: 0,
  },
  // Truck parts rendered via TruckPartsSlider component (galleryIdx 1 & 2)
  {
    id: 'car',
    img: '/images/products/car-parts.jpg',
    title: 'Car Parts',
    galleryIdx: 3,
  },
  {
    id: 'bike',
    img: '/images/products/bike-parts.jpg',
    title: 'Bike Parts',
    galleryIdx: 4,
  },
  {
    id: 'regular',
    img: '/images/products/client-regular-products.jpg',
    title: 'Regular Products Client Buying from Us',
    galleryIdx: 5,
  },
]

const industries = [
  {
    icon: 'fas fa-car',
    title: 'Automotive (Passenger Cars)',
    desc: 'Precision components for leading passenger car OEMs and Tier-1 suppliers worldwide.',
  },
  {
    icon: 'fas fa-motorcycle',
    title: 'Motorcycles & Two-Wheelers',
    desc: 'Fine blanked parts for transmission, exhaust, and braking systems in two-wheelers.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Commercial Vehicles (Trucks)',
    desc: 'Heavy-duty precision components for chassis, body, and drivetrain of commercial trucks.',
  },
  {
    icon: 'fas fa-industry',
    title: 'Industrial Machinery',
    desc: 'High-accuracy components for industrial equipment, machinery, and equipment manufacturers.',
  },
]

const matFeatures = [
  { icon: 'fas fa-database', label: 'Steel sourced from TI group and renowned overseas fine blanking steel mills' },
  { icon: 'fas fa-fire', label: 'Special spheroidization annealing process ensures perfect fine blanking quality' },
  { icon: 'fas fa-flask', label: 'In-house metallurgical laboratory validates every material batch before production' },
  { icon: 'fas fa-check-double', label: '100% material traceability from mill certificate to finished component' },
]

export default function Products() {
  const [activeIdx, setActiveIdx] = useState(null)

  useEffect(() => {
    if (activeIdx === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveIdx(null)
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % galleryItems.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIdx])

  return (
    <>
      <PageHero
        title="Our Products"
        crumbs={[{ label: 'Products' }]}
        bgImage="/images/product.jpg"
      />

      {/* ── INTRO ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" data-aos="fade-up">Product Range</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Precision <span>Components Catalogue</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
            <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
              Fine blanking produces close tolerance parts from materials of higher thickness. Cut edges are
              100% free of tear and in most cases parts are suitable for mechanical function without the need
              for subsequent machining.
            </p>
          </div>

          {/* Clean Simplified Products Grid: 1. Brake Parts, 2. Truck Parts, 3. Car Parts, 4. Bike Parts, 5. Regular Products */}
          <div className="products-grid full-view-products-grid">
            {/* 1. Brake Parts */}
            <div
              className="product-card"
              data-aos="fade-up"
              onClick={() => setActiveIdx(simpleProducts[0].galleryIdx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image full-view-product-img">
                <img src={simpleProducts[0].img} alt={simpleProducts[0].title} loading="lazy" />
                <div className="product-zoom-hint">
                  <i className="fas fa-search-plus"></i> View Full Photo
                </div>
              </div>
              <div className="product-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--heading-color)' }}>
                  {simpleProducts[0].title}
                </h3>
              </div>
            </div>

            {/* 2. Truck Parts (Auto-swiping between Engine Mounting and Daimler Truck) */}
            <TruckPartsSlider onOpenLightbox={(idx) => setActiveIdx(idx)} />

            {/* 3. Car Parts */}
            <div
              className="product-card"
              data-aos="fade-up"
              data-aos-delay="100"
              onClick={() => setActiveIdx(simpleProducts[1].galleryIdx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image full-view-product-img">
                <img src={simpleProducts[1].img} alt={simpleProducts[1].title} loading="lazy" />
                <div className="product-zoom-hint">
                  <i className="fas fa-search-plus"></i> View Full Photo
                </div>
              </div>
              <div className="product-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--heading-color)' }}>
                  {simpleProducts[1].title}
                </h3>
              </div>
            </div>

            {/* 4. Bike Parts */}
            <div
              className="product-card"
              data-aos="fade-up"
              data-aos-delay="150"
              onClick={() => setActiveIdx(simpleProducts[2].galleryIdx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image full-view-product-img">
                <img src={simpleProducts[2].img} alt={simpleProducts[2].title} loading="lazy" />
                <div className="product-zoom-hint">
                  <i className="fas fa-search-plus"></i> View Full Photo
                </div>
              </div>
              <div className="product-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--heading-color)' }}>
                  {simpleProducts[2].title}
                </h3>
              </div>
            </div>

            {/* 5. Regular Products Client Buying from Us */}
            <div
              className="product-card"
              data-aos="fade-up"
              data-aos-delay="200"
              onClick={() => setActiveIdx(simpleProducts[3].galleryIdx)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-image full-view-product-img">
                <img src={simpleProducts[3].img} alt={simpleProducts[3].title} loading="lazy" />
                <div className="product-zoom-hint">
                  <i className="fas fa-search-plus"></i> View Full Photo
                </div>
              </div>
              <div className="product-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700, color: 'var(--heading-color)' }}>
                  {simpleProducts[3].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-VIEW LIGHTBOX MODAL (Adjust and view photos one by one) ── */}
      {activeIdx !== null && (
        <div className="product-lightbox-backdrop" onClick={() => setActiveIdx(null)}>
          <div className="product-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="product-lightbox-close"
              onClick={() => setActiveIdx(null)}
              aria-label="Close full view"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Previous Button */}
            <button
              type="button"
              className="product-lightbox-nav prev"
              onClick={() => setActiveIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)}
              aria-label="Previous photo"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="product-lightbox-nav next"
              onClick={() => setActiveIdx((prev) => (prev + 1) % galleryItems.length)}
              aria-label="Next photo"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="product-lightbox-content">
              <div className="product-lightbox-img-wrap">
                <img
                  src={galleryItems[activeIdx].img}
                  alt={galleryItems[activeIdx].name}
                  className="product-lightbox-img"
                />
              </div>
              <div className="product-lightbox-caption">
                <h3>{galleryItems[activeIdx].name}</h3>
                {galleryItems[activeIdx].subtitle && (
                  <p>{galleryItems[activeIdx].subtitle}</p>
                )}
                <span className="product-lightbox-counter">
                  Photo {activeIdx + 1} of {galleryItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INDUSTRIES ── */}
      <section className="section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label" data-aos="fade-up">Sectors Served</span>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
              Industries <span>We Serve</span>
            </h2>
            <div className="section-divider" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="150"></div>
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div className="industry-card" key={ind.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <i className={ind.icon}></i>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section className="materials-section">
        <div className="container">
          <div className="materials-grid">
            <div data-aos="fade-right">
              <span className="section-label" style={{ color: 'var(--light-red)' }}>Raw Material</span>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Material <span style={{ color: 'var(--light-red)' }}>Capabilities</span>
              </h2>
              <div className="section-divider" style={{ background: 'linear-gradient(90deg, var(--light-red), transparent)' }}></div>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, fontSize: 15, marginBottom: 28 }}>
                Ability to source steel from within TI and our association with renowned fine blanking
                steel mills and suppliers from overseas. Special spheroidization annealing process of
                raw material enables the manufacturing of a perfect fine blanking part.
              </p>
              <div className="mat-features">
                {matFeatures.map((f) => (
                  <div className="mat-feature" key={f.label}>
                    <i className={f.icon}></i>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="mat-stats">
                <div className="mat-stat">
                  <strong>1.6mm</strong>
                  <span>Minimum Material Thickness</span>
                </div>
                <div className="mat-stat">
                  <strong>16mm</strong>
                  <span>Maximum Material Thickness</span>
                </div>
                <div className="mat-stat">
                  <strong>±0.01</strong>
                  <span>Tolerance (mm)</span>
                </div>
                <div className="mat-stat">
                  <strong>100%</strong>
                  <span>Material Traceability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
