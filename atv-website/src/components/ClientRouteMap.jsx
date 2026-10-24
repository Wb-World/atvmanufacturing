import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ATV Origin Coordinates (Unit 1 & Unit 2, New SIDCO Industrial Estate, Maraimalai Nagar, Chennai)
const ATV_ORIGIN = {
  name: 'ATV Precision Components Pvt. Ltd.',
  tag: 'Manufacturing Headquarters & Fine Blanking Plant',
  address: 'No.19 & 36, New SIDCO Industrial Estate, Maraimalai Nagar, Tamil Nadu 603209',
  coords: [12.7937, 80.0253],
}

// 15 Automotive & Industrial Clients with real logistics routes from Maraimalai Nagar
const clientsData = [
  {
    id: 'woosu',
    name: 'Woosu Automotive India',
    tier: 'Tier-1 Automotive Partner',
    hub: 'Singaperumal Koil / MM Nagar Industrial Corridor',
    region: 'chennai-corridor',
    distanceKm: 7,
    transitTime: '12 mins',
    highway: 'NH 45 (GST Road)',
    products: 'Turbocharger parts, deep drawn pressings & transmission brackets',
    frequency: 'Daily JIT Express Deliveries (Zero-Delay Supply)',
    logo: '/images/clients/woosu-india-client.jpg',
    coords: [12.7615, 80.0052],
    route: [
      [12.7937, 80.0253],
      [12.7845, 80.0195],
      [12.7720, 80.0125],
      [12.7615, 80.0052],
    ],
  },
  {
    id: 'daimler',
    name: 'Daimler India Commercial Vehicles',
    tier: 'Commercial Vehicle OEM (BharatBenz)',
    hub: 'SIPCOT Industrial Growth Centre, Oragadam',
    region: 'oragadam-sriperumbudur',
    distanceKm: 16,
    transitTime: '22 mins',
    highway: 'SH 57 Oragadam 6-Lane Expressway',
    products: 'Heavy commercial vehicle chassis pressings, brake levers & engine brackets',
    frequency: 'Continuous Dedicated Freight Shuttle',
    logo: '/images/clients/daimler-truck.jpg',
    coords: [12.8312, 79.9234],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.7820, 79.9650],
      [12.8050, 79.9410],
      [12.8312, 79.9234],
    ],
  },
  {
    id: 'gestamp',
    name: 'Gestamp Automocion',
    tier: 'Global Tier-1 Structural Stamping',
    hub: 'Oragadam SIPCOT Phase II',
    region: 'oragadam-sriperumbudur',
    distanceKm: 18,
    transitTime: '25 mins',
    highway: 'SH 57 Oragadam Corridor',
    products: 'Automotive structural fine blanked pressings & seating system components',
    frequency: 'Direct Kanban Line Supply',
    logo: '/images/clients/gestamp-client.jpg',
    coords: [12.8425, 79.9362],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.7880, 79.9620],
      [12.8220, 79.9410],
      [12.8425, 79.9362],
    ],
  },
  {
    id: 'garrett',
    name: 'Garrett Advancing Motion',
    tier: 'Global Turbocharger Technology Leader',
    hub: 'Oragadam Automotive Cluster',
    region: 'oragadam-sriperumbudur',
    distanceKm: 21,
    transitTime: '28 mins',
    highway: 'SH 57 Oragadam Link',
    products: 'Fine blanked turbocharger wastegate levers, heat shields & mounting brackets',
    frequency: 'Scheduled High-Volume Synchronized JIT',
    logo: '/images/clients/garrett-advancing-motion-client.jpg',
    coords: [12.8530, 79.9180],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.7950, 79.9550],
      [12.8350, 79.9250],
      [12.8530, 79.9180],
    ],
  },
  {
    id: 'hyundai',
    name: 'Hyundai Motor India / Tier-1 Partners',
    tier: 'Global Automotive OEM & Tier-1',
    hub: 'Irungattukottai SIPCOT, Sriperumbudur',
    region: 'oragadam-sriperumbudur',
    distanceKm: 28,
    transitTime: '35 mins',
    highway: 'Chennai Outer Ring Road & NH 48',
    products: '100 PPM certified fine blanked powertrain & brake assemblies',
    frequency: 'Certified 100 PPM Supplier Logistics Protocol',
    logo: '/images/clients/woosu-india-client.jpg',
    coords: [13.0035, 79.9880],
    route: [
      [12.7937, 80.0253],
      [12.8300, 80.0380],
      [12.8900, 80.0350],
      [12.9450, 80.0120],
      [12.9850, 79.9980],
      [13.0035, 79.9880],
    ],
  },
  {
    id: 'inzi',
    name: 'Inzi Controls India',
    tier: 'Powertrain & Engine Cooling Systems',
    hub: 'Irungattukottai SIPCOT Industrial Park',
    region: 'oragadam-sriperumbudur',
    distanceKm: 29,
    transitTime: '36 mins',
    highway: 'Sriperumbudur Logistics Highway',
    products: 'Thermal control valve plates, precision stamped engine brackets',
    frequency: 'Daily Scheduled Dispatch',
    logo: '/images/clients/inzi-controls-client.jpg',
    coords: [12.9962, 79.9740],
    route: [
      [12.7937, 80.0253],
      [12.8350, 80.0350],
      [12.8950, 80.0300],
      [12.9550, 80.0050],
      [12.9962, 79.9740],
    ],
  },
  {
    id: 'delphi',
    name: 'Delphi-TVS Technologies',
    tier: 'Fuel Injection & Powertrain Tier-1',
    hub: 'Mannur / Sriperumbudur Industrial Hub',
    region: 'oragadam-sriperumbudur',
    distanceKm: 32,
    transitTime: '40 mins',
    highway: 'SH 57 Sriperumbudur Expressway',
    products: 'Precision common rail & diesel fuel injection mounting plates',
    frequency: 'Daily Production Line Feeding',
    logo: '/images/clients/delphi-tvs-tech-client.jpg',
    coords: [12.9820, 79.9480],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.8350, 79.9250],
      [12.9150, 79.9320],
      [12.9820, 79.9480],
    ],
  },
  {
    id: 'nash',
    name: 'Nash Industries',
    tier: 'Automotive Precision Stamping Leader',
    hub: 'Sriperumbudur SIPCOT Sector',
    region: 'oragadam-sriperumbudur',
    distanceKm: 31,
    transitTime: '38 mins',
    highway: 'SH 57 & NH 48 Corridor',
    products: 'Deep drawn metal parts, fine blanked functional levers & assemblies',
    frequency: 'Daily JIT Supply System',
    logo: '/images/clients/nash-industries client.jpg',
    coords: [12.9710, 79.9390],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.8350, 79.9250],
      [12.9050, 79.9300],
      [12.9710, 79.9390],
    ],
  },
  {
    id: 'enkei',
    name: 'Enkei Wheels India',
    tier: 'Global Automotive Wheel OEM',
    hub: 'Sriperumbudur Hi-Tech SEZ',
    region: 'oragadam-sriperumbudur',
    distanceKm: 29,
    transitTime: '35 mins',
    highway: 'Oragadam-Sriperumbudur 6-Lane',
    products: 'Automotive wheel mounting plates & disc brake hardware',
    frequency: 'Scheduled Shift-Wise Dispatches',
    logo: '/images/clients/ENKEI-client.jpg',
    coords: [12.9540, 79.9220],
    route: [
      [12.7937, 80.0253],
      [12.7650, 80.0020],
      [12.8350, 79.9250],
      [12.8950, 79.9200],
      [12.9540, 79.9220],
    ],
  },
  {
    id: 'tel',
    name: 'TEL (Turbo Energy Ltd. - BorgWarner TVS)',
    tier: 'Turbocharger Systems Specialist',
    hub: 'Paiyanur / OMR Automotive Technology Hub',
    region: 'chennai-corridor',
    distanceKm: 34,
    transitTime: '42 mins',
    highway: 'Chengalpattu-Thiruporur Link & OMR',
    products: 'Turbocharger nozzle rings, wastegates & precision actuating levers',
    frequency: 'Direct-to-Line Assembly Feed',
    logo: '/images/clients/Tel-turbo-energy-client.jpg',
    coords: [12.6340, 80.1450],
    route: [
      [12.7937, 80.0253],
      [12.7600, 80.0450],
      [12.7150, 80.0850],
      [12.6650, 80.1250],
      [12.6340, 80.1450],
    ],
  },
  {
    id: 'zfrane',
    name: 'ZF / Rane Automotive',
    tier: 'Steering & Safety Systems Tier-1',
    hub: 'Singaperumal Koil / Guduvanchery Sector',
    region: 'chennai-corridor',
    distanceKm: 9,
    transitTime: '15 mins',
    highway: 'NH 45 (GST Road)',
    products: 'Steering rack guide components, fine blanked pinion washers',
    frequency: 'Frequent Daily Shuttle Deliveries',
    logo: '/images/clients/zf-rane client.jpg',
    coords: [12.8420, 80.0540],
    route: [
      [12.7937, 80.0253],
      [12.8120, 80.0380],
      [12.8420, 80.0540],
    ],
  },
  {
    id: 'brakesindia',
    name: 'TVS Brakes India (IVS)',
    tier: 'Automotive Braking Systems Giant',
    hub: 'Padi Industrial Estate, Chennai',
    region: 'chennai-corridor',
    distanceKm: 44,
    transitTime: '55 mins',
    highway: 'NH 45 & Chennai Inner Ring Road',
    products: 'Brake caliper brackets, parking brake levers & fine blanked backing plates',
    frequency: 'Daily Synchronized Consignments',
    logo: '/images/clients/brakes-india-ivs-client.jpg',
    coords: [13.0950, 80.1830],
    route: [
      [12.7937, 80.0253],
      [12.8550, 80.0650],
      [12.9250, 80.1150],
      [12.9980, 80.1750],
      [13.0450, 80.1820],
      [13.0950, 80.1830],
    ],
  },
  {
    id: 'abishowatech',
    name: 'ABI Showatech',
    tier: 'Precision Machined & Stamped Assemblies',
    hub: 'Sholinghur / Ranipet Industrial Complex',
    region: 'regional-south',
    distanceKm: 88,
    transitTime: '1 hr 45 mins',
    highway: 'NH 48 Chennai-Bengaluru Highway',
    products: 'Braking system plates, transmission components & deep drawn cups',
    frequency: 'Daily Inter-District Freight Dispatch',
    logo: '/images/clients/ABI showatech.jpg',
    coords: [13.1120, 79.4220],
    route: [
      [12.7937, 80.0253],
      [12.8350, 80.0050],
      [12.9800, 79.9450],
      [12.9850, 79.7000],
      [13.0450, 79.5500],
      [13.1120, 79.4220],
    ],
  },
  {
    id: 'saurer',
    name: 'Saurer Textile Solutions',
    tier: 'High-Precision Industrial Machinery',
    hub: 'Coimbatore Industrial Engineering Corridor',
    region: 'regional-south',
    distanceKm: 475,
    transitTime: '8 hrs',
    highway: 'NH 38 & NH 544 Express Corridor',
    products: 'High-speed textile spinning fine blanked mechanisms & cam plates',
    frequency: 'Weekly Dedicated High-Value Logistics',
    logo: '/images/clients/Saurer-client.jpg',
    coords: [11.0180, 76.9580],
    route: [
      [12.7937, 80.0253],
      [12.3500, 79.8500],
      [11.9500, 79.5000],
      [11.6600, 78.1500],
      [11.3500, 77.7200],
      [11.0180, 76.9580],
    ],
  },
  {
    id: 'irclient',
    name: 'Ingersoll Rand (IR)',
    tier: 'Global Industrial Air & Power OEM',
    hub: 'Narhe Auto Engineering Cluster, Pune',
    region: 'national-hub',
    distanceKm: 1180,
    transitTime: '22 hrs',
    highway: 'Golden Quadrilateral NH 48',
    products: 'Compressor reed valves, high-pressure fine blanked plates',
    frequency: 'Dedicated Interstate Express Logistics',
    logo: '/images/clients/IR-client.jpg',
    coords: [18.5200, 73.8560],
    route: [
      [12.7937, 80.0253],
      [12.9700, 79.9500],
      [12.9700, 77.5900],
      [15.3600, 75.1200],
      [16.8500, 74.5800],
      [18.5200, 73.8560],
    ],
  },
]

