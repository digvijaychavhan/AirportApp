'use client'

import { useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import '../app/airport-list.css'

/* ── Types ── */
export interface NavItem {
  id: string
  icon: string
  label: string
  route: string
}

export interface ChipItem {
  id: string
  label: string
  icon: string
}

export interface SortOption {
  value: string
  label: string
}

export interface AirportListScreenProps {
  /** Page title shown in centre header */
  title: string
  /** Subtitle shown below title */
  subtitle: string
  /** Placeholder for search input */
  searchPlaceholder: string
  /** Filter chips */
  chips: ChipItem[]
  /** Sort dropdown options */
  sortOptions: SortOption[]
  /** Currently active chip id */
  activeChip: string
  onChipChange: (id: string) => void
  /** Current search query */
  query: string
  onQueryChange: (q: string) => void
  /** Currently active sort value */
  sortValue: string
  onSortChange: (v: string) => void
  /** Results count label e.g. "5 Results Found" */
  resultsLabel: string
  /** Info card text at bottom of list */
  infoText: string
  /** Which nav item id is active */
  activeNavId: string
  /** Nav items */
  navItems?: NavItem[]
  /** The scrollable list content — caller renders cards */
  children: ReactNode
}

const DEFAULT_NAV: NavItem[] = [
  { id: 'flights',  icon: 'flight',       label: 'Flight Info', route: '/flights' },
  { id: 'findway',  icon: 'near_me',      label: 'Find Way',    route: '/wayfinding' },
  { id: 'talkto',   icon: 'headset_mic',  label: 'Talk to Us',  route: '/support' },
  { id: 'feedback', icon: 'rate_review',  label: 'Feedback',    route: '/feedback' },
  { id: 'search',   icon: 'search',       label: 'Search',      route: '/directory' },
]

export function AirportListScreen({
  title,
  subtitle,
  searchPlaceholder,
  chips,
  sortOptions,
  activeChip,
  onChipChange,
  query,
  onQueryChange,
  sortValue,
  onSortChange,
  resultsLabel,
  infoText,
  activeNavId,
  navItems = DEFAULT_NAV,
  children,
}: AirportListScreenProps) {
  const router = useRouter()
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <div className="als-root">

      {/* ── Header ── */}
      <header className="als-header">
        <button
          type="button"
          className="als-back-btn"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>

        <div className="als-header-center">
          <h1 className="als-title">{title}</h1>
          <p className="als-subtitle">{subtitle}</p>
        </div>

        <button type="button" className="als-lang-btn" aria-label="Select language">
          <span className="material-symbols-outlined">language</span>
          EN
          <span className="material-symbols-outlined als-chevron">expand_more</span>
        </button>
      </header>

      {/* ── Search ── */}
      <div className="als-search-wrap">
        <div className="als-search-field">
          <span className="material-symbols-outlined als-search-icon">search</span>
          <input
            type="text"
            className="als-search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            aria-label={searchPlaceholder}
          />
          <button type="button" className="als-filter-btn" aria-label="Filter">
            <span className="material-symbols-outlined">tune</span>
            Filter
            <span className="material-symbols-outlined als-chevron">expand_more</span>
          </button>
        </div>
      </div>

      {/* ── Chips ── */}
      <div className="als-chips-wrap" aria-label="Filter options">
        <div className="als-chips-row" role="group">
          {chips.map(chip => (
            <button
              key={chip.id}
              type="button"
              className={`als-chip${activeChip === chip.id ? ' als-chip--active' : ''}`}
              aria-pressed={activeChip === chip.id}
              onClick={() => onChipChange(chip.id)}
            >
              <span className="material-symbols-outlined">{chip.icon}</span>
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results bar ── */}
      <div className="als-results-bar">
        <span className="als-results-count">{resultsLabel}</span>
        <div className="als-sort-wrap">
          <span className="als-sort-label">Sort By</span>
          <div className="als-sort-dropdown">
            <button
              type="button"
              className="als-sort-btn"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen(v => !v)}
            >
              {sortOptions.find(o => o.value === sortValue)?.label}
              <span className="material-symbols-outlined als-chevron">expand_more</span>
            </button>
            {sortOpen && (
              <ul className="als-sort-menu" role="listbox" aria-label="Sort options">
                {sortOptions.map(opt => (
                  <li key={opt.value} role="option" aria-selected={sortValue === opt.value}>
                    <button
                      type="button"
                      onClick={() => { onSortChange(opt.value); setSortOpen(false) }}
                    >
                      {sortValue === opt.value && (
                        <span className="material-symbols-outlined">check</span>
                      )}
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── List ── */}
      <main className="als-list" id="main-content">
        {children}

        {/* Info card */}
        <div className="als-info-card" role="note">
          <span className="material-symbols-outlined als-info-icon">info</span>
          <p className="als-info-text">{infoText}</p>
        </div>
      </main>

      {/* ── Bottom nav ── */}
      <nav className="als-nav" aria-label="Main navigation">
        {navItems.map(item => (
          <button
            key={item.id}
            type="button"
            className={`als-nav-item${item.id === activeNavId ? ' als-nav-item--active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === activeNavId ? 'page' : undefined}
            onClick={() => router.push(item.route)}
          >
            <span className={`als-nav-icon-wrap${item.id === activeNavId ? ' als-nav-icon-wrap--active' : ''}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </span>
            <span className="als-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
