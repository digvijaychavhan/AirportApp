'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type AccessMode = 'elevator' | 'escalator'

const OPTIONS: {
  id: AccessMode
  name: string
  desc: string
  icon: string
  variant?: 'purple'
  tags: { icon: string; label: string; tone?: 'success' | 'warning' }[]
}[] = [
  {
    id: 'elevator',
    name: 'Elevator',
    desc: 'Step-free access. Best for luggage, strollers, and reduced mobility.',
    icon: 'elevator',
    tags: [
      { icon: 'accessible', label: 'Step-free', tone: 'success' },
      { icon: 'luggage', label: 'Fits luggage', tone: 'success' },
    ],
  },
  {
    id: 'escalator',
    name: 'Escalator',
    desc: 'Fastest moving route between levels for travelers on foot.',
    icon: 'escalator',
    variant: 'purple',
    tags: [
      { icon: 'bolt', label: 'Fastest route', tone: 'success' },
      { icon: 'no_luggage', label: 'Hold items firmly', tone: 'warning' },
    ],
  },
]

function useClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    update()
    const id = setInterval(update, 1000 * 15)
    return () => clearInterval(id)
  }, [])
  return time
}

export function AccessSelection() {
  const router = useRouter()
  const [selected, setSelected] = useState<AccessMode | null>(null)
  const time = useClock()
  const continueRef = useRef<HTMLElement | null>(null)

  function choose(mode: AccessMode) {
    setSelected(mode)
  }

  function onContinue() {
    if (!selected) return
    router.push(`/map?mode=${selected}`)
  }

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
              Self-service navigation
            </span>
          </span>
        </div>
        <div className="kiosk-clock md-typescale-title-medium" aria-hidden="true">
          <md-icon>schedule</md-icon>
          {time || '--:--'}
        </div>
      </header>

      <nav className="kiosk-steps md-typescale-label-large" aria-label="Progress">
        <span className="kiosk-step is-active">
          <span className="kiosk-step-dot">1</span>
          <span className="kiosk-step-label">Choose access</span>
        </span>
        <span className="kiosk-step-bar" />
        <span className="kiosk-step">
          <span className="kiosk-step-dot">2</span>
          <span className="kiosk-step-label">View map</span>
        </span>
        <span className="kiosk-step-bar" />
        <span className="kiosk-step">
          <span className="kiosk-step-dot">3</span>
          <span className="kiosk-step-label">Start walking</span>
        </span>
      </nav>

      <main className="kiosk-main">
        <div className="kiosk-heading">
          <p className="kiosk-eyebrow md-typescale-label-large">
            <md-icon>swap_vert</md-icon>
            Getting to your gate
          </p>
          <h1 className="kiosk-title md-typescale-display-small">
            How would you like to change levels?
          </h1>
          <p className="kiosk-subtitle md-typescale-body-large">
            Pick the option that suits you best. You can change this anytime
            during navigation.
          </p>
        </div>

        <div
          className="kiosk-options"
          role="radiogroup"
          aria-label="Choose elevator or escalator"
        >
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`option-card${
                  opt.variant ? ` variant-${opt.variant}` : ''
                }${isSelected ? ' is-selected' : ''}`}
                onClick={() => choose(opt.id)}
              >
                <md-ripple />
                <span className="option-check" aria-hidden="true">
                  <md-icon>check</md-icon>
                </span>
                <span className="option-icon" aria-hidden="true">
                  <md-icon>{opt.icon}</md-icon>
                </span>
                <span className="option-body">
                  <span className="option-name md-typescale-headline-medium">
                    {opt.name}
                  </span>
                  <span className="option-desc md-typescale-body-large">
                    {opt.desc}
                  </span>
                </span>
                <span className="option-tags">
                  {opt.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`option-tag md-typescale-label-large${
                        tag.tone ? ` tag-${tag.tone}` : ''
                      }`}
                    >
                      <md-icon>{tag.icon}</md-icon>
                      {tag.label}
                    </span>
                  ))}
                </span>
              </button>
            )
          })}
        </div>
      </main>

      <footer className="kiosk-actions">
        <md-outlined-button onClick={() => router.push('/')}>
          <md-icon slot="icon">arrow_back</md-icon>
          Back
        </md-outlined-button>
        <span className="kiosk-hint md-typescale-body-medium" aria-live="polite">
          {selected ? (
            <>
              <md-icon>check_circle</md-icon>
              {selected === 'elevator' ? 'Elevator' : 'Escalator'} selected
            </>
          ) : (
            <>
              <md-icon>touch_app</md-icon>
              Tap an option to continue
            </>
          )}
        </span>
        <span className="spacer" />
        <md-filled-button
          ref={continueRef}
          onClick={onContinue}
          disabled={!selected}
          trailing-icon
        >
          Continue to map
          <md-icon slot="icon">arrow_forward</md-icon>
        </md-filled-button>
      </footer>
    </div>
  )
}