export default function ClientRouteMap() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const polylinesRef = useRef({})
  const markersRef = useRef({})

  const [selectedClientId, setSelectedClientId] = useState('daimler')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isTouring, setIsTouring] = useState(false)
  const tourTimerRef = useRef(null)

  const selectedClient = clientsData.find((c) => c.id === selectedClientId) || clientsData[0]

  // Filtered clients
  const filteredClients = clientsData.filter((c) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'oragadam-sriperumbudur') return c.region === 'oragadam-sriperumbudur'
    if (activeFilter === 'chennai-corridor') return c.region === 'chennai-corridor'
    if (activeFilter === 'regional-national') return c.region === 'regional-south' || c.region === 'national-hub'
    return true
  })

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    // Create Leaflet Map centered on Chennai industrial belt
    const map = L.map(mapContainerRef.current, {
      center: [12.8700, 79.9800],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false,
    })

    // Custom Zoom control in bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Standard OpenStreetMap Tile Layer (100% free, crisp, no API key watermark)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // 1. Add ATV Origin Marker
    const originIcon = L.divIcon({
      className: 'atv-origin-marker',
      html: `
        <div class="atv-pin-wrapper">
          <div class="atv-pin-pulse"></div>
          <div class="atv-pin-badge">
            <i class="fas fa-industry"></i>
          </div>
          <span class="atv-pin-label">ATV Origin Hub</span>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    })

    const originMarker = L.marker(ATV_ORIGIN.coords, { icon: originIcon, zIndexOffset: 1000 }).addTo(map)
    originMarker.bindPopup(`
      <div style="font-family: var(--font-body); padding: 4px;">
        <strong style="color: #1D4ED8; font-size: 14px; display: block; margin-bottom: 2px;">
          ${ATV_ORIGIN.name}
        </strong>
        <span style="font-size: 11px; color: #64748B; display: block; margin-bottom: 6px;">
          ${ATV_ORIGIN.tag}
        </span>
        <div style="font-size: 11px; line-height: 1.4; color: #334155;">
          ${ATV_ORIGIN.address}
        </div>
      </div>
    `)

    // 2. Add Client Markers & Base Route Lines
    clientsData.forEach((c) => {
      // Custom client pin
      const clientIcon = L.divIcon({
        className: `client-map-marker client-marker-${c.id}`,
        html: `
          <div class="client-pin-wrapper" id="client-pin-${c.id}">
            <div class="client-pin-thumb">
              <img src="${c.logo}" alt="${c.name}" onerror="this.style.display='none'" />
            </div>
            <div class="client-pin-dist">${c.distanceKm} km</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      const marker = L.marker(c.coords, { icon: clientIcon }).addTo(map)
      marker.on('click', () => {
        setSelectedClientId(c.id)
      })

      markersRef.current[c.id] = marker

      // Draw route polyline
      const polyline = L.polyline(c.route, {
        color: '#60A5FA',
        weight: 3,
        opacity: 0.45,
        dashArray: '6, 8',
        lineCap: 'round',
      }).addTo(map)

      polyline.on('click', () => {
        setSelectedClientId(c.id)
      })

      polylinesRef.current[c.id] = polyline
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Highlight Selected Route and animate map
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !selectedClient) return

    // Update polylines styling
    clientsData.forEach((c) => {
      const poly = polylinesRef.current[c.id]
      if (!poly) return

      if (c.id === selectedClient.id) {
        poly.setStyle({
          color: '#1D4ED8',
          weight: 6,
          opacity: 0.95,
          dashArray: null,
        })
        poly.bringToFront()
      } else {
        poly.setStyle({
          color: '#93C5FD',
          weight: 2.5,
          opacity: 0.35,
          dashArray: '5, 8',
        })
      }
    })

    // Highlight active marker class
    document.querySelectorAll('.client-pin-wrapper').forEach((el) => {
      el.classList.remove('active-pin')
    })
    const activePinEl = document.getElementById(`client-pin-${selectedClient.id}`)
    if (activePinEl) {
      activePinEl.classList.add('active-pin')
    }

    // Zoom/pan map to encompass both origin and selected client
    const bounds = L.latLngBounds([ATV_ORIGIN.coords, selectedClient.coords])
    map.flyToBounds(bounds, {
      padding: [80, 80],
      maxZoom: 13,
      duration: 1.2,
      easeLinearity: 0.25,
    })
  }, [selectedClientId])

  // Auto-tour routes handler
  const toggleTour = () => {
    if (isTouring) {
      clearInterval(tourTimerRef.current)
      setIsTouring(false)
    } else {
      setIsTouring(true)
      let idx = clientsData.findIndex((c) => c.id === selectedClientId)
      tourTimerRef.current = setInterval(() => {
        idx = (idx + 1) % clientsData.length
        setSelectedClientId(clientsData[idx].id)
      }, 4000)
    }
  }

  useEffect(() => {
    return () => clearInterval(tourTimerRef.current)
  }, [])

  // Reset to full view
  const handleResetOverview = () => {
    const map = mapInstanceRef.current
    if (!map) return
    const allCoords = [ATV_ORIGIN.coords, ...clientsData.map((c) => c.coords)]
    map.flyToBounds(L.latLngBounds(allCoords), {
      padding: [50, 50],
      maxZoom: 11,
      duration: 1.2,
    })
  }

  // Next / Prev client
  const handleNextClient = () => {
    const currIdx = clientsData.findIndex((c) => c.id === selectedClientId)
    const nextIdx = (currIdx + 1) % clientsData.length
    setSelectedClientId(clientsData[nextIdx].id)
  }

  const handlePrevClient = () => {
    const currIdx = clientsData.findIndex((c) => c.id === selectedClientId)
    const prevIdx = (currIdx - 1 + clientsData.length) % clientsData.length
    setSelectedClientId(clientsData[prevIdx].id)
  }

  return (
    <section className="section client-routes-section" id="client-routes">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-label" data-aos="fade-up">Logistics & Supply Reach</span>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Our Clients <span>& Delivery Corridors</span>
          </h2>
          <div className="section-divider" style={{ margin: '0 auto 20px' }} data-aos="fade-up" data-aos-delay="150"></div>
          <p className="section-subtitle" style={{ margin: '0 auto' }} data-aos="fade-up" data-aos-delay="200">
            Real-time delivery routes from our Maraimalai Nagar Manufacturing Plant to top automotive OEMs
            and Tier-1 assembly hubs across Chennai, Tamil Nadu, and India.
          </p>
        </div>

        {/* Corridor Quick Stats Strip */}
        <div className="corridor-stats-strip" data-aos="fade-up" data-aos-delay="220">
          <div className="corridor-stat">
            <i className="fas fa-map-marker-alt" style={{ color: '#E11D48' }}></i>
            <div>
              <strong>Maraimalai Nagar SIDCO</strong>
              <span>Central Manufacturing Hub</span>
            </div>
          </div>
          <div className="corridor-stat">
            <i className="fas fa-truck-moving" style={{ color: '#2563EB' }}></i>
            <div>
              <strong>15 Key Client Routes</strong>
              <span>JIT Synchronized Logistics</span>
            </div>
          </div>
          <div className="corridor-stat">
            <i className="fas fa-tachometer-alt" style={{ color: '#10B981' }}></i>
            <div>
              <strong>&lt; 40 Mins Transit</strong>
              <span>To 80% of Chennai OEM Hubs</span>
            </div>
          </div>
          <div className="corridor-stat">
            <i className="fas fa-certificate" style={{ color: '#F59E0B' }}></i>
            <div>
              <strong>100 PPM &amp; IATF 16949</strong>
              <span>Zero-Defect Quality Direct to Line</span>
            </div>
          </div>
        </div>

        {/* Map Interactive Toolbar */}
        <div className="map-toolbar" data-aos="fade-up" data-aos-delay="250">
          {/* Filter Pills */}
          <div className="map-filter-pills">
            <button
              type="button"
              className={`map-filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Clients ({clientsData.length})
            </button>
            <button
              type="button"
              className={`map-filter-pill ${activeFilter === 'oragadam-sriperumbudur' ? 'active' : ''}`}
              onClick={() => setActiveFilter('oragadam-sriperumbudur')}
            >
              Oragadam &amp; Sriperumbudur
            </button>
            <button
              type="button"
              className={`map-filter-pill ${activeFilter === 'chennai-corridor' ? 'active' : ''}`}
              onClick={() => setActiveFilter('chennai-corridor')}
            >
              Chennai &amp; GST Corridor
            </button>
            <button
              type="button"
              className={`map-filter-pill ${activeFilter === 'regional-national' ? 'active' : ''}`}
              onClick={() => setActiveFilter('regional-national')}
            >
              Regional &amp; National Hubs
            </button>
          </div>

          {/* Action Buttons */}
          <div className="map-actions">
            <button
              type="button"
              className={`btn btn-sm ${isTouring ? 'btn-primary' : 'btn-outline'}`}
              onClick={toggleTour}
              style={{ fontSize: 13 }}
            >
              <i className={`fas ${isTouring ? 'fa-pause' : 'fa-play'}`}></i>
              {isTouring ? 'Pause Tour' : 'Auto-Tour Routes'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={handleResetOverview}
              style={{ fontSize: 13 }}
            >
              <i className="fas fa-compress-arrows-alt"></i> Reset Overview
            </button>
          </div>
        </div>

        {/* Main Map Box + Route Intelligence Overlay */}
        <div className="client-map-wrapper" data-aos="fade-up" data-aos-delay="300">
          {/* Leaflet DOM container */}
          <div className="client-map-canvas" ref={mapContainerRef}></div>

          {/* Active Route Floating Card */}
          {selectedClient && (
            <div className="active-route-card">
              <div className="route-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    className="route-client-logo"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div>
                    <h4>{selectedClient.name}</h4>
                    <span className="route-client-tier">{selectedClient.tier}</span>
                  </div>
                </div>
                <div className="route-nav-arrows">
                  <button type="button" onClick={handlePrevClient} title="Previous Client">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button type="button" onClick={handleNextClient} title="Next Client">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Route Metric Badges */}
              <div className="route-metrics-grid">
                <div className="route-metric-badge">
                  <span className="metric-label">Direct Distance</span>
                  <strong className="metric-val" style={{ color: '#1D4ED8' }}>
                    <i className="fas fa-road" style={{ marginRight: 4 }}></i>
                    {selectedClient.distanceKm} km
                  </strong>
                </div>
                <div className="route-metric-badge">
                  <span className="metric-label">Transit Time</span>
                  <strong className="metric-val" style={{ color: '#059669' }}>
                    <i className="fas fa-clock" style={{ marginRight: 4 }}></i>
                    ~{selectedClient.transitTime}
                  </strong>
                </div>
              </div>

              {/* Route Details */}
              <div className="route-details-list">
                <div className="route-detail-row">
                  <span className="route-detail-label">Origin:</span>
                  <span className="route-detail-val">ATV Plant (Maraimalai Nagar)</span>
                </div>
                <div className="route-detail-row">
                  <span className="route-detail-label">Destination Hub:</span>
                  <span className="route-detail-val">{selectedClient.hub}</span>
                </div>
                <div className="route-detail-row">
                  <span className="route-detail-label">Highway Route:</span>
                  <span className="route-detail-val">{selectedClient.highway}</span>
                </div>
                <div className="route-detail-row">
                  <span className="route-detail-label">Components:</span>
                  <span className="route-detail-val" style={{ color: '#1E293B', fontWeight: 600 }}>
                    {selectedClient.products}
                  </span>
                </div>
                <div className="route-detail-row">
                  <span className="route-detail-label">Dispatch Mode:</span>
                  <span className="route-detail-val">{selectedClient.frequency}</span>
                </div>
              </div>

              {/* Action */}
              <div style={{ marginTop: 16 }}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${ATV_ORIGIN.coords[0]},${ATV_ORIGIN.coords[1]}&destination=${selectedClient.coords[0]},${selectedClient.coords[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
                >
                  <i className="fas fa-directions"></i> Open in Google Maps GPS Navigation
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Client Selection Strip Below Map */}
        <div className="clients-selector-strip" data-aos="fade-up" data-aos-delay="350">
          <div className="selector-instruction">
            <i className="fas fa-hand-pointer"></i>
            <span>Click any client below to inspect their direct delivery corridor from ATV:</span>
          </div>

          <div className="clients-horizontal-cards">
            {filteredClients.map((c) => {
              const isSelected = c.id === selectedClientId
              return (
                <div
                  key={c.id}
                  className={`client-selector-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedClientId(c.id)}
                >
                  <div className="client-thumb-box">
                    <img src={c.logo} alt={c.name} loading="lazy" />
                  </div>
                  <div className="client-selector-info">
                    <strong>{c.name}</strong>
                    <span>{c.hub.split(',')[0]}</span>
                    <span className="client-distance-pill">
                      <i className="fas fa-route"></i> {c.distanceKm} km (~{c.transitTime})
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
