'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useRef, useCallback } from 'react'
import '../app/navigation.css'

type Floor = 'L1' | 'L2'

const NAV_ITEMS = [
  { id: 'home',       icon: 'home',          label: 'Home',       route: '/' },
  { id: 'flights',    icon: 'flight',        label: 'Flight Info', route: '/flights' },
  { id: 'wayfinding', icon: 'map',           label: 'Find Way',   route: '/wayfinding', active: true },
  { id: 'support',    icon: 'headset_mic',   label: 'Talk to Us', route: '/support' },
  { id: 'feedback',   icon: 'rate_review',   label: 'Feedback',   route: '/feedback' },
]

const STEPS = [
  {
    icon: 'straight',
    color: 'color-blue',
    title: 'Head toward Central Concourse',
    sub: 'Follow blue floor line · past Duty Free',
    dist: '80 m',
    active: true,
  },
  {
    icon: 'elevator',
    color: 'color-purple',
    title: 'Take Elevator to Level 2',
    sub: 'Near Café Aero · beside Check-in 48',
    dist: 'L1 → L2',
    active: false,
  },
  {
    icon: 'turn_right',
    color: 'color-orange',
    title: 'Turn right toward Gates B',
    sub: 'Security checkpoint B on your left',
    dist: '120 m',
    active: false,
  },
  {
    icon: 'flag',
    color: 'color-green',
    title: 'Arrive at Gate B12',
    sub: 'Boarding area · seating · restrooms',
    dist: '5 min',
    active: false,
  },
]

/* ── Terminal map SVG — Level 1 ───────────────────────────────── */
function TerminalL1() {
  return (
    <g>
      {/* Main hall corridor */}
      <rect x="60" y="60" width="560" height="140" rx="8" className="map-room main-hall" />
      <text x="340" y="130" className="map-label zone-label">MAIN DEPARTURES HALL</text>

      {/* Check-in counters row */}
      <rect x="80"  y="80"  width="70" height="50" rx="4" className="map-room checkin" />
      <text x="115" y="109" className="map-label">Check-in</text>
      <text x="115" y="119" className="map-label">1–20</text>

      <rect x="165" y="80" width="70" height="50" rx="4" className="map-room checkin" />
      <text x="200" y="109" className="map-label">Check-in</text>
      <text x="200" y="119" className="map-label">21–36</text>

      <rect x="250" y="80" width="70" height="50" rx="4" className="map-room checkin" />
      <text x="285" y="109" className="map-label">Check-in</text>
      <text x="285" y="119" className="map-label">37–52</text>

      <rect x="335" y="80" width="70" height="50" rx="4" className="map-room checkin" />
      <text x="370" y="109" className="map-label">Check-in</text>
      <text x="370" y="119" className="map-label">53–68</text>

      {/* Security zone */}
      <rect x="80" y="155" width="280" height="40" rx="4" className="map-room security" />
      <text x="220" y="177" className="map-label">SECURITY CHECKPOINT A</text>

      {/* Amenities */}
      <rect x="430" y="80"  width="60" height="44" rx="4" className="map-room amenity" />
      <text x="460" y="105" className="map-label">Café</text>
      <text x="460" y="115" className="map-label">Aero</text>

      <rect x="500" y="80"  width="55" height="44" rx="4" className="map-room amenity" />
      <text x="527" y="105" className="map-label">Duty</text>
      <text x="527" y="115" className="map-label">Free</text>

      <rect x="430" y="150" width="55" height="44" rx="4" className="map-room amenity" />
      <text x="457" y="175" className="map-label">WC</text>

      <rect x="495" y="150" width="60" height="44" rx="4" className="map-room amenity" />
      <text x="525" y="175" className="map-label">Lift / EV</text>

      {/* Central concourse corridor (vertical) */}
      <rect x="220" y="200" width="240" height="200" rx="8" className="map-corridor" />
      <text x="340" y="300" className="map-label zone-label">CENTRAL CONCOURSE</text>

      {/* Corridor to gates */}
      <rect x="220" y="395" width="240" height="60" rx="4" className="map-corridor" />

      {/* Gate pods */}
      <rect x="80"  y="230" width="60" height="130" rx="8" className="map-room gate" />
      <text x="110" y="298" className="map-label gate-label">A1–A6</text>

      <rect x="540" y="230" width="60" height="130" rx="8" className="map-room gate" />
      <text x="570" y="298" className="map-label gate-label">A7–A12</text>

      {/* You-are-here marker location indicator */}
      <rect x="230" y="210" width="80" height="30" rx="6" style={{ fill: '#eff6ff', stroke: '#93c5fd', strokeWidth: 1 }} />
      <text x="270" y="229" className="map-label" style={{ fontSize: 8, fill: '#1e40af' }}>YOU ARE HERE</text>

      {/* Route glow + route */}
      <path
        className="map-nav-route-bg"
        d="M280 225 L280 290 L340 290 L340 380 L340 420 L400 420 L460 420"
      />
      <path
        className="map-nav-route"
        d="M280 225 L280 290 L340 290 L340 380 L340 420 L400 420 L460 420"
      />
    </g>
  )
}

