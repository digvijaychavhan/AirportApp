'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function FeedbackIdentify() {
  const router = useRouter()

  return (
    <div className="fi">
      {/* ── Top App Bar ── */}
      <header className="fi-bar" role="banner">
        <button
          type="button"
          className="fi-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>

        <div className="fi-bar-titles">
          <h1 className="fi-bar-title">Feedback</h1>
          <span className="fi-bar-subtitle">Help us improve your airport experience</span>
        </div>

        <button type="button" className="fi-lang-btn" aria-label="Select language">
          <span className="fi-lang-text">EN</span>
          <span className="material-symbols-outlined fi-lang-arrow" aria-hidden="true">expand_more</span>
        </button>
      </header>

      {/* ── Page Header ── */}
      <section className="fi-page-header" aria-labelledby="fi-page-title">
        <h2 id="fi-page-title" className="fi-page-title">Feedback</h2>
        <p className="fi-page-sub">
          To begin, please identify yourself using one of the following methods.
        </p>
      </section>

      {/* ── Main Content ── */}
      <main className="fi-main">

        {/* Card 1 — Mobile Number */}
        <article className="fi-card" aria-labelledby="fi-mobile-title">
          <div className="fi-card-illus" aria-hidden="true">
            <Image
              src="/illus-mobile.png"
              alt=""
              width={120}
              height={120}
              className="fi-illus-img"
              priority
            />
          </div>

          <div className="fi-card-body">
            <h3 id="fi-mobile-title" className="fi-card-title">Enter Mobile Number</h3>
            <p className="fi-card-desc">
              Use your registered mobile number to continue with the feedback process.
            </p>
          </div>

          <button
            type="button"
            className="fi-card-btn fi-card-btn--outline"
            aria-label="Continue with mobile number"
            onClick={() => router.push('/feedback/mobile')}
          >
            Continue
          </button>
        </article>

        {/* Divider — OR */}
        <div className="fi-divider" role="separator" aria-label="or">
          <span className="fi-divider-line" aria-hidden="true" />
          <span className="fi-divider-text">OR</span>
          <span className="fi-divider-line" aria-hidden="true" />
        </div>

        {/* Card 2 — Boarding Pass */}
        <article className="fi-card" aria-labelledby="fi-scan-title">
          <div className="fi-card-illus" aria-hidden="true">
            <Image
              src="/illus-boarding.png"
              alt=""
              width={120}
              height={120}
              className="fi-illus-img"
            />
          </div>

          <div className="fi-card-body">
            <h3 id="fi-scan-title" className="fi-card-title">Scan Boarding Pass</h3>
            <p className="fi-card-desc">
              Scan your boarding pass for faster identification.
            </p>
          </div>

          <button
            type="button"
            className="fi-card-btn fi-card-btn--outline"
            aria-label="Scan boarding pass"
            onClick={() => router.push('/feedback/scan')}
          >
            Scan Now
          </button>
        </article>

        {/* Info Card */}
        <aside className="fi-info-card" role="note">
          <span className="material-symbols-outlined fi-info-icon" aria-hidden="true">
            info
          </span>
          <p className="fi-info-text">
            Your personal information is used only to associate your feedback with your airport journey.
          </p>
        </aside>
      </main>

      {/* ── Bottom Navigation ── */}
      <nav className="fi-nav" aria-label="Main navigation">
        <button
          type="button"
          className="fi-nav-item"
          aria-label="Flight Info"
          onClick={() => router.push('/flights')}
        >
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">flight</span>
          <span className="fi-nav-label">Flight Info</span>
        </button>

        <button
          type="button"
          className="fi-nav-item"
          aria-label="Find Way"
          onClick={() => router.push('/navigation')}
        >
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">map</span>
          <span className="fi-nav-label">Find Way</span>
        </button>

        <button
          type="button"
          className="fi-nav-item"
          aria-label="Talk to Us"
          onClick={() => router.push('/support')}
        >
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">headset_mic</span>
          <span className="fi-nav-label">Talk to Us</span>
        </button>

        <button
          type="button"
          className="fi-nav-item fi-nav-item--active"
          aria-label="Feedback — current page"
          aria-current="page"
          onClick={() => router.push('/feedback')}
        >
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">rate_review</span>
          <span className="fi-nav-label">Feedback</span>
        </button>

        <button
          type="button"
          className="fi-nav-item"
          aria-label="Search"
          onClick={() => router.push('/directory')}
        >
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">search</span>
          <span className="fi-nav-label">Search</span>
        </button>
      </nav>
    </div>
  )
}
