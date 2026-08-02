'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import '../app/directory.css'

/* ── Data types ── */
type Status = 'open' | 'closed' | 'soon'
type SortKey = 'distance' | 'name' | 'floor'

interface Facility {
  id: string
  name: string
  type: string
  category: string
  floor: number
  floorLabel: string
  distanceM: number
  status: Status
  closesAt?: string
  opensAt?: string
  icon: string
  stripeColor: string
  iconBg: string
  iconColor: string
  tags: { icon: string; label: string }[]
  featured?: boolean
}

/* ── Category config ── */
interface CategoryConfig {
  id: string
  icon: string
  label: string
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'all',      icon: 'apps',             label: 'All' },
  { id: 'dining',   icon: 'restaurant',       label: 'Dining' },
  { id: 'shopping', icon: 'shopping_bag',     label: 'Shopping' },
  { id: 'lounge',   icon: 'hotel',            label: 'Lounges' },
  { id: 'services', icon: 'miscellaneous_services', label: 'Services' },
  { id: 'medical',  icon: 'medical_services', label: 'Medical' },
  { id: 'finance',  icon: 'local_atm',        label: 'Finance' },
  { id: 'wifi',     icon: 'wifi',             label: 'Wi-Fi' },
]

/* ── Mock facilities data ── */
const FACILITIES: Facility[] = [
  {
    id: 'f1',
    name: 'Oberoi Skybar & Kitchen',
    type: 'Full-service restaurant',
    category: 'dining',
    floor: 2, floorLabel: 'Level 2 — Departures',
    distanceM: 120,
    status: 'open', closesAt: '23:30',
    icon: 'restaurant',
    stripeColor: '#f59e0b',
    iconBg: '#fef3c7', iconColor: '#b45309',
    tags: [{ icon: 'star', label: '4.6' }, { icon: 'schedule', label: 'Closes 23:30' }],
    featured: true,
  },
  {
    id: 'f2',
    name: 'Costa Coffee',
    type: 'Café · Beverages',
    category: 'dining',
    floor: 2, floorLabel: 'Level 2 — Departures',
    distanceM: 60,
    status: 'open', closesAt: '22:00',
    icon: 'local_cafe',
    stripeColor: '#92400e',
    iconBg: '#fef3c7', iconColor: '#92400e',
    tags: [{ icon: 'star', label: '4.3' }, { icon: 'wifi', label: 'Free Wi-Fi' }],
  },
  {
    id: 'f3',
    name: 'Burger King Express',
    type: 'Fast food',
    category: 'dining',
    floor: 1, floorLabel: 'Level 1 — Arrivals',
    distanceM: 310,
    status: 'open', closesAt: '02:00',
    icon: 'fastfood',
    stripeColor: '#dc2626',
    iconBg: '#fee2e2', iconColor: '#dc2626',
    tags: [{ icon: 'star', label: '3.9' }],
  },
  {
    id: 'f4',
    name: 'IndiGo Passenger Lounge',
    type: 'Airline lounge',
    category: 'lounge',
    floor: 3, floorLabel: 'Level 3 — Lounges',
    distanceM: 95,
    status: 'open', closesAt: '22:30',
    icon: 'airline_seat_flat',
    stripeColor: '#2563eb',
    iconBg: '#dbe6ff', iconColor: '#2563eb',
    tags: [{ icon: 'wifi', label: 'Wi-Fi' }, { icon: 'restaurant', label: 'Dining' }, { icon: 'star', label: '4.7' }],
    featured: true,
  },
  {
    id: 'f5',
    name: 'Air India Gold Lounge',
    type: 'Airline lounge',
    category: 'lounge',
    floor: 3, floorLabel: 'Level 3 — Lounges',
    distanceM: 130,
    status: 'soon', opensAt: '08:00',
    icon: 'weekend',
    stripeColor: '#7c3aed',
    iconBg: '#ece0ff', iconColor: '#7c3aed',
    tags: [{ icon: 'star', label: '4.5' }, { icon: 'schedule', label: 'Opens 08:00' }],
  },
  {
    id: 'f6',
    name: 'DFS Duty Free',
    type: 'Duty-free shopping',
    category: 'shopping',
    floor: 2, floorLabel: 'Level 2 — Departures',
    distanceM: 180,
    status: 'open', closesAt: '23:00',
    icon: 'local_mall',
    stripeColor: '#16a34a',
    iconBg: '#d3f5df', iconColor: '#16a34a',
    tags: [{ icon: 'sell', label: 'Duty Free' }, { icon: 'star', label: '4.4' }],
    featured: true,
  },
  {
    id: 'f7',
    name: 'Crossword Bookstore',
    type: 'Books & Stationery',
    category: 'shopping',
    floor: 2, floorLabel: 'Level 2 — Departures',
    distanceM: 215,
    status: 'open', closesAt: '21:00',
    icon: 'menu_book',
    stripeColor: '#0891b2',
    iconBg: '#cffafe', iconColor: '#0891b2',
    tags: [{ icon: 'star', label: '4.2' }],
  },
  {
    id: 'f8',
    name: 'SBI ATM',
    type: 'ATM · Bank',
    category: 'finance',
    floor: 1, floorLabel: 'Level 1 — Arrivals',
    distanceM: 85,
    status: 'open',
    icon: 'local_atm',
    stripeColor: '#1d4ed8',
    iconBg: '#dbe6ff', iconColor: '#1d4ed8',
    tags: [{ icon: 'currency_rupee', label: 'INR' }, { icon: 'currency_exchange', label: 'Forex' }],
  },
  {
    id: 'f9',
    name: 'Thomas Cook Forex',
    type: 'Currency exchange',
    category: 'finance',
    floor: 1, floorLabel: 'Level 1 — Arrivals',
    distanceM: 145,
    status: 'open', closesAt: '22:00',
    icon: 'currency_exchange',
    stripeColor: '#0369a1',
    iconBg: '#e0f2fe', iconColor: '#0369a1',
    tags: [{ icon: 'star', label: '4.1' }],
  },
  {
    id: 'f10',
    name: 'Airport Medical Centre',
    type: 'First aid · Pharmacy',
    category: 'medical',
    floor: 1, floorLabel: 'Level 1 — Arrivals',
    distanceM: 200,
    status: 'open',
    icon: 'local_hospital',
    stripeColor: '#dc2626',
    iconBg: '#fee2e2', iconColor: '#dc2626',
    tags: [{ icon: 'emergency', label: '24 hrs' }],
  },
  {
    id: 'f11',
    name: 'Airtel Wi-Fi Zone',
    type: 'Free Wi-Fi hotspot',
    category: 'wifi',
    floor: 2, floorLabel: 'Level 2 — Departures',
    distanceM: 40,
    status: 'open',
    icon: 'wifi',
    stripeColor: '#7c3aed',
    iconBg: '#ece0ff', iconColor: '#7c3aed',
    tags: [{ icon: 'bolt', label: 'High-speed' }, { icon: 'lock_open', label: 'Free' }],
  },
  {
    id: 'f12',
    name: 'Baggage Wrap Services',
    type: 'Luggage wrapping',
    category: 'services',
    floor: 1, floorLabel: 'Level 1 — Departures Check-in',
    distanceM: 270,
    status: 'closed', opensAt: '06:00',
    icon: 'luggage',
    stripeColor: '#64748b',
    iconBg: '#f1f5f9', iconColor: '#64748b',
    tags: [{ icon: 'schedule', label: 'Opens 06:00' }],
  },
]