/* ── Terminal map SVG — Level 2 ───────────────────────────────── */
function TerminalL2() {
  return (
    <g>
      {/* Boarding zone */}
      <rect x="60" y="60" width="560" height="80" rx="8" className="map-room main-hall" />
      <text x="340" y="102" className="map-label zone-label">BOARDING ZONE — LEVEL 2</text>

      {/* Gates B row */}
      {[
        { x: 80,  label: 'B1',  active: false },
        { x: 155, label: 'B4',  active: false },
        { x: 230, label: 'B8',  active: false },
        { x: 305, label: 'B12', active: true  },
        { x: 380, label: 'B16', active: false },
        { x: 455, label: 'B20', active: false },
        { x: 530, label: 'B24', active: false },
      ].map((g) => (
        <g key={g.label}>
          <rect x={g.x} y="160" width="65" height="80" rx="6"
            className={`map-room gate${g.active ? ' active-gate' : ''}`} />
          <text x={g.x + 32} y="205" className="map-label gate-label"
            style={g.active ? { fontWeight: 700, fill: '#1d4ed8', fontSize: 11 } : {}}>
            {g.label}
          </text>
          {g.active && (
            <text x={g.x + 32} y="218" className="map-label" style={{ fontSize: 7, fill: '#1d4ed8' }}>
              YOUR GATE
            </text>
          )}
        </g>
      ))}

      {/* Corridor */}
      <rect x="60" y="245" width="560" height="50" rx="4" className="map-corridor" />

      {/* Amenities */}
      <rect x="80"  y="310" width="70" height="50" rx="4" className="map-room amenity" />
      <text x="115" y="338" className="map-label">Lounge</text>

      <rect x="170" y="310" width="70" height="50" rx="4" className="map-room amenity" />
      <text x="205" y="338" className="map-label">WC</text>

      <rect x="250" y="310" width="80" height="50" rx="4" className="map-room amenity" />
      <text x="290" y="338" className="map-label">Café</text>

      <rect x="345" y="310" width="70" height="50" rx="4" className="map-room amenity" />
      <text x="380" y="338" className="map-label">Shop</text>

      <rect x="430" y="310" width="70" height="50" rx="4" className="map-room amenity" />
      <text x="465" y="338" className="map-label">Pharmacy</text>

      {/* Route */}
      <path className="map-nav-route-bg" d="M150 390 L150 270 L336 270 L336 240" />
      <path className="map-nav-route"    d="M150 390 L150 270 L336 270 L336 240" />

      {/* Destination pin */}
      <g className="map-pin-group">
        <circle cx="336" cy="200" r="14" fill="#16a34a" className="map-pin-circle" />
        <text x="336" y="205" textAnchor="middle"
          style={{ fontSize: 14, fill: '#fff', fontFamily: 'Material Symbols Outlined', fontWeight: 400, dominantBaseline: 'central' }}>
          flag
        </text>
      </g>
    </g>
  )
}

