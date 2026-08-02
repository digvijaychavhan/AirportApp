'use client'

import { useRouter } from 'next/navigation'

type AccessMode = 'elevator' | 'escalator'

const ACCESS_LABEL: Record<AccessMode, { label: string; icon: string }> = {
  elevator: { label: 'Elevator', icon: 'elevator' },
  escalator: { label: 'Escalator', icon: 'escalator' },
}

export function AirportMap({ mode }: { mode: AccessMode }) {
  const router = useRouter()
  const access = ACCESS_LABEL[mode]

  const steps = [
    {
      icon: 'straight',
      title: 'Head toward Central Concourse',
      sub: 'Follow the blue floor line past Duty Free',
      dist: '80 m',
    },
    {
      icon: access.icon,
      title: `Take the ${access.label.toLowerCase()} to Level 2`,
      sub: 'Located next to Café Aero',
      dist: 'Level 1 → 2',
    },
    {
      icon: 'turn_right',
      title: 'Turn right toward Gates B',
      sub: 'Security checkpoint B on your left',
      dist: '120 m',
    },
    {
      icon: 'flight_takeoff',
      title: 'Arrive at Gate B12',
      sub: 'Boarding area with seating and restrooms',
      dist: '5 min',
    },
  ]

  return (
    <div className="kiosk">
      <header className="kiosk-bar">
        <div className="kiosk-brand">
          <span className="kiosk-brand-mark" aria-hidden="true">
            <md-icon>flight</md-icon>
          </span>
          <span className="kiosk-brand-text">
            <span className="kiosk-brand-title md-typescale-title-large">
              Terminal Wayfinder
            </span>
            <span className="kiosk-brand-sub md-typescale-label-large">
              Route to Gate B12
            </span>
          </span>
        </div>
        <div className="kiosk-clock md-typescale-title-medium" aria-hidden="true">
          <md-icon>directions_walk</md-icon>
          5 min
        </div>
      </header>

      <nav className="kiosk-steps md-typescale-label-large" aria-label="Progress">
        <span className="kiosk-step is-done">
          <span className="kiosk-step-dot">
            <md-icon style={{ fontSize: 16, width: 16, height: 16 }}>check</md-icon>
          </span>
          <span className="kiosk-step-label">Choose access</span>
        </span>
        <span className="kiosk-step-bar" />
        <span className="kiosk-step is-active">
          <span className="kiosk-step-dot">2</span>
          <span className="kiosk-step-label">View map</span>
        </span>
        <span className="kiosk-step-bar" />
        <span className="kiosk-step">
          <span className="kiosk-step-dot">3</span>
          <span className="kiosk-step-label">Start walking</span>
        </span>
      </nav>

      <main className="map-canvas">
        <section className="map-summary" aria-label="Selected route summary">
          <span className="map-summary-icon" aria-hidden="true">
            <md-icon>{access.icon}</md-icon>
          </span>
          <span className="map-summary-text">
            <span className="md-typescale-title-medium">
              {access.label} route
            </span>
            <span className="md-typescale-body-medium">
              Step-by-step directions to your gate
            </span>
          </span>
          <span className="map-summary-eta">
            <span className="md-typescale-title-large">Gate B12</span>
            <span className="md-typescale-label-large">~350 m · 5 min</span>
          </span>
        </section>

        <section className="map-stage" aria-label="Terminal map">
          <div className="map-grid" aria-hidden="true" />
          <svg
            className="map-svg"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="map-route"
              d="M60 250 L60 170 L200 170 L200 90 L340 90 L340 55"
            />
          </svg>

          <span className="map-pin pin-start" style={{ left: '15%', top: '83%' }}>
            <span className="map-pin-badge" aria-hidden="true">
              <md-icon>my_location</md-icon>
            </span>
            <span className="map-pin-label md-typescale-label-medium">
              You are here
            </span>
          </span>

          <span className="map-pin pin-access" style={{ left: '50%', top: '57%' }}>
            <span className="map-pin-badge" aria-hidden="true">
              <md-icon>{access.icon}</md-icon>
            </span>
            <span className="map-pin-label md-typescale-label-medium">
              {access.label}
            </span>
          </span>

          <span className="map-pin pin-dest" style={{ left: '85%', top: '18%' }}>
            <span className="map-pin-badge" aria-hidden="true">
              <md-icon>flag</md-icon>
            </span>
            <span className="map-pin-label md-typescale-label-medium">
              Gate B12
            </span>
          </span>
        </section>

        <section className="map-steps-card" aria-label="Turn-by-turn directions">
          {steps.map((step) => (
            <div className="map-step" key={step.title}>
              <span className="map-step-icon" aria-hidden="true">
                <md-icon>{step.icon}</md-icon>
              </span>
              <span className="map-step-text">
                <span className="md-typescale-title-medium">{step.title}</span>
                <span className="map-step-sub md-typescale-body-medium">
                  {step.sub}
                </span>
              </span>
              <span className="map-step-dist md-typescale-label-large">
                {step.dist}
              </span>
            </div>
          ))}
        </section>
      </main>

      <footer className="kiosk-actions">
        <md-outlined-button onClick={() => router.push('/wayfinding')}>
          <md-icon slot="icon">arrow_back</md-icon>
          Back
        </md-outlined-button>
        <span className="spacer" />
        <md-filled-button onClick={() => router.push(`/navigation?mode=${mode}`)} trailing-icon>
          Start navigation
          <md-icon slot="icon">navigation</md-icon>
        </md-filled-button>
      </footer>
    </div>
  )
}
