'use client'

import { useState, useMemo } from 'react'
import { AirportListScreen } from './airport-list-screen'

/* ── Types ── */
interface Amenity {
  id: string
  emoji: string
  name: string
  description: string
  category: string
  iconColor: string
  terminal: string
  nearestLocation: string
  walkingDistance: string
  availability: string
  availabilityVariant: 'green' | 'amber'
  floor: string
}

/* ── Data ── */
const AMENITIES: Amenity[] = [
  {
    id: 'restrooms',
    emoji: '🚻',
    name: 'Restrooms',
    description: 'Locate the nearest washroom and accessible facilities.',
    category: 'facilities',
    iconColor: 'blue',
    terminal: 'Terminal 3',
    nearestLocation: 'Near Gate 21, Level 3',
    walkingDistance: '2 min walk · ~120 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'baby-care',
    emoji: '🍼',
    name: 'Baby Care Room',
    description: 'Private nursing and baby changing rooms.',
    category: 'family',
    iconColor: 'rose',
    terminal: 'Terminal 3',
    nearestLocation: 'Near Gate 28, Level 3',
    walkingDistance: '4 min walk · ~230 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'prayer-room',
    emoji: '🙏',
    name: 'Prayer Room',
    description: 'Dedicated prayer and meditation rooms.',
    category: 'services',
    iconColor: 'amber',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 4, Landside Wing',
    walkingDistance: '6 min walk · ~350 m',
    availability: 'Open 05:00 – 23:00',
    availabilityVariant: 'green',
    floor: 'Level 4',
  },
  {
    id: 'smoking-lounge',
    emoji: '🚬',
    name: 'Smoking Lounge',
    description: 'Designated smoking areas inside the terminal.',
    category: 'facilities',
    iconColor: 'orange',
    terminal: 'Terminal 3',
    nearestLocation: 'Gate 36 Airside, Level 4',
    walkingDistance: '8 min walk · ~500 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 4',
  },
  {
    id: 'accessible',
    emoji: '♿',
    name: 'Accessible Services',
    description: 'Wheelchair assistance and accessible facilities.',
    category: 'accessibility',
    iconColor: 'blue',
    terminal: 'All Terminals',
    nearestLocation: 'Info Desk, Level 3 Arrivals',
    walkingDistance: '3 min walk · ~180 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'water-refill',
    emoji: '💧',
    name: 'Water Refill Station',
    description: 'Free drinking water refill stations.',
    category: 'facilities',
    iconColor: 'cyan',
    terminal: 'Terminal 3',
    nearestLocation: 'Post-Security, Gate 22',
    walkingDistance: '2 min walk · ~110 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'charging',
    emoji: '🔌',
    name: 'Charging Station',
    description: 'Phone, laptop and device charging points.',
    category: 'connectivity',
    iconColor: 'indigo',
    terminal: 'Terminal 3',
    nearestLocation: 'Seating Zone B, Level 3',
    walkingDistance: '3 min walk · ~160 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'wifi',
    emoji: '📶',
    name: 'Free Wi-Fi',
    description: 'Internet connection and Wi-Fi setup instructions.',
    category: 'connectivity',
    iconColor: 'sky',
    terminal: 'All Terminals',
    nearestLocation: 'Available airport-wide',
    walkingDistance: 'Available everywhere',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'All Floors',
  },
  {
    id: 'atm',
    emoji: '🏧',
    name: 'ATM',
    description: 'Locate nearby ATMs and banking services.',
    category: 'services',
    iconColor: 'green',
    terminal: 'Terminal 3',
    nearestLocation: 'Pre-Security, Level 3',
    walkingDistance: '4 min walk · ~200 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'currency',
    emoji: '💱',
    name: 'Currency Exchange',
    description: 'Foreign exchange and currency conversion counters.',
    category: 'services',
    iconColor: 'teal',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 3, Departure Hall',
    walkingDistance: '5 min walk · ~280 m',
    availability: 'Open 06:00 – 22:00',
    availabilityVariant: 'amber',
    floor: 'Level 3',
  },
  {
    id: 'medical',
    emoji: '🏥',
    name: 'Medical Centre',
    description: 'Emergency medical assistance and first aid.',
    category: 'health',
    iconColor: 'red',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 2, Near Security',
    walkingDistance: '5 min walk · ~300 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 2',
  },
  {
    id: 'transport',
    emoji: '🚖',
    name: 'Transportation',
    description: 'Taxi, Metro, Bus and Ground Transportation.',
    category: 'transport',
    iconColor: 'purple',
    terminal: 'All Terminals',
    nearestLocation: 'Level 1, Ground Transport',
    walkingDistance: '7 min walk · ~420 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 1',
  },
]

const CHIPS = [
  { id: 'all',           label: 'All',           icon: 'apps' },
  { id: 'facilities',    label: 'Facilities',     icon: 'door_open' },
  { id: 'accessibility', label: 'Accessibility',  icon: 'accessible' },
  { id: 'transport',     label: 'Transport',      icon: 'directions_bus' },
  { id: 'connectivity',  label: 'Connectivity',   icon: 'wifi' },
  { id: 'family',        label: 'Family',         icon: 'family_restroom' },
  { id: 'services',      label: 'Services',       icon: 'local_atm' },
  { id: 'health',        label: 'Health',         icon: 'local_hospital' },
]

