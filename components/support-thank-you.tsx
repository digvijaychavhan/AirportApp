'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const COUNTDOWN_START = 5

export function SupportThankYou() {
  const router = useRouter()
  const [count, setCount] = useState(COUNTDOWN_START)

  useEffect(() => {
    if (count <= 0) {
      router.push('/')
      return
    }
    const id = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(id)
  }, [count, router])

  const progress = ((COUNTDOWN_START - count) / COUNTDOWN_START) * 100

  return (
    <div className="ty">
      {/* ── Top App Bar ── */}
      <header className="ty-bar" role="banner">
        <div className="ty-bar-titles">
          <h1 className="ty-bar-title">Talk to Us</h1>
          <span className="ty-bar-subtitle">Session Complete</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="ty-body">

        {/* Success illustration */}
        <div className="ty-icon-wrap" aria-label="Success" aria-hidden="true">
          <div className="ty-icon-ring">
            <span className="material-symbols-outlined ty-check-icon">check_circle</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="ty-heading">Thank You!</h2>
        <p className="ty-sub">
          Thank you for contacting the DIAL Virtual Helpdesk.
          <br />
          We appreciate your feedback and hope you have a pleasant journey.
        </p>

        {/* Countdown card */}
        <div className="ty-countdown-card" role="status" aria-live="polite" aria-atomic="true">
          {/* Circular progress ring */}
          <div className="ty-ring-wrap" aria-hidden="true">
            <svg className="ty-ring-svg" viewBox="0 0 80 80" aria-hidden="true">
              {/* Track */}
              <circle className="ty-ring-track" cx="40" cy="40" r="34" />
              {/* Progress */}
              <circle
                className="ty-ring-progress"
                cx="40"
                cy="40"
                r="34"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="ty-ring-count">{count}</span>
          </div>

          <div className="ty-countdown-text">
            <p className="ty-countdown-label">Returning to Home...</p>
            <p className="ty-countdown-sub">in {count} second{count !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Return Home button */}
        <button
          type="button"
          className="ty-home-btn"
          aria-label="Return to home screen now"
          onClick={() => router.push('/')}
        >
          <span className="material-symbols-outlined" aria-hidden="true">home</span>
          Return Home Now
        </button>

      </main>
    </div>
  )
}
