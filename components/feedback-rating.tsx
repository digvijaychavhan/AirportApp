'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { id: 'cleanliness', icon: 'cleaning_services', label: 'Cleanliness' },
  { id: 'staff',       icon: 'support_agent',     label: 'Staff Helpfulness' },
  { id: 'navigation',  icon: 'signpost',           label: 'Navigation & Signage' },
  { id: 'facilities',  icon: 'chair',              label: 'Facilities & Amenities' },
  { id: 'security',    icon: 'security',           label: 'Security Process' },
  { id: 'overall',     icon: 'star',               label: 'Overall Experience' },
]

const EMOJIS: { value: number; icon: string; label: string }[] = [
  { value: 1, icon: 'sentiment_very_dissatisfied', label: 'Very Poor' },
  { value: 2, icon: 'sentiment_dissatisfied',      label: 'Poor' },
  { value: 3, icon: 'sentiment_neutral',           label: 'Neutral' },
  { value: 4, icon: 'sentiment_satisfied',         label: 'Good' },
  { value: 5, icon: 'sentiment_very_satisfied',    label: 'Excellent' },
]

type Ratings = Record<string, number>

export function FeedbackRating() {
  const router = useRouter()
  const [ratings, setRatings] = useState<Ratings>({})
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const allRated = CATEGORIES.every(c => ratings[c.id] !== undefined)
  const ratedCount = Object.keys(ratings).length

  function handleRate(categoryId: string, value: number) {
    setRatings(prev => ({ ...prev, [categoryId]: value }))
  }

  function handleSubmit() {
    if (!allRated) return
    setSubmitted(true)
    setTimeout(() => router.push('/thank-you'), 1800)
  }

  return (
    <div className="fr">
      {/* Top App Bar */}
      <header className="fr-bar" role="banner">
        <button
          type="button"
          className="fr-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>
        <div className="fr-bar-titles">
          <h1 className="fr-bar-title">Feedback</h1>
          <span className="fr-bar-subtitle">Rate Your Experience</span>
        </div>
        <button type="button" className="fr-lang-btn" aria-label="Select language">
          <span className="fr-lang-text">EN</span>
          <span className="material-symbols-outlined fr-lang-arrow" aria-hidden="true">expand_more</span>
        </button>
      </header>

      {/* Progress indicator */}
      <div className="fr-progress-wrap" role="status" aria-label={`${ratedCount} of ${CATEGORIES.length} categories rated`}>
        <div className="fr-progress-bar">
          <div
            className="fr-progress-fill"
            style={{ width: `${(ratedCount / CATEGORIES.length) * 100}%` }}
          />
        </div>
        <span className="fr-progress-label">{ratedCount}/{CATEGORIES.length} rated</span>
      </div>

      {/* Main */}
      <main className="fr-main">
        <div className="fr-card">
          <h2 className="fr-heading">How was your airport experience?</h2>
          <p className="fr-subtext">
            Rate each category to help us serve you better. All fields are required.
          </p>

          {/* Category Ratings */}
          <div className="fr-categories" role="group" aria-label="Rating categories">
            {CATEGORIES.map((cat, i) => {
              const currentRating = ratings[cat.id]
              return (
                <div
                  key={cat.id}
                  className={`fr-category${currentRating ? ' fr-category--rated' : ''}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="fr-cat-header">
                    <div className="fr-cat-icon-wrap" aria-hidden="true">
                      <span className="material-symbols-outlined fr-cat-icon">{cat.icon}</span>
                    </div>
                    <span className="fr-cat-label">{cat.label}</span>
                    {currentRating && (
                      <span className="fr-cat-rating-badge" aria-label={`Rated: ${EMOJIS[currentRating - 1].label}`}>
                        {EMOJIS[currentRating - 1].label}
                      </span>
                    )}
                  </div>

                  <div className="fr-emoji-row" role="radiogroup" aria-label={`Rate ${cat.label}`}>
                    {EMOJIS.map(e => (
                      <button
                        key={e.value}
                        type="button"
                        role="radio"
                        aria-checked={currentRating === e.value}
                        aria-label={e.label}
                        className={`fr-emoji-btn${currentRating === e.value ? ' fr-emoji-btn--active' : ''}`}
                        onClick={() => handleRate(cat.id, e.value)}
                      >
                        <span
                          className="material-symbols-outlined fr-emoji-icon"
                          aria-hidden="true"
                        >
                          {e.icon}
                        </span>
                        <span className="fr-emoji-label">{e.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Optional Comment */}
          <div className="fr-comment-wrap">
            <label htmlFor="fr-comment" className="fr-comment-label">
              <span className="material-symbols-outlined fr-comment-icon" aria-hidden="true">edit_note</span>
              Additional Comments <span className="fr-comment-optional">(Optional)</span>
            </label>
            <textarea
              id="fr-comment"
              className="fr-comment"
              placeholder="Share any additional thoughts about your experience..."
              rows={3}
              maxLength={300}
              value={comment}
              onChange={e => setComment(e.target.value)}
              aria-describedby="fr-comment-count"
            />
            <span id="fr-comment-count" className="fr-comment-count">{comment.length}/300</span>
          </div>

          {/* Submit */}
          <button
            type="button"
            className={`fr-submit${allRated ? ' fr-submit--active' : ''}${submitted ? ' fr-submit--submitted' : ''}`}
            disabled={!allRated || submitted}
            onClick={handleSubmit}
            aria-label={allRated ? 'Submit feedback' : `Rate all ${CATEGORIES.length} categories to submit`}
          >
            {submitted ? (
              <>
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
                Submitted!
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" aria-hidden="true">send</span>
                Submit Feedback
              </>
            )}
          </button>

          {!allRated && (
            <p className="fr-submit-hint" role="note">
              <span className="material-symbols-outlined fr-hint-icon" aria-hidden="true">info</span>
              Please rate all {CATEGORIES.length} categories to continue.
            </p>
          )}
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
        <button type="button" className="fi-nav-item" aria-label="Search" onClick={() => router.push('/directory')}>
          <span className="material-symbols-outlined fi-nav-icon" aria-hidden="true">search</span>
          <span className="fi-nav-label">Search</span>
        </button>
      </nav>
    </div>
  )
}