const SORT_OPTIONS = [
  { value: 'az',       label: 'A – Z' },
  { value: 'nearest',  label: 'Nearest' },
  { value: 'category', label: 'Category' },
]

/* ── Detail sheet component ── */
function AmenityDetailSheet({
  amenity,
  onClose,
  onNavigate,
}: {
  amenity: Amenity
  onClose: () => void
  onNavigate: () => void
}) {
  return (
    <div
      className="als-amenity-detail"
      role="dialog"
      aria-modal="true"
      aria-label={`${amenity.name} details`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="als-amenity-detail-sheet">
        <div className="als-amenity-detail-handle-wrap">
          <div className="als-amenity-detail-handle" />
        </div>

        <div className="als-amenity-detail-header">
          <div className={`als-amenity-detail-icon als-amenity-icon-wrap--${amenity.iconColor}`}>
            <span className="als-amenity-icon-text">{amenity.emoji}</span>
          </div>
          <div className="als-amenity-detail-title-wrap">
            <h2 className="als-amenity-detail-title">{amenity.name}</h2>
            <p className="als-amenity-detail-category">{amenity.category.charAt(0).toUpperCase() + amenity.category.slice(1)}</p>
          </div>
          <button
            type="button"
            className="als-amenity-detail-close"
            aria-label="Close details"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="als-amenity-detail-body">
          <p className="als-amenity-detail-desc">{amenity.description}</p>

          <div className="als-amenity-detail-rows">
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Terminal</span>
              <span className="als-amenity-detail-row-value">{amenity.terminal}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Floor</span>
              <span className="als-amenity-detail-row-value">{amenity.floor}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Nearest Location</span>
              <span className="als-amenity-detail-row-value">{amenity.nearestLocation}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Walking Distance</span>
              <span className="als-amenity-detail-row-value">{amenity.walkingDistance}</span>
            </div>
            <div className="als-amenity-detail-row" style={{ gridColumn: '1 / -1' }}>
              <span className="als-amenity-detail-row-label">Availability</span>
              <span className={`als-amenity-detail-row-value als-amenity-detail-row-value--${amenity.availabilityVariant}`}>
                {amenity.availability}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="als-amenity-detail-directions"
            onClick={onNavigate}
            aria-label={`Get directions to ${amenity.name}`}
          >
            <span className="material-symbols-outlined">near_me</span>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main component ── */
export function AirportAmenities() {
  const [query, setQuery]           = useState('')
  const [activeChip, setActiveChip] = useState('all')
  const [sortValue, setSortValue]   = useState('az')
  const [selected, setSelected]     = useState<Amenity | null>(null)

  const filtered = useMemo(() => {
    let list = AMENITIES

    if (activeChip !== 'all') {
      list = list.filter(a => a.category === activeChip)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      )
    }

    if (sortValue === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortValue === 'category') {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
    }
    // 'nearest' keeps original insertion order (already ordered by proximity)

    return list
  }, [activeChip, query, sortValue])

  const resultsLabel = `${filtered.length} ${filtered.length === 1 ? 'Result' : 'Results'} Found`

  return (
    <>
      <AirportListScreen
        title="Airport Amenities"
        subtitle="Find airport facilities and essential services"
        searchPlaceholder="Search amenities"
        chips={CHIPS}
        sortOptions={SORT_OPTIONS}
        activeChip={activeChip}
        onChipChange={setActiveChip}
        query={query}
        onQueryChange={setQuery}
        sortValue={sortValue}
        onSortChange={setSortValue}
        resultsLabel={resultsLabel}
        infoText="Tap any amenity to view additional details and receive turn-by-turn directions."
        activeNavId="findway"
      >
        {/* Section heading */}
        <div className="als-amenity-header">
          <h2 className="als-amenity-header-title">Airport Facilities</h2>
          <p className="als-amenity-header-sub">Choose a facility to receive turn-by-turn navigation.</p>
        </div>

        {filtered.length === 0 ? (
          <div className="als-empty">
            <span className="material-symbols-outlined">search_off</span>
            <p>No amenities match your search.</p>
          </div>
        ) : (
          <div className="als-amenity-grid">
            {filtered.map(amenity => (
              <button
                key={amenity.id}
                type="button"
                className="als-amenity-card"
                aria-label={`${amenity.name} — ${amenity.nearestLocation}`}
                onClick={() => setSelected(amenity)}
              >
                <div className="als-amenity-card-top">
                  <div className={`als-amenity-icon-wrap als-amenity-icon-wrap--${amenity.iconColor}`}>
                    <span className="als-amenity-icon-text">{amenity.emoji}</span>
                  </div>
                  <button
                    type="button"
                    className="als-amenity-arrow-btn"
                    aria-label={`Navigate to ${amenity.name}`}
                    tabIndex={-1}
                    onClick={e => { e.stopPropagation() }}
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>

                <div className="als-amenity-card-body">
                  <h3 className="als-amenity-name">{amenity.name}</h3>
                  <p className="als-amenity-desc">{amenity.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </AirportListScreen>

      {selected && (
        <AmenityDetailSheet
          amenity={selected}
          onClose={() => setSelected(null)}
          onNavigate={() => setSelected(null)}
        />
      )}
    </>
  )
}
