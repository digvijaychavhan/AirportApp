'use client'

import { useRouter } from 'next/navigation'

const SESSION = { id: 'TX-7841550', duration: '03:24', agent: 'Priya Sharma' }

export function CallEnded() {
  const router = useRouter()

  return (
    <div className="ce">
      {/* ── Top App Bar ── */}
      <header className="ce-bar" role="banner">
        <div className="ce-bar-titles">
          <h1 className="ce-bar-title">Talk to Us</h1>
          <span className="ce-bar-subtitle">Call Completed</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="ce-body">

        {/* Success illustration */}
        <div className="ce-icon-wrap" aria-hidden="true">
          <div className="ce-icon-ring">
            <span className="ce-icon material-symbols-outlined">call_end</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="ce-heading">Call Ended</h2>

        {/* Session summary pill-row */}
        <div className="ce-summary-row" role="list" aria-label="Call summary">
          <div className="ce-summary-chip" role="listitem">
            <span className="material-symbols-outlined ce-chip-icon">tag</span>
            <div className="ce-chip-text">
              <span className="ce-chip-label">Session ID</span>
              <span className="ce-chip-value">{SESSION.id}</span>
            </div>
          </div>

          <div className="ce-summary-chip" role="listitem">
            <span className="material-symbols-outlined ce-chip-icon">schedule</span>
            <div className="ce-chip-text">
              <span className="ce-chip-label">Duration</span>
              <span className="ce-chip-value">{SESSION.duration}</span>
            </div>
          </div>

          <div className="ce-summary-chip" role="listitem">
            <span className="material-symbols-outlined ce-chip-icon">person</span>
            <div className="ce-chip-text">
              <span className="ce-chip-label">Agent</span>
              <span className="ce-chip-value">{SESSION.agent}</span>
            </div>
          </div>
        </div>

        {/* Feedback card */}
        <section className="ce-card" aria-labelledby="ce-fb-heading">
          <h3 id="ce-fb-heading" className="ce-card-heading">
            Have we addressed your concern?
          </h3>
          <p className="ce-card-sub">
            Your feedback helps us improve airport assistance services.
          </p>

          <div className="ce-fb-btns" role="group" aria-label="Feedback options">
            {/* Yes */}
            <button
              type="button"
              className="ce-fb-btn ce-fb-yes"
              aria-label="Yes, my concern was addressed"
              onClick={() => router.push('/thank-you')}
            >
              <span className="ce-fb-thumb material-symbols-outlined" aria-hidden="true">
                thumb_up
              </span>
              <span className="ce-fb-btn-label">Yes</span>
            </button>

            {/* No */}
            <button
              type="button"
              className="ce-fb-btn ce-fb-no"
              aria-label="No, my concern was not addressed"
              onClick={() => router.push('/detailed-feedback')}
            >
              <span className="ce-fb-thumb material-symbols-outlined" aria-hidden="true">
                thumb_down
              </span>
              <span className="ce-fb-btn-label">No</span>
            </button>
          </div>

          <p className="ce-helper-text">
            You may be asked one additional question based on your selection.
          </p>
        </section>

      </main>
    </div>
  )
}
