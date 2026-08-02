'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function FeedbackMobile() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  const isValid = phone.length === 10 && /^\d{10}$/.test(phone)

  const handleKey = useCallback((digit: string) => {
    setError('')
    setShowError(false)
    if (digit === 'back') {
      setPhone(p => p.slice(0, -1))
    } else if (digit === 'confirm') {
      if (!isValid) {
        setError('Please enter a valid 10-digit mobile number.')
        setShowError(true)
      } else {
        router.push('/feedback/rating')
      }
    } else {
      if (phone.length < 10) {
        setPhone(p => p + digit)
      }
    }
  }, [phone, isValid, router])

  const handleContinue = () => {
    if (!isValid) {
      setError('Please enter a valid 10-digit mobile number.')
      setShowError(true)
      return
    }
    router.push('/feedback/rating')
  }

  const displayValue = phone
    ? phone.replace(/(\d{5})(\d{1,5})/, '$1 $2')
    : ''

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['back', '0', 'confirm'],
  ]

  return (
    <div className="fm">
      {/* Top App Bar */}
      <header className="fm-bar" role="banner">
        <button
          type="button"
          className="fm-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>
        <div className="fm-bar-titles">
          <h1 className="fm-bar-title">Feedback</h1>
          <span className="fm-bar-subtitle">Enter Mobile Number</span>
        </div>
        <button type="button" className="fm-lang-btn" aria-label="Select language">
          <span className="fm-lang-text">EN</span>
          <span className="material-symbols-outlined fm-lang-arrow" aria-hidden="true">expand_more</span>
        </button>
      </header>

      {/* Main */}
      <main className="fm-main">
        <div className="fm-card">
          {/* Illustration */}
          <div className="fm-illus" aria-hidden="true">
            <Image
              src="/illus-mobile.png"
              alt=""
              width={96}
              height={96}
              className="fm-illus-img"
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="fm-heading">Enter Your Mobile Number</h2>
          <p className="fm-subtext">
            We&apos;ll use your mobile number only to associate your feedback with your airport journey.
          </p>

          {/* Phone Input Display */}
          <div className={`fm-input-wrap${phone.length > 0 ? ' fm-input-wrap--filled' : ''}${showError ? ' fm-input-wrap--error' : ''}`}>
            <div className="fm-input-inner">
              <span className="fm-input-flag" aria-label="India">🇮🇳</span>
              <span className="fm-input-code">+91</span>
              <div className="fm-input-divider" aria-hidden="true" />
              <span className="material-symbols-outlined fm-input-phone-icon" aria-hidden="true">phone</span>
              <span className={`fm-input-value${!phone ? ' fm-input-value--placeholder' : ''}`} aria-live="polite" aria-label={`Phone number: ${phone || 'empty'}`}>
                {displayValue || 'Enter your mobile number'}
              </span>
              {phone.length > 0 && (
                <span className="fm-input-count">{phone.length}/10</span>
              )}
            </div>
            <p className="fm-helper-text" aria-live="polite">
              {showError
                ? <span className="fm-helper-text--error"><span className="material-symbols-outlined fm-err-icon" aria-hidden="true">error</span>{error}</span>
                : 'Example: 9876543210'
              }
            </p>
          </div>

          {/* Numeric Keypad */}
          <div className="fm-keypad" role="group" aria-label="Numeric keypad">
            {keys.map((row, ri) => (
              <div key={ri} className="fm-keypad-row">
                {row.map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`fm-key${k === 'back' ? ' fm-key--back' : ''}${k === 'confirm' ? ' fm-key--confirm' : ''}`}
                    onClick={() => handleKey(k)}
                    aria-label={
                      k === 'back' ? 'Backspace' :
                      k === 'confirm' ? 'Confirm number' :
                      `Digit ${k}`
                    }
                    disabled={k === 'confirm' && !isValid}
                  >
                    {k === 'back'
                      ? <span className="material-symbols-outlined" aria-hidden="true">backspace</span>
                      : k === 'confirm'
                        ? <span className="material-symbols-outlined" aria-hidden="true">check</span>
                        : k}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Primary Action */}
          <button
            type="button"
            className={`fm-continue${isValid ? ' fm-continue--active' : ''}`}
            disabled={!isValid}
            onClick={handleContinue}
            aria-label="Continue to feedback rating"
          >
            <span className="material-symbols-outlined fm-continue-icon" aria-hidden="true">arrow_forward</span>
            Continue
          </button>

          {/* Secondary Action */}
          <button
            type="button"
            className="fm-scan-btn"
            onClick={() => router.push('/feedback/scan')}
            aria-label="Scan boarding pass instead"
          >
            <span className="material-symbols-outlined fm-scan-icon" aria-hidden="true">qr_code_scanner</span>
            Scan Boarding Pass Instead
          </button>
        </div>
      </main>

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