const NAV_ITEMS = [
  { id: 'home',      icon: 'home',         label: 'Home',       route: '/' },
  { id: 'flights',   icon: 'flight',       label: 'Flight Info', route: '/flights' },
  { id: 'map',       icon: 'map',          label: 'Find Way',   route: '/wayfinding' },
  { id: 'directory', icon: 'apps',         label: 'Directory',  route: '/directory' },
  { id: 'support',   icon: 'headset_mic',  label: 'Talk to Us', route: '/support' },
]

const CATEGORY_ICONS: Record<string, string> = {
  dining:   'restaurant',
  shopping: 'shopping_bag',
  lounge:   'hotel',
  services: 'miscellaneous_services',
  medical:  'medical_services',
  finance:  'local_atm',
  wifi:     'wifi',
  all:      'apps',
}

function statusLabel(f: Facility) {
  if (f.status === 'open')   return f.closesAt ? `Open · Closes ${f.closesAt}` : 'Open'
  if (f.status === 'soon')   return f.opensAt  ? `Opens ${f.opensAt}` : 'Opening soon'
  return f.opensAt ? `Closed · Opens ${f.opensAt}` : 'Closed'
}

function StatusBadge({ facility }: { facility: Facility }) {
  return (
    <span className={`directory-status ${facility.status}`} role="status">
      <md-icon>
        {facility.status === 'open' ? 'check_circle' : facility.status === 'soon' ? 'schedule' : 'cancel'}
      </md-icon>
      {statusLabel(facility)}
    </span>
  )
}

