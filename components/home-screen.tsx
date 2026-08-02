'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
    update()
    const id = setInterval(update, 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}

type NavItem = { id: string; icon: string; label: string; active?: boolean }

const NAV_ITEMS: NavItem[] = [
  { id: 'home',      icon: 'home',         label: 'Home',       active: true },
  { id: 'flights',   icon: 'flight',       label: 'Flights' },
  { id: 'map',       icon: 'map',          label: 'Find Way' },
  { id: 'directory', icon: 'apps',         label: 'Directory' },
  { id: 'support',   icon: 'headset_mic',  label: 'Talk to Us' },
]

const SERVICES = [
  { icon: 'local_atm',        label: 'Currency',  category: 'finance'   },
  { icon: 'wifi',             label: 'Wi-Fi',     category: 'wifi'      },
  { icon: 'luggage',          label: 'Baggage',   category: 'services'  },
  { icon: 'restaurant',       label: 'Dining',    category: 'dining'    },
  { icon: 'shopping_bag',     label: 'Shopping',  category: 'shopping'  },
  { icon: 'local_taxi',       label: 'Taxi',      category: 'services'  },
  { icon: 'hotel',            label: 'Lounges',   category: 'lounge'    },
  { icon: 'medical_services', label: 'Medical',   category: 'medical'   },
]

