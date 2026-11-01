import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ATV Company Real Location: Maraimalai Nagar, Chennai, India
const ATV_ORIGIN = {
  name: 'ATV Plant (Maraimalai Nagar)',
  city: 'Chennai, India',
  coords: [12.7937, 80.0253],
}

// Export Countries identified from the Export Invoice Details Excel
const EXPORT_COUNTRIES = [
  { id: 'usa', name: 'United States', coords: [38.5, -96.0], region: 'North America', delay: 0 },
  { id: 'mexico', name: 'Mexico', coords: [23.63, -102.55], region: 'North America', delay: 80 },
  { id: 'brazil', name: 'Brazil', coords: [-14.23, -51.92], region: 'South America', delay: 160 },
  { id: 'uk', name: 'United Kingdom', coords: [54.0, -2.5], region: 'Europe', delay: 240 },
  { id: 'france', name: 'France', coords: [46.5, 2.5], region: 'Europe', delay: 320 },
  { id: 'czech', name: 'Czech Republic', coords: [49.8, 15.5], region: 'Europe', delay: 400 },
  { id: 'slovakia', name: 'Slovakia', coords: [48.7, 19.7], region: 'Europe', delay: 480 },
  { id: 'bosnia', name: 'Bosnia & Herzegovina', coords: [44.1, 17.8], region: 'Europe', delay: 560 },
  { id: 'romania', name: 'Romania', coords: [45.9, 24.9], region: 'Europe', delay: 640 },
  { id: 'china', name: 'China', coords: [34.5, 106.0], region: 'Asia', delay: 720 },
  { id: 'korea', name: 'South Korea', coords: [36.5, 127.8], region: 'Asia', delay: 800 },
  { id: 'japan', name: 'Japan', coords: [36.2, 138.2], region: 'Asia', delay: 880 },
]