export function NavigationMap() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') ?? 'elevator'

  const [floor, setFloor]   = useState<Floor>('L1')
  const [zoom, setZoom]     = useState(1)
  const [navigating, setNavigating] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)

  const handleZoomIn  = useCallback(() => setZoom(z => Math.min(z + 0.25, 2.5)), [])
  const handleZoomOut = useCallback(() => setZoom(z => Math.max(z - 0.25, 0.6)), [])

  const handleStart = () => {
    setNavigating(true)
    setTimeout(() => router.push('/'), 1600)
  }

  return (
    <div className="nav-screen">
      {/* ── Top bar ── */}
      <header className="nav-bar" role="banner">
        <button
          type="button"
          className="nav-bar-back"
          aria-label="Back to wayfinding"
          onClick={() => router.push('/wayfinding')}
        >
          <md-icon>arrow_back</md-icon>
        </button>

        <div className="nav-bar-titles">
          <h1 className="nav-bar-title">Navigation Map</h1>
          <p className="nav-bar-subtitle">
            {floor === 'L1' ? 'Level 1 · Departures' : 'Level 2 · Gates B'}&nbsp;·&nbsp;
            {mode === 'elevator' ? 'Elevator route' : 'Escalator route'}
          </p>
        </div>

        <div className="nav-bar-eta" aria-label="Estimated travel time">
          <span className="nav-bar-eta-time">5 min</span>
          <span className="nav-bar-eta-dist">~350 m</span>
        </div>
      </header>

      {/* ── Map viewport ── */}
      <main className="nav-map-wrap" aria-label="Interactive terminal map">
        {/* Grid overlay */}
        <div className="nav-map-grid" aria-hidden="true" />

        {/* Stage — zoom applied here */}
        <div
          ref={stageRef}
          className="nav-map-stage"
          style={{ transform: `scale(${zoom})`, transformOrigin: '50% 45%', transition: 'transform 250ms cubic-bezier(0.2,0,0,1)' }}
        >
          <svg
            className="nav-map-svg"
            viewBox="0 0 680 480"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            role="img"
            aria-label="Terminal map diagram"
          >
            {floor === 'L1' ? <TerminalL1 /> : <TerminalL2 />}

            {/* You-are-here pin */}
            <g className="map-pin-group" aria-label="Your current location">
              <circle cx="280" cy="225" r="20" fill="rgba(37,99,235,0.12)" className="map-pulse-ring" />
              <circle cx="280" cy="225" r="13" fill="#2563eb" className="map-pin-circle" />
              <text x="280" y="230" textAnchor="middle"
                style={{ fontSize: 13, fill: '#fff', fontFamily: 'Material Symbols Outlined', fontWeight: 400, dominantBaseline: 'central' }}>
                my_location
              </text>
            </g>
          </svg>
        </div>

        {/* ── Floating route summary card ── */}
        <div className="nav-route-card" role="region" aria-label="Route summary">
          <div className="nav-route-icon origin" aria-hidden="true">
            <md-icon>my_location</md-icon>
          </div>
          <div className="nav-route-divider" aria-hidden="true">
            <span className="nav-route-dot" />
            <span className="nav-route-dot" />
            <span className="nav-route-dot" />
          </div>
          <div className="nav-route-icon dest" aria-hidden="true">
            <md-icon>flag</md-icon>
          </div>

          <div className="nav-route-info">
            <span className="nav-route-label">Destination</span>
            <span className="nav-route-value">Gate B12 · Terminal 2</span>
          </div>

          <div className="nav-route-badge" aria-label="5 minutes walking time">
            <md-icon>directions_walk</md-icon>
            5 min
          </div>
        </div>

        {/* ── Zoom + floor controls ── */}
        <div className="nav-controls" role="group" aria-label="Map controls">
          {/* Zoom */}
          <div className="nav-ctrl-group">
            <button
              type="button"
              className="nav-ctrl-btn"
              aria-label="Zoom in"
              onClick={handleZoomIn}
              disabled={zoom >= 2.5}
            >
              <md-icon>add</md-icon>
            </button>
            <button
              type="button"
              className="nav-ctrl-btn"
              aria-label="Zoom out"
              onClick={handleZoomOut}
              disabled={zoom <= 0.6}
            >
              <md-icon>remove</md-icon>
            </button>
          </div>

          {/* Floor selector */}
          <div className="nav-ctrl-group" role="radiogroup" aria-label="Select floor">
            {(['L1', 'L2'] as Floor[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`nav-ctrl-floor-btn${floor === f ? ' active' : ''}`}
                aria-label={`Floor ${f}`}
                aria-pressed={floor === f}
                onClick={() => setFloor(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Compass / reset */}
          <div className="nav-ctrl-group">
            <button
              type="button"
              className="nav-ctrl-btn"
              aria-label="Reset map view"
              onClick={() => { setZoom(1) }}
            >
              <md-icon>explore</md-icon>
            </button>
          </div>
        </div>

        {/* ── My location button ── */}
        <button
          type="button"
          className="nav-locate-btn"
          aria-label="Center map on my location"
          onClick={() => setZoom(1)}
        >
          <md-icon>gps_fixed</md-icon>
        </button>
      </main>

      {/* ── Bottom sheet ── */}
      <div className="nav-sheet" role="region" aria-label="Turn-by-turn directions">
        <div className="nav-sheet-handle" aria-hidden="true">
          <div className="nav-sheet-handle-bar" />
        </div>

        <div className="nav-sheet-inner">
          <div className="nav-sheet-steps" role="list">
            {STEPS.map((step) => (
              <div key={step.title} className="nav-sheet-step" role="listitem">
                <div className={`nav-sheet-step-icon ${step.color}`} aria-hidden="true">
                  <md-icon>{step.icon}</md-icon>
                </div>
                <div className="nav-sheet-step-text">
                  <span className="nav-sheet-step-title">{step.title}</span>
                  <span className="nav-sheet-step-sub">{step.sub}</span>
                </div>
                <div className="nav-sheet-step-meta">
                  <span className="nav-sheet-step-dist">{step.dist}</span>
                  {step.active && <span className="nav-sheet-step-active-dot" aria-label="Current step" />}
                </div>
              </div>
            ))}
          </div>

          <div className="nav-sheet-cta">
            <button
              type="button"
              className="nav-start-btn"
              aria-label="Start turn-by-turn navigation"
              onClick={handleStart}
              disabled={navigating}
            >
              <md-icon>{navigating ? 'check_circle' : 'navigation'}</md-icon>
              {navigating ? 'Navigation started!' : 'Start Navigation'}
            </button>
            <button
              type="button"
              className="nav-share-btn"
              aria-label="Share route"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({ title: 'Gate B12 Route', text: 'Navigate to Gate B12 · ~5 min walk' }).catch(() => {})
                }
              }}
            >
              <md-icon>share</md-icon>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      <nav className="nav-bottom-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-bottom-nav-item${item.active ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.active ? 'page' : undefined}
            onClick={() => router.push(item.route)}
          >
            <span className="nav-bottom-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="nav-bottom-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
