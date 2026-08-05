'use client'

import { ReactNode } from 'react'
// CSS is imported by the parent screen via airport-list.css

export interface AirportItemCardProps {
  id: string
  name: string
  image: string
  imageAlt: string
  /** Pill badge next to name — pass null to hide */
  badge?: { label: string; variant?: 'default' | 'green' | 'amber' | 'purple' | 'teal' | 'red' } | null
  description: string
  isOpen: boolean
  hours: string
  /** Primary location line e.g. "Terminal 3 · Level 2" */
  locationPrimary: string
  /** Optional secondary line e.g. "Near Gate 24" */
  locationSecondary?: string
  distanceM: number
  /** Extra content between description and meta (e.g. access tags) */
  extraContent?: ReactNode
  onClick: () => void
}

export function AirportItemCard({
  name,
  image,
  imageAlt,
  badge,
  description,
  isOpen,
  hours,
  locationPrimary,
  locationSecondary,
  distanceM,
  extraContent,
  onClick,
}: AirportItemCardProps) {
  const badgeVariant = badge?.variant ?? 'default'
  const badgeClass = badgeVariant === 'default' ? 'als-badge' : `als-badge als-badge--${badgeVariant}`

  return (
    <button
      type="button"
      className="als-card"
      aria-label={`${name}${badge ? ` — ${badge.label}` : ''} — ${distanceM}m away`}
      onClick={onClick}
    >
      {/* Photo */}
      <div className="als-card-photo">
        <img src={image} alt={imageAlt} className="als-card-img" />
      </div>

      {/* Details */}
      <div className="als-card-details">
        <div className="als-card-top">
          <h2 className="als-card-name">{name}</h2>
          {badge && (
            <span className={badgeClass}>{badge.label}</span>
          )}
        </div>

        <p className="als-card-desc">{description}</p>

        {extraContent}

        <div className="als-card-meta">
          <span className={`als-open-badge${isOpen ? '' : ' als-open-badge--closed'}`}>
            <span className="als-open-dot" />
            {isOpen ? 'Open' : 'Closed'}
          </span>
          <span className="als-card-hours">
            <span className="material-symbols-outlined">schedule</span>
            {hours}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="als-card-location">
        <div className="als-card-loc-top">
          <span className="material-symbols-outlined als-loc-icon">location_on</span>
          <div className="als-card-loc-text">
            <span className="als-loc-primary">{locationPrimary}</span>
            {locationSecondary && (
              <span className="als-loc-secondary">{locationSecondary}</span>
            )}
          </div>
        </div>
        <span className="als-card-distance">{distanceM} m away</span>
      </div>

      {/* Arrow */}
      <div className="als-card-action">
        <button
          type="button"
          className="als-arrow-btn"
          aria-label={`Navigate to ${name}`}
          tabIndex={-1}
          onClick={e => { e.stopPropagation(); onClick() }}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </button>
  )
}