export function HomeScreen() {
  const router = useRouter()
  const time = useClock()
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="home">
      {/* Top bar */}
      <header className="home-bar" role="banner">
        <div className="home-bar-brand">
          <span className="home-bar-icon" aria-hidden="true">
            <md-icon>flight</md-icon>
          </span>
          <div className="home-bar-titles">
            <span className="home-bar-name md-typescale-title-medium">
              AeroAssist Kiosk
            </span>
            <span className="home-bar-sub md-typescale-label-medium">
              International Terminal · Level 1
            </span>
          </div>
        </div>

        <div className="home-bar-right">
          <button
            className="home-lang md-typescale-label-large"
            aria-label="Change language"
            type="button"
          >
            <md-icon>language</md-icon>
            EN
          </button>
          <div
            className="home-clock md-typescale-title-medium"
            aria-hidden="true"
          >
            <md-icon>schedule</md-icon>
            {time || '--:--'}
          </div>
        </div>
      </header>

      {/* Scrollable body */}
      <main className="home-content" id="main-content">
        {/* Welcome */}
        <section aria-label="Welcome">
          <div className="home-welcome">
            <div className="home-welcome-text">
              <h1 className="home-greeting md-typescale-headline-small">
                Welcome, traveler
              </h1>
              <p className="home-tagline md-typescale-body-large">
                How can we help you today? Select a service below to get started.
              </p>
            </div>
            <div
              className="home-terminal-badge md-typescale-label-large"
              aria-label="Terminal 2, Gate B"
            >
              <md-icon>location_on</md-icon>
              Terminal 2 · Gate B
            </div>
          </div>
        </section>

        {/* Flight status banner */}
        <section aria-label="Your next flight">
          <div className="home-flight-banner" role="region">
            <div className="home-flight-seg">
              <span className="home-flight-label md-typescale-label-small">
                Flight
              </span>
              <span className="home-flight-value md-typescale-title-large">
                EK 512
              </span>
            </div>
            <div className="home-flight-divider" aria-hidden="true" />
            <div className="home-flight-seg">
              <span className="home-flight-label md-typescale-label-small">
                Destination
              </span>
              <span className="home-flight-value md-typescale-title-medium">
                Dubai (DXB)
              </span>
            </div>
            <div className="home-flight-divider" aria-hidden="true" />
            <div className="home-flight-seg">
              <span className="home-flight-label md-typescale-label-small">
                Departure
              </span>
              <span className="home-flight-value md-typescale-title-medium">
                14:35
              </span>
            </div>
            <div className="home-flight-divider" aria-hidden="true" />
            <div className="home-flight-seg">
              <span className="home-flight-label md-typescale-label-small">
                Gate
              </span>
              <span className="home-flight-value md-typescale-title-large">
                B12
              </span>
            </div>
            <span
              className="home-flight-status status-ontime md-typescale-label-large"
              role="status"
            >
              <md-icon>check_circle</md-icon>
              On Time
            </span>
          </div>
        </section>

        {/* Main service cards */}
        <section aria-labelledby="services-heading">
          <h2
            id="services-heading"
            className="home-section-heading md-typescale-title-medium"
            style={{ marginBottom: 16 }}
          >
            What would you like to do?
          </h2>
          <div className="home-cards" role="list">
            {/* Flight Information */}
            <button
              role="listitem"
              type="button"
              className="home-card card-flight"
              aria-label="Flight information"
              onClick={() => router.push('/flights')}

            >
              <md-ripple />
              <span className="home-card-icon" aria-hidden="true">
                <md-icon>flight_takeoff</md-icon>
              </span>
              <div className="home-card-text">
                <span className="home-card-name md-typescale-title-large">
                  Flight Info
                </span>
                <span className="home-card-desc md-typescale-body-medium">
                  Status, gates &amp; boarding times
                </span>
              </div>
            </button>

            {/* Find Way */}
            <button
              role="listitem"
              type="button"
              className="home-card card-wayfind"
              aria-label="Find your way — wayfinding"
              onClick={() => router.push('/wayfinding')}
            >
              <md-ripple />
              <span className="home-card-icon" aria-hidden="true">
                <md-icon>navigation</md-icon>
              </span>
              <div className="home-card-text">
                <span className="home-card-name md-typescale-title-large">
                  Find Way
                </span>
                <span className="home-card-desc md-typescale-body-medium">
                  Directions to your gate or facility
                </span>
              </div>
            </button>

            {/* Talk to Us */}
            <button
              role="listitem"
              type="button"
              className="home-card card-support"
              aria-label="Talk to us — customer support"
              onClick={() => router.push('/support')}
            >
              <md-ripple />
              <span className="home-card-icon" aria-hidden="true">
                <md-icon>headset_mic</md-icon>
              </span>
              <div className="home-card-text">
                <span className="home-card-name md-typescale-title-large">
                  Talk to Us
                </span>
                <span className="home-card-desc md-typescale-body-medium">
                  Live agent, AI chat &amp; video call
                </span>
              </div>
            </button>

            {/* Feedback */}
            <button
              role="listitem"
              type="button"
              className="home-card card-feedback"
              aria-label="Give feedback"
              onClick={() => router.push('/feedback')}
            >
              <md-ripple />
              <span className="home-card-icon" aria-hidden="true">
                <md-icon>rate_review</md-icon>
              </span>
              <div className="home-card-text">
                <span className="home-card-name md-typescale-title-large">
                  Feedback
                </span>
                <span className="home-card-desc md-typescale-body-medium">
                  Rate your airport experience
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Quick-access services */}
        <section aria-labelledby="quick-heading">
          <h2
            id="quick-heading"
            className="home-section-heading md-typescale-title-medium"
            style={{ marginBottom: 12 }}
          >
            Quick access
          </h2>
          <div className="home-services" role="list">
            {SERVICES.map((svc) => (
              <button
                role="listitem"
                key={svc.label}
                type="button"
                className="home-service-chip"
                aria-label={svc.label}
                onClick={() => router.push(`/directory?category=${svc.category}`)}
              >
                <md-icon>{svc.icon}</md-icon>
                <span>{svc.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom navigation */}
      <nav className="home-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`home-nav-item${activeNav === item.id ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={activeNav === item.id ? 'page' : undefined}
            onClick={() => {
              setActiveNav(item.id)
              if (item.id === 'flights')   router.push('/flights')
              if (item.id === 'map')       router.push('/wayfinding')
              if (item.id === 'directory') router.push('/directory')
              if (item.id === 'support')   router.push('/support')
            }}
          >
            <span className="home-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="home-nav-label md-typescale-label-small">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
