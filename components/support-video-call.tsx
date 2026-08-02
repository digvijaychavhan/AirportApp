'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type NavItem = { id: string; icon: string; label: string; route?: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'flights',    icon: 'flight',      label: 'Flight Info',  route: '/flights'    },
  { id: 'wayfinding', icon: 'map',         label: 'Find Way',     route: '/navigation' },
  { id: 'support',    icon: 'headset_mic', label: 'Talk to Us'                         },
  { id: 'feedback',   icon: 'rate_review', label: 'Feedback',     route: '/feedback'   },
  { id: 'search',     icon: 'search',      label: 'Search'                             },
]

function formatDuration(secs: number) {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  if (h > 0) {
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

export function SupportVideoCall() {
  const router = useRouter()
  const [elapsed, setElapsed] = useState(0)
  const [muted, setMuted] = useState(false)
  const [videoOn, setVideoOn] = useState(true)
  const [speakerOn, setSpeakerOn] = useState(true)
  const [showSheet, setShowSheet] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  // Live call timer
  useEffect(() => {
    const id = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  // Close bottom sheet on outside click
  useEffect(() => {
    if (!showSheet) return
    function onPointerDown(e: PointerEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setShowSheet(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [showSheet])

  function handleEndCall() {
    setShowEndConfirm(true)
    setShowSheet(false)
  }

  function confirmEnd() {
    router.push('/call-ended')
  }

  return (
    <div className="sc">
      {/* ── Top App Bar ── */}
      <header className="sc-bar" role="banner">
        <button
          type="button"
          className="sc-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <md-icon>arrow_back</md-icon>
        </button>

        <div className="sc-bar-titles">
          <h1 className="sc-bar-title md-typescale-title-large">Talk to Us</h1>
          <span className="sc-bar-subtitle md-typescale-body-small">
            Connected to our virtual assistant
          </span>
        </div>

        <button
          type="button"
          className="sc-bar-lang md-typescale-label-large"
          aria-label="Change language"
        >
          <md-icon>language</md-icon>
          EN
          <md-icon>expand_more</md-icon>
        </button>
      </header>

      {/* ── Call Status Bar ── */}
      <div className="sc-status" role="status" aria-label="Call status">
        <div className="sc-status-section">
          <span className="sc-online-dot" aria-hidden="true" />
          <span className="sc-status-label md-typescale-label-medium">Connected</span>
        </div>
        <div className="sc-status-divider" aria-hidden="true" />
        <div className="sc-status-section">
          <md-icon aria-hidden="true">schedule</md-icon>
          <div className="sc-status-text">
            <span className="sc-status-caption md-typescale-body-small">Call Duration</span>
            <span className="sc-status-value md-typescale-label-large" aria-live="polite" aria-atomic="true">
              {formatDuration(elapsed)}
            </span>
          </div>
        </div>
        <div className="sc-status-divider" aria-hidden="true" />
        <div className="sc-status-section">
          <md-icon aria-hidden="true">shield</md-icon>
          <div className="sc-status-text">
            <span className="sc-status-caption md-typescale-body-small">Secure Connection</span>
            <span className="sc-status-value md-typescale-label-medium">End-to-end Encrypted</span>
          </div>
        </div>
      </div>

      {/* ── Main scrollable body ── */}
      <main className="sc-body">

        {/* Top video panel — Airport Assistant */}
        <div className="sc-video-panel sc-video-top" role="img" aria-label="Airport Assistant video feed">
          <img
            src="/support-agent.png"
            alt="Priya Sharma, Customer Support Executive"
            className="sc-video-bg"
            crossOrigin="anonymous"
          />
          <div className="sc-video-overlay" aria-hidden="true" />

          {/* Name card — bottom left */}
          <div className="sc-name-card">
            <span className="sc-name-dot" aria-hidden="true" />
            <div>
              <p className="sc-name-primary md-typescale-label-large">Priya Sharma</p>
              <p className="sc-name-role md-typescale-body-small">Customer Support Executive</p>
            </div>
          </div>

          {/* Expand — top right */}
          <button
            type="button"
            className="sc-expand-btn"
            aria-label="Expand airport assistant video"
          >
            <md-icon>open_in_full</md-icon>
          </button>

          <span className="sc-panel-label md-typescale-label-small">Airport Assistant</span>
        </div>

        {/* Bottom video panel — You */}
        <div className="sc-video-panel sc-video-bottom" role="img" aria-label="Your video feed">
          <div className="sc-self-bg" aria-hidden="true" />

          {videoOn ? (
            <div className="sc-avatar-wrap" aria-hidden="true">
              <div className="sc-avatar">
                <md-icon>person</md-icon>
              </div>
            </div>
          ) : (
            <div className="sc-video-off" aria-label="Your camera is off">
              <md-icon aria-hidden="true">videocam_off</md-icon>
              <span className="md-typescale-body-medium">Camera Off</span>
            </div>
          )}

          <span className="sc-panel-label md-typescale-label-small">You</span>
        </div>

        {/* ── Call Controls ── */}
        <div className="sc-controls" role="toolbar" aria-label="Call controls">
          {/* Mute */}
          <div className="sc-ctrl-wrap">
            <button
              type="button"
              className={`sc-ctrl-btn sc-ctrl-blue${muted ? ' sc-ctrl-toggled' : ''}`}
              aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
              aria-pressed={muted}
              onClick={() => setMuted(v => !v)}
            >
              <md-icon>{muted ? 'mic_off' : 'mic'}</md-icon>
            </button>
            <span className="sc-ctrl-label md-typescale-label-small">{muted ? 'Unmute' : 'Mute'}</span>
          </div>

          {/* Video */}
          <div className="sc-ctrl-wrap">
            <button
              type="button"
              className={`sc-ctrl-btn sc-ctrl-blue${!videoOn ? ' sc-ctrl-toggled' : ''}`}
              aria-label={videoOn ? 'Turn off camera' : 'Turn on camera'}
              aria-pressed={!videoOn}
              onClick={() => setVideoOn(v => !v)}
            >
              <md-icon>{videoOn ? 'videocam' : 'videocam_off'}</md-icon>
            </button>
            <span className="sc-ctrl-label md-typescale-label-small">Video</span>
          </div>

          {/* Speaker */}
          <div className="sc-ctrl-wrap">
            <button
              type="button"
              className={`sc-ctrl-btn sc-ctrl-blue${!speakerOn ? ' sc-ctrl-toggled' : ''}`}
              aria-label={speakerOn ? 'Turn off speaker' : 'Turn on speaker'}
              aria-pressed={!speakerOn}
              onClick={() => setSpeakerOn(v => !v)}
            >
              <md-icon>{speakerOn ? 'volume_up' : 'volume_off'}</md-icon>
            </button>
            <span className="sc-ctrl-label md-typescale-label-small">Speaker</span>
          </div>

          {/* More */}
          <div className="sc-ctrl-wrap">
            <button
              type="button"
              className="sc-ctrl-btn sc-ctrl-white"
              aria-label="More options"
              aria-haspopup="dialog"
              aria-expanded={showSheet}
              onClick={() => setShowSheet(v => !v)}
            >
              <md-icon>more_horiz</md-icon>
            </button>
            <span className="sc-ctrl-label md-typescale-label-small">More</span>
          </div>

          {/* End Call */}
          <div className="sc-ctrl-wrap">
            <button
              type="button"
              className="sc-ctrl-btn sc-ctrl-end"
              aria-label="End call"
              onClick={handleEndCall}
            >
              <md-icon>call_end</md-icon>
            </button>
            <span className="sc-ctrl-label md-typescale-label-small">End Call</span>
          </div>
        </div>

        {/* ── Help Information card ── */}
        <div className="sc-help-card" role="complementary" aria-label="Help topics">
          <div className="sc-help-header">
            <div className="sc-help-icon-wrap" aria-hidden="true">
              <md-icon>info</md-icon>
            </div>
            <p className="sc-help-heading md-typescale-label-large">
              Our team is here to help you with:
            </p>
          </div>
          <ul className="sc-help-list md-typescale-body-medium" aria-label="Help topics list">
            {[
              'Flight Information',
              'Wayfinding',
              'Boarding Gates',
              'Airport Facilities',
              'Baggage',
              'Lounges',
              'Flight Transfers',
            ].map(topic => (
              <li key={topic} className="sc-help-item">
                <span className="sc-help-bullet" aria-hidden="true" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

      </main>

      {/* ── Bottom navigation ── */}
      <nav className="sc-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            type="button"
            className={`sc-nav-item${item.id === 'support' ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'support' ? 'page' : undefined}
            onClick={() => { if (item.route) router.push(item.route) }}
          >
            <span className="sc-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="sc-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ── More options bottom sheet ── */}
      {showSheet && (
        <div
          className="sc-sheet-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="More call options"
        >
          <div className="sc-sheet" ref={sheetRef}>
            <div className="sc-sheet-handle" aria-hidden="true" />
            <h2 className="sc-sheet-title md-typescale-title-medium">More Options</h2>
            {[
              { icon: 'signal_cellular_alt', label: 'Call Quality' },
              { icon: 'language',            label: 'Switch Language' },
              { icon: 'flag',                label: 'Report Issue' },
            ].map(opt => (
              <button
                key={opt.label}
                type="button"
                className="sc-sheet-item md-typescale-body-large"
                onClick={() => setShowSheet(false)}
              >
                <md-icon aria-hidden="true">{opt.icon}</md-icon>
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              className="sc-sheet-item sc-sheet-end md-typescale-body-large"
              onClick={handleEndCall}
            >
              <md-icon aria-hidden="true">call_end</md-icon>
              End Call
            </button>
          </div>
        </div>
      )}

      {/* ── End call confirmation dialog ── */}
      {showEndConfirm && (
        <div
          className="sc-dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-title"
          aria-describedby="end-body"
        >
          <div className="sc-dialog">
            <div className="sc-dialog-icon" aria-hidden="true">
              <md-icon>call_end</md-icon>
            </div>
            <h2 id="end-title" className="sc-dialog-title md-typescale-headline-small">
              End this call?
            </h2>
            <p id="end-body" className="sc-dialog-body md-typescale-body-large">
              You are still connected with Priya Sharma. Are you sure you want to end the call?
            </p>
            <div className="sc-dialog-actions">
              <button
                type="button"
                className="sc-dialog-btn"
                onClick={() => setShowEndConfirm(false)}
                aria-label="Continue the call"
              >
                Continue
              </button>
              <button
                type="button"
                className="sc-dialog-btn sc-dialog-end"
                onClick={confirmEnd}
                aria-label="Confirm end call"
              >
                <md-icon aria-hidden="true">call_end</md-icon>
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