export function DirectoryList() {
  const router = useRouter()
  const params = useSearchParams()
  const initCat = params.get('category') ?? 'all'

  const [activeCategory, setActiveCategory] = useState(initCat)
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('distance')

  const filtered = useMemo(() => {
    let list = FACILITIES
    if (activeCategory !== 'all') list = list.filter(f => f.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.type.toLowerCase().includes(q) ||
        f.floorLabel.toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'distance') return a.distanceM - b.distanceM
      if (sortKey === 'name')     return a.name.localeCompare(b.name)
      return a.floor - b.floor
    })
  }, [activeCategory, query, sortKey])

  /* Group by floor for display */
  const grouped = useMemo(() => {
    const map = new Map<string, Facility[]>()
    for (const f of filtered) {
      const key = f.floorLabel
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(f)
    }
    return map
  }, [filtered])

  const cycleSortKey = () => {
    setSortKey(k => k === 'distance' ? 'name' : k === 'name' ? 'floor' : 'distance')
  }

  const activeCatConfig = CATEGORIES.find(c => c.id === activeCategory)!

  return (
    <div className="directory">

      {/* Top App Bar */}
      <header className="directory-bar" role="banner">
        <button
          type="button"
          className="directory-bar-back"
          aria-label="Back to home"
          onClick={() => router.back()}
        >
          <md-icon>arrow_back</md-icon>
        </button>
        <h1 className="directory-bar-title md-typescale-title-large">
          {activeCategory === 'all' ? 'Directory' : activeCatConfig.label}
        </h1>
        <span className="directory-bar-count md-typescale-label-large" aria-label={`${filtered.length} results`}>
          {filtered.length}
        </span>
      </header>

      {/* Search */}
      <div className="directory-search-wrap">
        <label
          htmlFor="directory-search"
          className="directory-search-field"
          style={{ cursor: 'text' }}
        >
          <md-icon aria-hidden="true">search</md-icon>
          <input
            id="directory-search"
            type="text"
            className="directory-search-input md-typescale-body-large"
            placeholder="Search restaurants, lounges, shops…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            aria-label="Search facilities"
          />
          {query && (
            <button
              type="button"
              className="directory-search-clear"
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              <md-icon>close</md-icon>
            </button>
          )}
        </label>
      </div>

      {/* Category filter chips */}
      <div className="directory-filters" aria-label="Filter by category">
        <div className="directory-filters-row" role="group">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`directory-filter-chip md-typescale-label-large${activeCategory === cat.id ? ' is-active' : ''}`}
              aria-pressed={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              <md-icon>{cat.icon}</md-icon>
              {cat.label}
            </button>
          ))}
          <button
            type="button"
            className="directory-sort-btn md-typescale-label-medium"
            onClick={cycleSortKey}
            aria-label={`Sort by: ${sortKey}`}
          >
            <md-icon>swap_vert</md-icon>
            {sortKey === 'distance' ? 'Nearest' : sortKey === 'name' ? 'A–Z' : 'Floor'}
          </button>
        </div>
      </div>

      {/* Results summary */}
      <div className="directory-results-bar">
        <span className="directory-results-count md-typescale-body-small">
          {filtered.length} {filtered.length === 1 ? 'place' : 'places'} found
        </span>
        <span className="directory-results-sort md-typescale-label-small">
          Sorted by {sortKey === 'distance' ? 'distance' : sortKey === 'name' ? 'name' : 'floor'}
        </span>
      </div>

      {/* Body */}
      <main className="directory-body" id="main-content">

        {/* Category hero */}
        {activeCategory !== 'all' && (
          <div className="directory-hero" aria-hidden="true">
            <div className="directory-hero-icon">
              <md-icon>{activeCatConfig.icon}</md-icon>
            </div>
            <div className="directory-hero-text">
              <h2 className="md-typescale-title-large">{activeCatConfig.label}</h2>
              <p className="md-typescale-body-medium">
                {filtered.length} {filtered.length === 1 ? 'location' : 'locations'} in this terminal
              </p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="directory-empty" role="status">
            <div className="directory-empty-icon">
              <md-icon>search_off</md-icon>
            </div>
            <h3 className="md-typescale-title-large">No results found</h3>
            <p className="md-typescale-body-large">
              Try a different search term or select another category.
            </p>
            <md-filled-tonal-button onClick={() => { setQuery(''); setActiveCategory('all') }}>
              <md-icon slot="icon">refresh</md-icon>
              Clear filters
            </md-filled-tonal-button>
          </div>
        )}

        {/* Grouped results */}
        {Array.from(grouped.entries()).map(([floorLabel, items]) => (
          <section key={floorLabel} aria-label={floorLabel}>
            <div className="directory-floor-heading">
              <span className="directory-floor-badge" aria-hidden="true">
                {items[0].floor}
              </span>
              <span className="directory-floor-label md-typescale-label-large">
                {floorLabel}
              </span>
            </div>

            {items.map(facility => (
              <button
                key={facility.id}
                type="button"
                className={`directory-card${facility.featured ? ' is-featured' : ''}`}
                aria-label={`${facility.name} — ${facility.type} — ${statusLabel(facility)} — ${facility.distanceM}m away`}
                onClick={() => router.push(`/directory/${facility.id}`)}
              >
                {/* Featured badge */}
                {facility.featured && (
                  <span className="directory-featured-badge" aria-hidden="true">
                    <md-icon>star</md-icon>
                    Featured
                  </span>
                )}

                {/* Accent stripe */}
                <span
                  className="directory-card-stripe"
                  style={{ '--stripe-color': facility.stripeColor } as React.CSSProperties}
                  aria-hidden="true"
                />

                {/* Icon tile */}
                <span
                  className="directory-card-icon"
                  style={{ background: facility.iconBg, color: facility.iconColor }}
                  aria-hidden="true"
                >
                  <md-icon>{facility.icon}</md-icon>
                </span>

                {/* Content */}
                <span className="directory-card-content">
                  <span className="directory-card-name">{facility.name}</span>
                  <span className="directory-card-meta">
                    <span className="directory-card-type md-typescale-body-small">{facility.type}</span>
                    <StatusBadge facility={facility} />
                  </span>
                  {facility.tags.length > 0 && (
                    <span className="directory-card-tags" aria-hidden="true">
                      {facility.tags.map(tag => (
                        <span key={tag.label} className="directory-card-tag">
                          <md-icon>{tag.icon}</md-icon>
                          {tag.label}
                        </span>
                      ))}
                    </span>
                  )}
                </span>

                {/* Right side */}
                <span className="directory-card-right">
                  <span className="directory-card-distance" aria-hidden="true">
                    <md-icon>near_me</md-icon>
                    {facility.distanceM}m
                  </span>
                  <span className="directory-card-arrow" aria-hidden="true">
                    <md-icon>chevron_right</md-icon>
                  </span>
                </span>
              </button>
            ))}
          </section>
        ))}
      </main>

      {/* Bottom navigation */}
      <nav className="directory-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            type="button"
            className={`directory-nav-item${item.id === 'directory' ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'directory' ? 'page' : undefined}
            onClick={() => router.push(item.route)}
          >
            <span className="directory-nav-indicator" aria-hidden="true">
              <md-icon>{item.icon}</md-icon>
            </span>
            <span className="directory-nav-label md-typescale-label-small">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
