'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type ScanState = 'scanning' | 'success' | 'error'

export function FeedbackScan() {
  const router = useRouter()
  const [scanState, setScanState] = useState<ScanState>('scanning')
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  // Simulate a successful scan after 4 s for demo purposes
  useEffect(() => {
    const t = setTimeout(() => {
      setScanState('success')
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  // Auto-navigate after success
  useEffect(() => {
    if (scanState !== 'success') return
    const t = setTimeout(() => {
      router.push('/feedback/rating')
    }, 1800)
    return () => clearTimeout(t)
  }, [scanState, router])

  const handleSimulateError = () => {
    setScanState('error')
    setShowErrorDialog(true)
  }

  const handleTryAgain = () => {
    setShowErrorDialog(false)
    setScanState('scanning')
  }

  return (
    <div className="fs">
      {/* Top App Bar */}
      <header className="fs-bar" role="banner">
        <button
          type="button"
          className="fs-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>
        <div className="fs-bar-titles">
          <h1 className="fs-bar-title">Feedback</h1>
          <span className="fs-bar-subtitle">Scan Boarding Pass</span>
        </div>
        <button type="button" className="fs-lang-btn" aria-label="Select language">
          <span className="fs-lang-text">EN</span>
          <span className="material-symbols-outlined fs-lang-arrow" aria-hidden="true">expand_more</span>
        </button>
      </header>

      {/* Main */}
      <main className="fs-main">

        {/* Scanner Card */}
        <div className="fs-card">
          <h2 className="fs-heading">Scan Your Boarding Pass</h2>
          <p className="fs-subtext">
            Place your boarding pass under the scanner to continue.
          </p>

          {/* Scanner Frame */}
          <div
            className={`fs-frame-wrap${scanState === 'success' ? ' fs-frame-wrap--success' : ''}`}
            role="img"
            aria-label={
              scanState === 'scanning' ? 'Scanning for boarding pass' :
              scanState === 'success' ? 'Boarding pass verified' :
              'Scan failed'
            }
          >
            {scanState === 'scanning' && (
              <>
                {/* Corner guides */}
                <span className="fs-corner fs-corner--tl" aria-hidden="true" />
                <span className="fs-corner fs-corner--tr" aria-hidden="true" />
                <span className="fs-corner fs-corner--bl" aria-hidden="true" />
                <span className="fs-corner fs-corner--br" aria-hidden="true" />

                {/* QR illustration */}
                <div className="fs-qr-illus" aria-hidden="true">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Top-left module */}
                    <rect x="8" y="8" width="38" height="38" rx="4" fill="none" stroke="#2563EB" strokeWidth="3"/>
                    <rect x="16" y="16" width="22" height="22" rx="2" fill="#2563EB" opacity="0.25"/>
                    <rect x="20" y="20" width="14" height="14" rx="1" fill="#2563EB"/>
                    {/* Top-right module */}
                    <rect x="74" y="8" width="38" height="38" rx="4" fill="none" stroke="#2563EB" strokeWidth="3"/>
                    <rect x="82" y="16" width="22" height="22" rx="2" fill="#2563EB" opacity="0.25"/>
                    <rect x="86" y="20" width="14" height="14" rx="1" fill="#2563EB"/>
                    {/* Bottom-left module */}
                    <rect x="8" y="74" width="38" height="38" rx="4" fill="none" stroke="#2563EB" strokeWidth="3"/>
                    <rect x="16" y="82" width="22" height="22" rx="2" fill="#2563EB" opacity="0.25"/>
                    <rect x="20" y="86" width="14" height="14" rx="1" fill="#2563EB"/>
                    {/* Data dots */}
                    <rect x="56" y="8" width="8" height="8" rx="1" fill="#2563EB" opacity="0.5"/>
                    <rect x="56" y="20" width="8" height="8" rx="1" fill="#2563EB"/>
                    <rect x="56" y="32" width="8" height="8" rx="1" fill="#2563EB" opacity="0.5"/>
                    <rect x="8"  y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.7"/>
                    <rect x="20" y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.4"/>
                    <rect x="32" y="56" width="8" height="8" rx="1" fill="#2563EB"/>
                    <rect x="56" y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.6"/>
                    <rect x="68" y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.3"/>
                    <rect x="80" y="56" width="8" height="8" rx="1" fill="#2563EB"/>
                    <rect x="92" y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.5"/>
                    <rect x="104" y="56" width="8" height="8" rx="1" fill="#2563EB" opacity="0.8"/>
                    <rect x="80" y="68" width="8" height="8" rx="1" fill="#2563EB" opacity="0.4"/>
                    <rect x="92" y="68" width="8" height="8" rx="1" fill="#2563EB"/>
                    <rect x="104" y="68" width="8" height="8" rx="1" fill="#2563EB" opacity="0.6"/>
                    <rect x="80" y="80" width="8" height="8" rx="1" fill="#2563EB"/>
                    <rect x="92" y="92" width="8" height="8" rx="1" fill="#2563EB" opacity="0.5"/>
                    <rect x="104" y="80" width="8" height="8" rx="1" fill="#2563EB" opacity="0.3"/>
                    <rect x="80" y="104" width="8" height="8" rx="1" fill="#2563EB" opacity="0.7"/>
                    <rect x="104" y="104" width="8" height="8" rx="1" fill="#2563EB"/>
                  </svg>
                </div>

                {/* Scanning beam */}
                <div className="fs-beam" aria-hidden="true" />
              </>
            )}

            {/* Success State */}
            {scanState === 'success' && (
              <div className="fs-success-content" aria-live="assertive">
                <div className="fs-success-ring">
                  <span className="material-symbols-outlined fs-success-icon" aria-hidden="true">check_circle</span>
                </div>
                <p className="fs-success-text">Boarding Pass Verified</p>
                <div className="fs-success-spinner" aria-label="Loading" />
              </div>
            )}
          </div>

          {/* Instruction */}
          {scanState === 'scanning' && (
            <p className="fs-instruction">
              <span className="material-symbols-outlined fs-instruction-icon" aria-hidden="true">info</span>
              Align the QR code within the frame
            </p>
          )}

          {/* Simulate error button (for demo) */}
          {scanState === 'scanning' && (
            <button
              type="button"
              className="fs-simulate-error"
              onClick={handleSimulateError}
              aria-label="Simulate failed scan for demo"
            >
              Simulate Failed Scan (Demo)
            </button>
          )}

          {/* OR Divider + alternate */}
          {scanState === 'scanning' && (
            <>
              <div className="fs-divider" role="separator" aria-label="or">
                <span className="fs-divider-line" aria-hidden="true" />
                <span className="fs-divider-text">OR</span>
                <span className="fs-divider-line" aria-hidden="true" />
              </div>
              <button
                type="button"
                className="fs-alt-btn"
                onClick={() => router.push('/feedback/mobile')}
                aria-label="Enter mobile number instead"
              >
                <span className="material-symbols-outlined fs-alt-icon" aria-hidden="true">phone</span>
                Enter Mobile Number Instead
              </button>
            </>
          )}

          {/* Help Card */}
          {scanState === 'scanning' && (
            <aside className="fs-help-card" role="note">
              <span className="material-symbols-outlined fs-help-icon" aria-hidden="true">support_agent</span>
              <div>
                <p className="fs-help-title">Need help?</p>
                <p className="fs-help-desc">
                  Ask our airport staff for assistance if your boarding pass cannot be scanned.
                </p>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Error Dialog */}
      {showErrorDialog && (
        <div className="fs-overlay" role="dialog" aria-modal="true" aria-labelledby="fs-err-title">
          <div className="fs-dialog">
            <div className="fs-dialog-icon-wrap" aria-hidden="true">
              <span className="material-symbols-outlined fs-dialog-icon">qr_code_scanner</span>
            </div>
            <h3 id="fs-err-title" className="fs-dialog-title">Unable to scan your boarding pass.</h3>
            <p className="fs-dialog-body">
              Please ensure the boarding pass is flat and well-lit, or try an alternate identification method.
            </p>
            <div className="fs-dialog-actions">
              <button type="button" className="fs-dialog-btn fs-dialog-btn--outline" onClick={() => { setShowErrorDialog(false); router.push('/feedback/mobile') }}>
                Enter Mobile Number
              </button>
              <button type="button" className="fs-dialog-btn fs-dialog-btn--filled" onClick={handleTryAgain}>
                <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fi-nav" aria-label="Main navigation">
        <button type="button" className="fi-nav-item" aria-label="Flight Info" onClick={() => router.push('/flights')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">flight</span>
          <span className="fi-nav-label">Flight Info</span>
        </button>
        <button type="button" className="fi-nav-item" aria-label="Find Way" onClick={() => router.push('/navigation')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">map</span>
          <span className="fi-nav-label">Find Way</span>
        </button>
        <button type="button" className="fi-nav-item" aria-label="Talk to Us" onClick={() => router.push('/support')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">headset_mic</span>
          <span className="fi-nav-label">Talk to Us</span>
        </button>
        <button type="button" className="fi-nav-item fi-nav-item--active" aria-label="Feedback — current page" aria-current="page" onClick={() => router.push('/feedback')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">rate_review</span>
          <span className="fi-nav-label">Feedback</span>
        </button>
        <button type="button" className="fi-nav-item" aria-label="Search" onClick={() => router.push('/directory')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">search</span>
          <span className="fi-nav-label">Search</span>
        </button>
      </nav>
    </div>
  )
}
