import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ATV Origin Coordinates (Unit 1 & Unit 2, New SIDCO Industrial Estate, Maraimalai Nagar, Chennai)
const ATV_ORIGIN = {
  name: 'ATV Precision Components Pvt. Ltd.',
  tag: 'Manufacturing Headquarters & Fine Blanking Plant',
  address: 'No.19 & 36, New SIDCO Industrial Estate, Maraimalai Nagar, Tamil Nadu 603209, India',
  coords: [12.7937, 80.0253],
}

// 15 Key Automotive OEM & Tier-1 Clients with coordinates & arc curvature parameters
const clientsData = [
  {
    id: 'woosu',
    name: 'Woosu Automotive India',
    tier: 'Tier-1 Automotive Partner',
    hub: 'Singaperumal Koil / MM Nagar Corridor',
    region: 'chennai-corridor',
    distanceKm: 7,
    transitTime: '12 mins',
    highway: 'NH 45 (GST Road)',
    products: 'Turbocharger parts, deep drawn pressings & transmission brackets',
    frequency: 'Daily JIT Express Deliveries (Zero-Delay Supply)',
    logo: '/images/clients/woosu-india-client.jpg',
    coords: [12.7615, 80.0052],
    curveDir: -1,
    curveBend: 0.28,
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
    curveDir: 1,
    curveBend: 0.22,
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
    curveDir: 1,
    curveBend: 0.30,
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
    curveDir: 1,
    curveBend: 0.38,
  },
  {
    id: 'hyundai',
    name: 'Hyundai Motor India / Tier-1 Partners',
    tier: 'Global Automotive OEM & Tier-1 Hub',
    hub: 'Irungattukottai SIPCOT, Sriperumbudur',
    region: 'oragadam-sriperumbudur',
    distanceKm: 28,
    transitTime: '35 mins',
    highway: 'Chennai Outer Ring Road & NH 48',
    products: '100 PPM certified fine blanked powertrain & brake assemblies',
    frequency: 'Certified 100 PPM Supplier Logistics Protocol',
    logo: '/images/clients/woosu-india-client.jpg',
    coords: [13.0035, 79.9880],
    curveDir: -1,
    curveBend: 0.20,
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
    curveDir: -1,
    curveBend: 0.28,
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
    frequency: 'Daily Express Shuttle',
    logo: '/images/clients/delphi-tvs-tech-client.jpg',
    coords: [13.0210, 79.9450],
    curveDir: -1,
    curveBend: 0.34,
  },
  {
    id: 'tvs-lucas',
    name: 'Lucas TVS Ltd.',
    tier: 'Automotive Electrical & Starter Systems',
    hub: 'Padi Industrial Estate, Chennai',
    region: 'chennai-corridor',
    distanceKm: 41,
    transitTime: '52 mins',
    highway: 'Chennai Inner Ring Road & GST Road',
    products: 'Starter motor pole shoes, bracket pressings & alternator components',
    frequency: 'Daily Multi-Point Logistics',
    logo: '/images/clients/brakes-india-ivs-client.jpg',
    coords: [13.0980, 80.1830],
    curveDir: 1,
    curveBend: 0.24,
  },
  {
    id: 'brakes-india',
    name: 'Brakes India (TVS / TSF Group)',
    tier: 'Braking Systems Tier-1 Global Leader',
    hub: 'Padi / Sholinghur Corridor, Tamil Nadu',
    region: 'chennai-corridor',
    distanceKm: 44,
    transitTime: '55 mins',
    highway: 'NH 48 & Chennai Bypass Link',
    products: 'Fine blanked brake actuation levers, caliper plates & backing stampings',
    frequency: 'Dedicated JIT Line Supply',
    logo: '/images/clients/brakes-india-ivs-client.jpg',
    coords: [13.1040, 80.1720],
    curveDir: 1,
    curveBend: 0.32,
  },
  {
    id: 'caterpillar',
    name: 'Caterpillar India',
    tier: 'Heavy Construction & Mining Equipment OEM',
    hub: 'Thiruvallur Industrial Corridor',
    region: 'chennai-corridor',
    distanceKm: 58,
    transitTime: '1 hr 15 mins',
    highway: 'Chennai Outer Ring Road (ORR) 6-Lane Expressway',
    products: 'Heavy gauge mounting plates, excavator levers & hydraulic brackets',
    frequency: 'Bi-Weekly Heavy Freight Dispatch',
    logo: '/images/clients/Tel-turbo-energy-client.jpg',
    coords: [13.1380, 79.9120],
    curveDir: -1,
    curveBend: 0.24,
  },
  {
    id: 'mitsuba',
    name: 'Mitsuba Sical India',
    tier: 'Automotive Electrical & Wiper Motors',
    hub: 'Gummidipoondi SIPCOT Industrial Complex',
    region: 'chennai-corridor',
    distanceKm: 85,
    transitTime: '1 hr 40 mins',
    highway: 'NH 16 Chennai-Kolkata Highway',
    products: 'Precision fine blanked wiper linkage arms & motor housing plates',
    frequency: 'Weekly Scheduled Supply Route',
    logo: '/images/clients/ENKEI-client.jpg',
    coords: [13.4020, 80.1250],
    curveDir: 1,
    curveBend: 0.26,
  },
  {
    id: 'bosch',
    name: 'Bosch Automotive India',
    tier: 'Global Mobility Solutions Tier-1',
    hub: 'Adugodi / Bidadi, Bengaluru, Karnataka',
    region: 'regional-south',
    distanceKm: 320,
    transitTime: '5 hrs 30 mins',
    highway: 'NH 48 Bengaluru-Chennai Expressway',
    products: 'Fuel injection pump plates, sensor brackets & precision washers',
    frequency: 'Bi-Weekly Inter-State Express Logistics',
    logo: '/images/clients/zf-rane-client.jpg',
    coords: [12.9420, 77.6080],
    curveDir: -1,
    curveBend: 0.25,
  },
  {
    id: 'tvs-hosur',
    name: 'TVS Motor Company (Hosur)',
    tier: 'Two-Wheeler & Commercial OEM',
    hub: 'SIPCOT Industrial Complex, Hosur, Tamil Nadu',
    region: 'regional-south',
    distanceKm: 285,
    transitTime: '4 hrs 50 mins',
    highway: 'NH 48 Expressway Corridor',
    products: 'Motorcycle brake levers, clutch actuation pressings & sprocket plates',
    frequency: 'Tri-Weekly Inter-City Scheduled Shuttle',
    logo: '/images/clients/brakes-india-ivs-client.jpg',
    coords: [12.7350, 77.8280],
    curveDir: 1,
    curveBend: 0.22,
  },
  {
    id: 'tata-pune',
    name: 'Tata Motors & Tier-1 Hub',
    tier: 'Automotive OEM Passenger & EV Division',
    hub: 'Pimpri-Chinchwad / Chakan Auto Cluster, Pune, Maharashtra',
    region: 'national-hub',
    distanceKm: 1140,
    transitTime: '20 hrs',
    highway: 'AH 47 / NH 48 National Golden Quadrilateral',
    products: 'Fine blanked EV battery structural brackets & transmission components',
    frequency: 'Scheduled Multi-Axle Container Dispatch',
    logo: '/images/clients/Saurer-client.jpg',
    coords: [18.7250, 73.8350],
    curveDir: -1,
    curveBend: 0.26,
  },
  {
    id: 'maruti-ncr',
    name: 'Maruti Suzuki Tier-1 Hub',
    tier: 'Passenger Vehicle Tier-1 Network',
    hub: 'Manesar / IMT Gurgaon Automotive Belt, Haryana',
    region: 'national-hub',
    distanceKm: 2180,
    transitTime: '36 hrs',
    highway: 'NH 44 North-South Highway Corridor',
    products: 'High-precision seating recliner gears & sub-assembly stampings',
    frequency: 'Dedicated All-India Logistics Corridor',
    logo: '/images/clients/nash-industries-client.jpg',
    coords: [28.3580, 76.9320],
    curveDir: -1,
    curveBend: 0.20,
  },
]