export default function ExportWorldMap() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [arcPaths, setArcPaths] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Clean up if already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Initialize Full World View Map
    const map = L.map(mapContainerRef.current, {
      center: [24, 25],
      zoom: 2,
      minZoom: 1.8,
      maxZoom: 7,
      zoomControl: true,
      scrollWheelZoom: false,
      worldCopyJump: true,
      attributionControl: false,
    })

    mapInstanceRef.current = map

    // Pristine high-contrast base map
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        subdomains: ['server', 'services'],
      }
    ).addTo(map)

    // Reference labels layer
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        subdomains: ['server', 'services'],
        opacity: 0.65,
      }
    ).addTo(map)

    // ── 1. ATV REAL LOCATION ORIGIN: ORANGE DOT ──
    const atvHubIcon = L.divIcon({
      className: 'atv-origin-node',
      html: `
        <div class="atv-orange-hub-wrapper" title="ATV Precision Components Plant - Maraimalai Nagar">
          <div class="atv-orange-radar-ring"></div>
          <div class="atv-orange-dot">
            <i class="fas fa-industry"></i>
          </div>
          <div class="atv-orange-label">ATV Plant (Maraimalai Nagar)</div>
        </div>
      `,
      iconSize: [160, 40],
      iconAnchor: [80, 20],
    })

    L.marker(ATV_ORIGIN.coords, {
      icon: atvHubIcon,
      zIndexOffset: 1000,
    }).addTo(map)

    // ── 2. DESTINATION COUNTRIES PINS ──
    EXPORT_COUNTRIES.forEach((country) => {
      const pinIcon = L.divIcon({
        className: 'export-country-node',
        html: `
          <div class="export-country-pin" id="pin-${country.id}">
            <div class="export-country-dot"></div>
            <span class="export-country-name">${country.name}</span>
          </div>
        `,
        iconSize: [140, 26],
        iconAnchor: [12, 13],
      })

      const marker = L.marker(country.coords, {
        icon: pinIcon,
        zIndexOffset: 500,
      }).addTo(map)

      marker.on('click', () => {
        setSelectedCountry(country)
      })
    })

    // Compute curved radiating arcs from ATV Maraimalai Nagar to each country
    const updateArcs = () => {
      if (!mapInstanceRef.current) return
      const originPt = mapInstanceRef.current.latLngToContainerPoint(ATV_ORIGIN.coords)

      const calculated = EXPORT_COUNTRIES.map((c, idx) => {
        const destPt = mapInstanceRef.current.latLngToContainerPoint(c.coords)
        const dx = destPt.x - originPt.x
        const dy = destPt.y - originPt.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Curve bowing upward
        const midX = (originPt.x + destPt.x) / 2
        const midY = (originPt.y + destPt.y) / 2
        const curvatureFactor = Math.min(100, Math.max(35, dist * 0.18))
        const ctrlX = midX - (dy / dist) * curvatureFactor
        const ctrlY = midY + (dx / dist) * curvatureFactor * (dx < 0 ? 0.3 : -0.3) - curvatureFactor * 0.4

        const d = `M ${originPt.x.toFixed(1)},${originPt.y.toFixed(1)} Q ${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${destPt.x.toFixed(1)},${destPt.y.toFixed(1)}`

        return {
          id: c.id,
          name: c.name,
          d,
          delay: idx * 80,
        }
      })

      setArcPaths(calculated)
    }

    map.on('move', updateArcs)
    map.on('zoom', updateArcs)
    map.on('resize', updateArcs)

    // Initial calculation after map tiles settle
    setTimeout(updateArcs, 300)

    return () => {
      map.off('move', updateArcs)
      map.off('zoom', updateArcs)
      map.off('resize', updateArcs)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <section className="section export-map-section" id="exports">
      <div className="container">
        {/* Simple Section Title requested by user: "just say EXPORTS like that" */}
        <div style={{ textAlign: 'center', marginBottom: 35 }}>
          <span className="section-label" data-aos="fade-up">Global Footprint</span>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            EXPORTS
          </h2>
          <div className="section-divider" style={{ margin: '0 auto 16px' }} data-aos="fade-up" data-aos-delay="150"></div>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 680 }} data-aos="fade-up" data-aos-delay="200">
            Global delivery corridors radiating from our Maraimalai Nagar Manufacturing Plant to automotive OEMs and Tier-1 customers worldwide.
          </p>
        </div>

        {/* ── FULL WORLD VIEW MAP CONTAINER ── */}
        <div className="world-export-map-wrapper" data-aos="fade-up" data-aos-delay="250">
          <div ref={mapContainerRef} className="world-map-canvas" />

          {/* SVG Overlay for Radiating Curved Arcs */}
          <svg className="export-arcs-svg-layer" key={animKey}>
            <defs>
              <linearGradient id="exportArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#E53935" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FF3B30" stopOpacity="1" />
              </linearGradient>

              {/* Marker Arrowhead definition */}
              <marker
                id="exportArrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E53935" />
              </marker>
            </defs>

            {arcPaths.map((arc) => (
              <g key={arc.id} className="export-arc-group">
                {/* Background base guide */}
                <path d={arc.d} className="export-arc-track" />

                {/* Animated radiating curve arc */}
                <path
                  d={arc.d}
                  className="export-radiating-arc"
                  markerEnd="url(#exportArrow)"
                  style={{ animationDelay: `${arc.delay}ms` }}
                />

                {/* Moving energy pulse dot */}
                <path
                  d={arc.d}
                  className="export-energy-pulse"
                  style={{ animationDelay: `${arc.delay + 200}ms` }}
                />
              </g>
            ))}
          </svg>

          {/* Simple Legend */}
          <div className="export-map-legend">
            <span className="legend-item">
              <span className="orange-dot-sample"></span>
              <strong>ATV Plant:</strong> Maraimalai Nagar, Chennai, India
            </span>
            <span className="legend-item">
              <i className="fas fa-arrow-right" style={{ color: '#E53935' }}></i>
              <span>Direct Export Corridors ({EXPORT_COUNTRIES.length} Countries)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
