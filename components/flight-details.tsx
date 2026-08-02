'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import '../app/flight-details.css'

type NavItem = { id: string; icon: string; label: string; route?: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'flights', icon: 'flight', label: 'Flight Info', route: '/flights' },
  { id: 'wayfinding', icon: 'map', label: 'Find Way', route: '/wayfinding' },
  { id: 'support', icon: 'headset_mic', label: 'Talk to Us', route: '/support' },
  { id: 'feedback', icon: 'rate_review', label: 'Feedback', route: '/feedback' },
  { id: 'search', icon: 'search', label: 'Search' },
]

const INFO_ROWS = [
  { icon: 'confirmation_number', label: 'Flight',          value: '6E 203',        full: false },
  { icon: 'flight_land',         label: 'Destination',     value: 'Chennai',       full: false },
  { icon: 'schedule',            label: 'Departure Time',  value: '10:45 AM',      full: false },
  { icon: 'domain',              label: 'Terminal',        value: 'T2',            full: false },
  { icon: 'door_front',          label: 'Gate',            value: '24',            full: false },
  { icon: 'how_to_reg',          label: 'Boarding Time',   value: '10:15 AM',      full: false },
  { icon: 'countertops',         label: 'Check-in Counter',value: '45 – 52',       full: false },
  { icon: 'luggage',             label: 'Status',          value: 'status',        full: false },
  { icon: 'directions_run',      label: 'Boarding Status', value: 'ontime',        full: false },
]

export function FlightDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const flight = searchParams.get('flight') ?? '6E203'

  return (
    <div className="fd">
      {/* Top App Bar */}
      <header className="fd-bar" role="banner">
        <button
          type="button"
          className="fd-bar-back"
          aria-label="Back to flight search"
          onClick={() => router.push('/flights')}
        >
          <md-icon>arrow_back</md-icon>
        </button>

        <div className="fd-bar-titles">
          <h1 className="fd-bar-title">Flight Details</h1>
          <p className="fd-bar-subtitle">Your flight information</p>
        </div>

        <button
          type="button"
          className="fd-bar-lang"
          aria-label="Change language"
        >
          <md-icon>language</md-icon>
          EN
          <md-icon>expand_more</md-icon>
        </button>
      </header>

      {/* Body */}
      <main className="fd-body">

        {/* ── Airline header card ── */}
        <div className="fd-airline-card" aria-label="Airline information">
          <div className="fd-airline-left">
            <div className="fd-airline-logo" aria-hidden="true">
              <span className="fd-airline-logo-text">6E</span>
            </div>
            <div>
              <p className="fd-airline-name">IndiGo</p>
              <span className="fd-airline-tag">
                <md-icon>flight_takeoff</md-icon>
                Domestic
              </span>
            </div>
          </div>

          <div className="fd-flight-number-badge">
            <span className="fd-flight-number-label">Flight No.</span>
            <span className="fd-flight-number-value">{flight.replace(/([A-Z]{1,2})(\d)/, '$1 $2')}</span>
          </div>
        </div>

        {/* ── Flight information grid ── */}
        <div className="fd-info-card" aria-label="Flight details">
          <h2 className="fd-info-card-title">
            <md-icon>info</md-icon>
            Flight Information
          </h2>

          <dl className="fd-info-grid">
            {INFO_ROWS.map((row) => {
              if (row.value === 'status') {
                return (
                  <div key={row.label} className="fd-info-row">
                    <div className="fd-info-icon" aria-hidden="true">
                      <md-icon>{row.icon}</md-icon>
                    </div>
                    <div className="fd-info-text">
                      <dt className="fd-info-label">{row.label}</dt>
                      <dd className="fd-info-value" style={{ margin: 0 }}>
                        <span className="fd-status-badge success">
                          <md-icon>check_circle</md-icon>
                          Checked In
                        </span>
                      </dd>
                    </div>
                  </div>
                )
              }
              if (row.value === 'ontime') {
                return (
                  <div key={row.label} className="fd-info-row">
                    <div className="fd-info-icon" aria-hidden="true">
                      <md-icon>{row.icon}</md-icon>
                    </div>
                    <div className="fd-info-text">
                      <dt className="fd-info-label">{row.label}</dt>
                      <dd className="fd-info-value" style={{ margin: 0 }}>
                        <span className="fd-status-badge ontime">
                          <md-icon>schedule</md-icon>
                          On Time
                        </span>
                      </dd>
                    </div>
                  </div>
                )
              }
              return (
                <div key={row.label} className={`fd-info-row${row.full ? ' fd-full' : ''}`}>
                  <div className="fd-info-icon" aria-hidden="true">
                    <md-icon>{row.icon}</md-icon>
                  </div>
                  <div className="fd-info-text">
                    <dt className="fd-info-label">{row.label}</dt>
                    <dd className="fd-info-value" style={{ margin: 0 }}>{row.value}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </div>

        {/* ── Notice card ── */}
        <div className="fd-notice-card" role="note" aria-label="Gate notice">
          <div className="fd-notice-icon" aria-hidden="true">
            <md-icon>info</md-icon>
          </div>
          <div className="fd-notice-text">
            <p className="fd-notice-title">Gate Information</p>
            <p className="fd-notice-body">
              Your boarding gate is one floor below. Please use the elevator or escalator near Check-in Counter 48.
            </p>
          </div>
        </div>

        {/* ── Primary CTA ── */}
        <div className="fd-cta-section">
          <button
            type="button"
            className="fd-cta-btn"
            aria-label="Get directions to gate"
            onClick={() => router.push('/navigation?mode=elevator')}
          >
            <md-icon>near_me</md-icon>
            Get Directions
          </button>

          {/* Secondary actions */}
          <div className="fd-secondary-actions">
            <button
              type="button"
              className="fd-secondary-btn"
              aria-label="View flight updates"
              onClick={() => router.push('/flights/updates')}
            >
              <md-icon>notifications</md-icon>
              Flight Updates
            </button>
            <button
              type="button"
              className="fd-secondary-btn"
              aria-label="Share flight details"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({
                    title: `Flight ${flight}`,
                    text: `IndiGo ${flight} · Departure 10:45 AM · Gate 24 Terminal T2`,
                  }).catch(() => {})
                }
              }}
            >
              <md-icon>share</md-icon>
              Share Flight
            </button>
          </div>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fd-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fd-nav-item${item.id === 'flights' ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'flights' ? 'page' : undefined}
            onClick={() => {
              if (item.route) router.push(item.route)
            }}
          >
            <span className="fd-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="fd-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