export default function ClientRouteMap() {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  const [selectedClientId, setSelectedClientId] = useState('daimler')
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeViewMode, setActiveViewMode] = useState('chennai') // 'chennai' or 'india'
  const [isTouring, setIsTouring] = useState(false)
  const [animKey, setAnimKey] = useState(1)
  const [arcPaths, setArcPaths] = useState([])
  const tourTimerRef = useRef(null)

  const selectedClient = clientsData.find((c) => c.id === selectedClientId) || clientsData[0]

  // Filtered clients list
  const filteredClients = clientsData.filter((c) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'oragadam-sriperumbudur') return c.region === 'oragadam-sriperumbudur'
    if (activeFilter === 'chennai-corridor') return c.region === 'chennai-corridor'
    if (activeFilter === 'regional-national') return c.region === 'regional-south' || c.region === 'national-hub'
    return true
  })

  // Function to calculate SVG Bézier curves from GPS points to container pixel coordinates
  const calculateArcCurves = () => {
    const map = mapInstanceRef.current
    if (!map) return

    try {
      const originPt = map.latLngToContainerPoint(ATV_ORIGIN.coords)

      const paths = clientsData.map((client, index) => {
        const clientPt = map.latLngToContainerPoint(client.coords)
        const dx = clientPt.x - originPt.x
        const dy = clientPt.y - originPt.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist === 0) {
          return { id: client.id, d: '', originPt, clientPt, dist: 0, index }
        }

        // Normal perpendicular vector
        const nx = -dy / dist
        const ny = dx / dist

        // Calculate control point with client-specific curve direction and bend
        const bend = client.curveBend || 0.25
        const dir = client.curveDir || 1
        const cx = (originPt.x + clientPt.x) / 2 + nx * dist * bend * dir
        const cy = (originPt.y + clientPt.y) / 2 + ny * dist * bend * dir

        // Exact Quadratic Bézier Curve Path
        const d = `M ${originPt.x.toFixed(1)} ${originPt.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${clientPt.x.toFixed(1)} ${clientPt.y.toFixed(1)}`

        return {
          id: client.id,
          d,
          originPt,
          clientPt,
          dist,
          index,
        }
      })

      setArcPaths(paths)
    } catch {
      // Map may still be initialising
    }
  }

  // Initialize Leaflet Map with CartoDB Positron (clean slate-grey / white minimalist aesthetic)
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return

    // Center on Chennai automotive belt
    const map = L.map(mapContainerRef.current, {
      center: [12.9100, 80.0100],
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Esri World Light Gray Base (clean slate-grey land & clean ocean, zero watermark, 100% free)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16,
    }).addTo(map)

    // ATV Origin Pin (Maraimalai Nagar Hub)
    const originIcon = L.divIcon({
      className: 'atv-origin-node',
      html: `
        <div class="atv-hub-wrapper">
          <div class="atv-hub-radar-ring"></div>
          <div class="atv-hub-dot">
            <i class="fas fa-industry"></i>
          </div>
          <span class="atv-hub-label">ATV Origin Hub</span>
        </div>
      `,
      iconSize: [46, 46],
      iconAnchor: [23, 23],
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

    // Client Destination Markers (Amber / Golden Dots with Client Labels popping in)
    clientsData.forEach((c, idx) => {
      const clientIcon = L.divIcon({
        className: `client-destination-marker marker-${c.id}`,
        html: `
          <div class="client-destination-pin" id="dest-pin-${c.id}" style="animation-delay: ${idx * 60 + 600}ms">
            <div class="dest-gold-dot"></div>
            <div class="dest-gold-pulse"></div>
            <div class="dest-name-tag">
              <span class="dest-client-name">${c.name.split(' ')[0]}</span>
              <span class="dest-client-km">${c.distanceKm} km</span>
            </div>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [6, 18],
      })

      const marker = L.marker(c.coords, { icon: clientIcon }).addTo(map)
      marker.on('click', () => {
        setSelectedClientId(c.id)
      })

      markersRef.current[c.id] = marker
    })

    mapInstanceRef.current = map

    // Synchronize curved SVG paths with map movement & zoom
    map.on('move', calculateArcCurves)
    map.on('zoom', calculateArcCurves)
    map.on('viewreset', calculateArcCurves)
    map.on('resize', calculateArcCurves)

    // Initial calculation
    setTimeout(calculateArcCurves, 200)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Highlight active client pin & re-render curves on selection
  useEffect(() => {
    document.querySelectorAll('.client-destination-pin').forEach((el) => {
      el.classList.remove('active-destination')
    })
    const activePin = document.getElementById(`dest-pin-${selectedClientId}`)
    if (activePin) {
      activePin.classList.add('active-destination')
    }
  }, [selectedClientId])

  // Replay Radiating Arcs Animation (fans out curves from Maraimalai Nagar to all clients)
  const handleReplayArcs = () => {
    setAnimKey((prev) => prev + 1)
    setTimeout(calculateArcCurves, 50)
  }

  // View Presets: Chennai Cluster vs All-India
  const handleSetView = (mode) => {
    const map = mapInstanceRef.current
    if (!map) return

    setActiveViewMode(mode)
    if (mode === 'chennai') {
      // Frame Chennai Automotive Cluster (11 Hubs: Oragadam, Sriperumbudur, Padi, Thiruvallur, Gummidipoondi)
      const chennaiClients = clientsData.filter((c) => c.region === 'chennai-corridor' || c.region === 'oragadam-sriperumbudur')
      const coords = [ATV_ORIGIN.coords, ...chennaiClients.map((c) => c.coords)]
      map.flyToBounds(L.latLngBounds(coords), {
        padding: [60, 60],
        maxZoom: 11,
        duration: 1.2,
      })
    } else {
      // Frame All-India (including Hosur, Bengaluru, Pune, Maruti Suzuki Gurgaon)
      const allCoords = [ATV_ORIGIN.coords, ...clientsData.map((c) => c.coords)]
      map.flyToBounds(L.latLngBounds(allCoords), {
        padding: [60, 60],
        duration: 1.5,
      })
    }
  }

  // Select Client & Pan smoothly to corridor
  const handleSelectClient = (clientId) => {
    setSelectedClientId(clientId)
    const map = mapInstanceRef.current
    const client = clientsData.find((c) => c.id === clientId)
    if (!map || !client) return

    const bounds = L.latLngBounds([ATV_ORIGIN.coords, client.coords])
    map.flyToBounds(bounds, {
      padding: [80, 80],
      maxZoom: 12,
      duration: 1.1,
    })
  }

  // Auto-tour Handler
  const toggleTour = () => {
    if (isTouring) {
      clearInterval(tourTimerRef.current)
      setIsTouring(false)
    } else {
      setIsTouring(true)
      let idx = clientsData.findIndex((c) => c.id === selectedClientId)
      tourTimerRef.current = setInterval(() => {
        idx = (idx + 1) % clientsData.length
        handleSelectClient(clientsData[idx].id)
      }, 4000)
    }
  }

  useEffect(() => {
    return () => clearInterval(tourTimerRef.current)
  }, [])

  const handleNextClient = () => {
    const currIdx = clientsData.findIndex((c) => c.id === selectedClientId)
    const nextIdx = (currIdx + 1) % clientsData.length
    handleSelectClient(clientsData[nextIdx].id)
  }

  const handlePrevClient = () => {
    const currIdx = clientsData.findIndex((c) => c.id === selectedClientId)
    const prevIdx = (currIdx - 1 + clientsData.length) % clientsData.length
    handleSelectClient(clientsData[prevIdx].id)
  }

  return (
    <section className="section client-routes-section" id="client-routes">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 35 }}>
          <span className="section-label" data-aos="fade-up">Logistics & Supply Reach</span>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Our Clients <span>& Delivery Corridors</span>
          </h2>
          <div className="section-divider" style={{ margin: '0 auto 18px' }} data-aos="fade-up" data-aos-delay="150"></div>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 880 }} data-aos="fade-up" data-aos-delay="200">
            Dynamic delivery arcs radiating from our <strong>Maraimalai Nagar Manufacturing Plant</strong> to top automotive OEMs
            and Tier-1 assembly hubs across the Chennai automotive corridor, Tamil Nadu, and India.
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
            <i className="fas fa-network-wired" style={{ color: '#E53935' }}></i>
            <div>
              <strong>15 Automotive Hubs</strong>
              <span>Radiating Direct Arc Supply</span>
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

        {/* Interactive Map Toolbar with View Modes & Arc Replay */}
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

          {/* Action Buttons: Arc Replay & View Switcher */}
          <div className="map-actions">
            <button
              type="button"
              className="btn btn-sm btn-replay-arc"
              onClick={handleReplayArcs}
              title="Watch all curved arcs radiate outward from Maraimalai Nagar"
            >
              <i className="fas fa-redo"></i> Replay Arc Flow
            </button>

            <button
              type="button"
              className={`btn btn-sm ${activeViewMode === 'chennai' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSetView('chennai')}
              title="Zoom to Chennai Automotive Cluster"
            >
              <i className="fas fa-crosshairs"></i> Chennai Belt
            </button>

            <button
              type="button"
              className={`btn btn-sm ${activeViewMode === 'india' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleSetView('india')}
              title="Zoom out to show All-India network"
            >
              <i className="fas fa-globe-asia"></i> Pan-India View
            </button>

            <button
              type="button"
              className={`btn btn-sm ${isTouring ? 'btn-primary' : 'btn-outline'}`}
              onClick={toggleTour}
              style={{ fontSize: 13 }}
            >
              <i className={`fas ${isTouring ? 'fa-pause' : 'fa-play'}`}></i>
              {isTouring ? 'Pause Tour' : 'Auto-Tour'}
            </button>
          </div>
        </div>

        {/* =========================================================
            MAIN ANIMATED ARC MAP (Exact Radiating Curves like Brakes India)
           ========================================================= */}
        <div className="client-map-wrapper animated-arc-map-wrapper" data-aos="fade-up" data-aos-delay="300">
          {/* Leaflet DOM container */}
          <div className="client-map-canvas" ref={mapContainerRef}></div>

          {/* SVG Overlay for Radiating Curved Bézier Arcs */}
          <svg className="radiating-arcs-svg-layer" key={animKey}>
            <defs>
              {/* Gradient for Arc stroke */}
              <linearGradient id="arcGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E53935" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#FF3B30" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
              </linearGradient>

              {/* Gradient for active selected corridor */}
              <linearGradient id="activeArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B91C1C" stopOpacity="1" />
                <stop offset="50%" stopColor="#E53935" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF3B30" stopOpacity="1" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="arcGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render all animated curved arcs */}
            {arcPaths.map((arc) => {
              if (!arc.d) return null
              const isSelected = arc.id === selectedClientId
              const isFilteredOut = activeFilter !== 'all' && !filteredClients.some((c) => c.id === arc.id)

              if (isFilteredOut) return null

              return (
                <g key={arc.id} className={`arc-group ${isSelected ? 'selected-arc-group' : ''}`}>
                  {/* Base Track Line */}
                  <path
                    d={arc.d}
                    className="arc-base-track"
                    onClick={() => handleSelectClient(arc.id)}
                  />

                  {/* Radiating Curved Animated Arc Line (Shoots outward from Maraimalai Nagar) */}
                  <path
                    d={arc.d}
                    className={`radiating-curve-arc ${isSelected ? 'active-radiating-arc' : ''}`}
                    style={{
                      animationDelay: `${arc.index * 65}ms`,
                    }}
                    onClick={() => handleSelectClient(arc.id)}
                  />

                  {/* Flowing Energy Particle along Arc */}
                  <path
                    d={arc.d}
                    className="flowing-energy-pulse"
                    style={{
                      animationDelay: `${arc.index * 65 + 300}ms`,
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Active Route Intelligence Floating Card */}
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
                  <strong className="metric-val" style={{ color: '#E53935' }}>
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
                  <span className="route-detail-label">Supplied Parts:</span>
                  <span className="route-detail-val" style={{ color: '#1E293B', fontWeight: 600 }}>
                    {selectedClient.products}
                  </span>
                </div>
                <div className="route-detail-row">
                  <span className="route-detail-label">Dispatch Mode:</span>
                  <span className="route-detail-val">{selectedClient.frequency}</span>
                </div>
              </div>

              {/* Action Button */}
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

          {/* Map Footer Legend Strip */}
          <div className="arc-map-legend-bar">
            <div className="legend-items-group">
              <span className="legend-chip">
                <span className="legend-symbol origin"></span> Maraimalai Nagar Manufacturing HQ
              </span>
              <span className="legend-chip">
                <span className="legend-symbol arc"></span> Radiating JIT Delivery Arcs
              </span>
              <span className="legend-chip">
                <span className="legend-symbol dest"></span> OEM &amp; Tier-1 Assembly Plants
              </span>
            </div>
            <div className="legend-hint">
              <i className="fas fa-mouse-pointer"></i>
              <span>Click any curved arc or client pin to inspect delivery corridor</span>
            </div>
          </div>
        </div>

        {/* Client Selection Cards Strip Below Map */}
        <div className="clients-selector-strip" data-aos="fade-up" data-aos-delay="350">
          <div className="selector-instruction">
            <i className="fas fa-hand-pointer"></i>
            <span>Select any client below to inspect their direct delivery corridor from ATV:</span>
          </div>

          <div className="clients-horizontal-cards">
            {filteredClients.map((c) => {
              const isSelected = c.id === selectedClientId
              return (
                <div
                  key={c.id}
                  className={`client-selector-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectClient(c.id)}
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
