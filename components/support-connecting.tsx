'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type NavItem = { id: string; icon: string; label: string; route?: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'flights',    icon: 'flight',        label: 'Flight Info',  route: '/flights'    },
  { id: 'wayfinding', icon: 'map',           label: 'Find Way',     route: '/wayfinding' },
  { id: 'support',    icon: 'headset_mic',   label: 'Talk to Us'                         },
  { id: 'feedback',   icon: 'rate_review',   label: 'Feedback',     route: '/feedback'   },
  { id: 'search',     icon: 'search',        label: 'Search'                              },
]

type DialogState = 'hidden' | 'error'

export function SupportConnecting() {
  const router = useRouter()
  const [dialog, setDialog] = useState<DialogState>('hidden')

  // Simulate a failed connection after 8 s for demo purposes.
  // In production remove this and replace with real signalling logic.
  useEffect(() => {
    const id = setTimeout(() => setDialog('error'), 8000)
    return () => clearTimeout(id)
  }, [])

  function handleCancel() {
    router.push('/')
  }

  function handleTryAgain() {
    setDialog('hidden')
    // restart the timeout
    const id = setTimeout(() => setDialog('error'), 8000)
    return () => clearTimeout(id)
  }

  function handleGoBack() {
    router.push('/')
  }

  return (
    <div className="support">
      {/* ── Top App Bar ── */}
      <header className="support-bar" role="banner">
        <button
          type="button"
          className="support-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <md-icon>arrow_back</md-icon>
        </button>

        <div className="support-bar-titles">
          <h1 className="support-bar-title md-typescale-title-large">
            Talk to Us
          </h1>
          <span className="support-bar-subtitle md-typescale-body-small">
            Connecting to our virtual assistant
          </span>
        </div>

        <button
          type="button"
          className="support-bar-lang md-typescale-label-large"
          aria-label="Change language"
        >
          <md-icon>language</md-icon>
          EN
          <md-icon>expand_more</md-icon>
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="support-body">

        {/* Connecting animation */}
        <section
          className="support-connect-section"
          aria-live="polite"
          aria-label="Connection status"
        >
          <h2 className="support-connect-heading md-typescale-display-small">
            Connecting...
          </h2>
          <p className="support-connect-body md-typescale-body-large">
            Please wait while we connect you to our airport staff.
          </p>

          {/* Animated ring */}
          <div
            className="support-ring-wrap"
            role="img"
            aria-label="Circular connection progress indicator"
          >
            {/* Rotating SVG ring */}
            <svg
              className="support-ring-svg"
              viewBox="0 0 180 180"
              aria-hidden="true"
            >
              <circle
                className="support-ring-track"
                cx="90"
                cy="90"
                r="84"
              />
              <circle
                className="support-ring-progress"
                cx="90"
                cy="90"
                r="84"
                transform="rotate(-90 90 90)"
              />
            </svg>

            {/* Inner circle with headset + dots */}
            <div className="support-ring-inner">
              <md-icon
                className="support-ring-icon"
                style={{ fontSize: 52, width: 52, height: 52 }}
                aria-hidden="true"
              >
                headset_mic
              </md-icon>
              <div className="support-dots" aria-hidden="true">
                <span className="support-dot" />
                <span className="support-dot" />
                <span className="support-dot" />
              </div>
            </div>
          </div>
        </section>

        {/* Estimated wait time card */}
        <div className="support-card wait" role="status" aria-label="Estimated wait time">
          <div className="support-card-icon-wrap">
            <md-icon aria-hidden="true">info</md-icon>
          </div>
          <div className="support-card-content">
            <p className="support-card-label md-typescale-label-medium">
              Estimated wait time
            </p>
            <p className="support-card-value md-typescale-title-medium">
              Less than 1 minute
            </p>
          </div>
        </div>

        {/* Privacy notice card */}
        <div className="support-card privacy" role="note">
          <div className="support-card-icon-wrap">
            <md-icon aria-hidden="true">security</md-icon>
          </div>
          <div className="support-card-content">
            <p className="support-card-text md-typescale-body-medium">
              Your conversation may be recorded for quality and training purposes.
              By continuing, you agree to our{' '}
              <button
                type="button"
                className="support-privacy-link md-typescale-body-medium"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>

        {/* Cancel button */}
        <div className="support-cancel-wrap">
          <button
            type="button"
            className="support-cancel-btn md-typescale-label-large"
            aria-label="Cancel connection request and return to previous screen"
            onClick={handleCancel}
          >
            <md-icon aria-hidden="true">close</md-icon>
            Cancel Request
          </button>
        </div>
      </main>

      {/* ── Error dialog ── */}
      {dialog === 'error' && (
        <div
          className="support-dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-body"
        >
          <div className="support-dialog">
            <div className="support-dialog-icon" aria-hidden="true">
              <md-icon>wifi_off</md-icon>
            </div>
            <h2 id="dialog-title" className="support-dialog-title md-typescale-headline-small">
              Unable to connect.
            </h2>
            <p id="dialog-body" className="support-dialog-body md-typescale-body-large">
              We could not reach an available agent. Please try again or return to the home screen.
            </p>
            <div className="support-dialog-actions">
              <button
                type="button"
                className="support-dialog-btn md-typescale-label-large"
                onClick={handleGoBack}
                aria-label="Go back to home screen"
              >
                Go Back
              </button>
              <button
                type="button"
                className="support-dialog-btn primary md-typescale-label-large"
                onClick={handleTryAgain}
                aria-label="Try connecting again"
              >
                <md-icon aria-hidden="true">refresh</md-icon>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom navigation ── */}
      <nav className="support-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`support-nav-item${item.id === 'support' ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'support' ? 'page' : undefined}
            onClick={() => {
              if (item.route) router.push(item.route)
            }}
          >
            <span className="support-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="support-nav-label">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
