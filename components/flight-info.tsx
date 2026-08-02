'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../app/flights.css'

const POPULAR_FLIGHTS = ['AI101', '6E203', 'SG812', 'AI244', 'UK899']

type Tab = 'search' | 'scan'

type NavItem = { id: string; icon: string; label: string; route?: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'flights', icon: 'flight', label: 'Flight Info' },
  { id: 'wayfinding', icon: 'map', label: 'Find Way', route: '/wayfinding' },
  { id: 'support', icon: 'headset_mic', label: 'Talk to Us', route: '/support' },
  { id: 'feedback', icon: 'rate_review', label: 'Feedback', route: '/feedback' },
  { id: 'search', icon: 'search', label: 'Search' },
]

export function FlightInfo() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('search')
  const [query, setQuery] = useState('')
  const [selectedChip, setSelectedChip] = useState<string | null>(null)

  function handleChipClick(flight: string) {
    setQuery(flight)
    setSelectedChip(flight)
  }

  function handleSearch() {
    const value = query.trim().toUpperCase()
    if (!value) return
    router.push(`/flights/details?flight=${encodeURIComponent(value)}`)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    setSelectedChip(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSearch()
    }
  }

  return (
    <div className="flights">
      {/* Top App Bar */}
      <header className="flights-bar" role="banner">
        <button
          type="button"
          className="flights-bar-back"
          aria-label="Back to home"
          onClick={() => router.push('/')}
        >
          <md-icon>arrow_back</md-icon>
        </button>

        <h1 className="flights-bar-title md-typescale-title-large">
          Flight Information
        </h1>

        <button
          type="button"
          className="flights-bar-lang md-typescale-label-large"
          aria-label="Change language"
        >
          <md-icon>language</md-icon>
          EN
          <md-icon>expand_more</md-icon>
        </button>
      </header>

      {/* Tabs */}
      <div className="flights-tabs" role="tablist" aria-label="Flight information mode">
        <button
          role="tab"
          type="button"
          id="tab-search"
          aria-controls="panel-search"
          aria-selected={activeTab === 'search'}
          className={`flights-tab md-typescale-title-small${activeTab === 'search' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <md-icon>search</md-icon>
          Search by Flight Number
        </button>
        <button
          role="tab"
          type="button"
          id="tab-scan"
          aria-controls="panel-scan"
          aria-selected={activeTab === 'scan'}
          className={`flights-tab md-typescale-title-small${activeTab === 'scan' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('scan')}
        >
          <md-icon>qr_code_scanner</md-icon>
          Scan Boarding Pass
        </button>
      </div>

      {/* Body */}
      <main className="flights-body">

        {/* ── Search tab ── */}
        {activeTab === 'search' && (
          <div
            id="panel-search"
            role="tabpanel"
            aria-labelledby="tab-search"
          >
            {/* Hero */}
            <div className="flights-hero">
              <div className="flights-hero-icon" aria-hidden="true">
                <md-icon>flight_takeoff</md-icon>
              </div>
              <h2 className="md-typescale-headline-small flights-hero h1">
                Flight Information
              </h2>
              <p className="md-typescale-body-large">
                Find your flight details quickly
              </p>
            </div>

            {/* Search card */}
            <div className="flights-search-card">
              <span className="flights-search-label md-typescale-title-medium">
                Enter Flight Number
              </span>

              <div className="flights-search-row">
                {/* Custom accessible search field */}
                <label
                  htmlFor="flight-search-input"
                  className={`flights-search-field${query ? ' has-value' : ''}`}
                  style={{ cursor: 'text' }}
                >
                  <md-icon aria-hidden="true">search</md-icon>
                  <input
                    id="flight-search-input"
                    type="text"
                    className="flights-search-input"
                    placeholder="e.g. AI101 or 6E203"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="characters"
                    aria-label="Flight number"
                    aria-describedby="flight-hint"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear flight number"
                      onClick={() => { setQuery(''); setSelectedChip(null) }}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        display: 'grid',
                        placeItems: 'center',
                        padding: 4,
                        borderRadius: '50%',
                      }}
                    >
                      <md-icon style={{ fontSize: 20, width: 20, height: 20 }}>close</md-icon>
                    </button>
                  )}
                </label>

                {/* Search button */}
                <button
                  type="button"
                  className="flights-search-btn"
                  aria-label="Search flight"
                  onClick={handleSearch}
                  disabled={!query.trim()}
                  style={{ opacity: query.trim() ? 1 : 0.45 }}
                >
                  <md-icon>search</md-icon>
                </button>
              </div>

              <p
                id="flight-hint"
                className="flights-search-hint md-typescale-body-small"
              >
                <md-icon aria-hidden="true">info</md-icon>
                Example: AI101 or 6E203
              </p>
            </div>

            {/* Popular flights */}
            <div className="flights-popular">
              <div className="flights-popular-header">
                <md-icon aria-hidden="true">trending_up</md-icon>
                <h3 className="flights-popular-title md-typescale-title-medium">
                  Popular Flights
                </h3>
              </div>
              <div className="flights-chips" role="group" aria-label="Popular flight numbers">
                {POPULAR_FLIGHTS.map((flight) => (
                  <button
                    key={flight}
                    type="button"
                    className={`flights-chip md-typescale-label-large${selectedChip === flight ? ' is-selected' : ''}`}
                    aria-pressed={selectedChip === flight}
                    onClick={() => handleChipClick(flight)}
                  >
                    <md-icon aria-hidden="true">
                      {selectedChip === flight ? 'check' : 'flight'}
                    </md-icon>
                    {flight}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse departures */}
            <div className="flights-browse-card" role="complementary" aria-label="Browse departures">
              <div className="flights-browse-icon" aria-hidden="true">
                <md-icon>departure_board</md-icon>
              </div>
              <div className="flights-browse-text">
                <strong className="md-typescale-title-small">
                  {"Can't remember your flight?"}
                </strong>
                <span className="md-typescale-body-medium">
                  View all scheduled departures from this terminal.
                </span>
              </div>
              <md-outlined-button
                onClick={() => router.push('/flights/departures')}
                aria-label="Browse all departures"
              >
                <md-icon slot="icon">list</md-icon>
                Browse Departures
              </md-outlined-button>
            </div>
          </div>
        )}

        {/* ── Scan tab ── */}
        {activeTab === 'scan' && (
          <div
            id="panel-scan"
            role="tabpanel"
            aria-labelledby="tab-scan"
            className="flights-scanner"
          >
            <div
              className="flights-scanner-chip md-typescale-label-medium"
              role="status"
              aria-live="polite"
            >
              <md-icon aria-hidden="true">info</md-icon>
              Position your boarding pass below the scanner
            </div>

            <div className="flights-scanner-frame" aria-hidden="true">
              <div className="flights-scanner-inner">
                <md-icon>qr_code_2</md-icon>
              </div>
              <div className="flights-scanner-line" />
            </div>

            <h2 className="flights-scanner-title md-typescale-headline-small">
              Scan Your Boarding Pass
            </h2>
            <p className="flights-scanner-desc md-typescale-body-large">
              Hold your boarding pass or QR code in front of the camera. The scanner will read it automatically.
            </p>

            <md-filled-tonal-button
              onClick={() => setActiveTab('search')}
              aria-label="Enter flight number manually instead"
            >
              <md-icon slot="icon">keyboard</md-icon>
              Enter Manually Instead
            </md-filled-tonal-button>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="flights-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`flights-nav-item${item.id === 'flights' ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'flights' ? 'page' : undefined}
            onClick={() => {
              if (item.route) router.push(item.route)
              else if (item.id === 'home') router.push('/')
            }}
          >
            <span className="flights-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="flights-nav-label md-typescale-label-small">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
