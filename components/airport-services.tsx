'use client'

import { useState, useMemo } from 'react'
import { AirportListScreen } from './airport-list-screen'

/* ── Types ── */
interface Service {
  id: string
  icon: string          // Material Symbol icon name
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
const SERVICES: Service[] = [
  {
    id: 'baggage-services',
    icon: 'luggage',
    name: 'Baggage Services',
    description: 'Lost baggage, baggage wrapping and oversized luggage assistance.',
    category: 'baggage',
    iconColor: 'blue',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 1, Baggage Claim Hall',
    walkingDistance: '7 min walk · ~420 m',
    availability: 'Open 05:00 – 00:00',
    availabilityVariant: 'green',
    floor: 'Level 1',
  },
  {
    id: 'wheelchair',
    icon: 'accessible',
    name: 'Wheelchair Assistance',
    description: 'Request mobility assistance and accessible support.',
    category: 'accessibility',
    iconColor: 'blue',
    terminal: 'All Terminals',
    nearestLocation: 'Information Desk, Level 3',
    walkingDistance: '3 min walk · ~180 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'currency-exchange',
    icon: 'currency_exchange',
    name: 'Currency Exchange',
    description: 'Exchange foreign currency and traveler\'s cheques.',
    category: 'financial',
    iconColor: 'teal',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 3, Departure Hall',
    walkingDistance: '5 min walk · ~280 m',
    availability: 'Open 06:00 – 22:00',
    availabilityVariant: 'amber',
    floor: 'Level 3',
  },
  {
    id: 'atm-banking',
    icon: 'local_atm',
    name: 'ATM & Banking',
    description: 'Locate ATMs and banking facilities.',
    category: 'financial',
    iconColor: 'green',
    terminal: 'Terminal 3',
    nearestLocation: 'Pre-Security, Level 3',
    walkingDistance: '4 min walk · ~200 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'medical-centre',
    icon: 'local_hospital',
    name: 'Medical Centre',
    description: 'Emergency medical care and first aid services.',
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
    id: 'pharmacy',
    icon: 'medication',
    name: 'Pharmacy',
    description: 'Purchase medicines and healthcare essentials.',
    category: 'health',
    iconColor: 'rose',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 3, Departure Zone B',
    walkingDistance: '6 min walk · ~360 m',
    availability: 'Open 06:00 – 22:00',
    availabilityVariant: 'amber',
    floor: 'Level 3',
  },
  {
    id: 'lost-found',
    icon: 'manage_search',
    name: 'Lost & Found',
    description: 'Report or collect misplaced baggage and personal belongings.',
    category: 'baggage',
    iconColor: 'amber',
    terminal: 'Terminal 3',
    nearestLocation: 'Level 1, Arrivals Hall',
    walkingDistance: '8 min walk · ~480 m',
    availability: 'Open 06:00 – 22:00',
    availabilityVariant: 'amber',
    floor: 'Level 1',
  },
  {
    id: 'airport-police',
    icon: 'local_police',
    name: 'Airport Police',
    description: 'Security assistance and emergency support.',
    category: 'emergency',
    iconColor: 'indigo',
    terminal: 'All Terminals',
    nearestLocation: 'Security Zone, Level 3',
    walkingDistance: '4 min walk · ~220 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'information-desk',
    icon: 'info',
    name: 'Information Desk',
    description: 'Airport information and passenger assistance.',
    category: 'passenger',
    iconColor: 'sky',
    terminal: 'All Terminals',
    nearestLocation: 'Central Hall, Level 3',
    walkingDistance: '2 min walk · ~120 m',
    availability: 'Open 05:00 – 23:30',
    availabilityVariant: 'green',
    floor: 'Level 3',
  },
  {
    id: 'taxi-booking',
    icon: 'local_taxi',
    name: 'Taxi Booking',
    description: 'Prepaid taxis and ride booking counters.',
    category: 'travel',
    iconColor: 'orange',
    terminal: 'All Terminals',
    nearestLocation: 'Level 1, Ground Transport',
    walkingDistance: '7 min walk · ~430 m',
    availability: 'Available 24/7',
    availabilityVariant: 'green',
    floor: 'Level 1',
  },
  {
    id: 'car-rental',
    icon: 'directions_car',
    name: 'Car Rental',
    description: 'Self-drive and chauffeur-driven rental vehicles.',
    category: 'travel',
    iconColor: 'purple',
    terminal: 'All Terminals',
    nearestLocation: 'Level 1, Car Rental Zone',
    walkingDistance: '9 min walk · ~550 m',
    availability: 'Open 06:00 – 00:00',
    availabilityVariant: 'amber',
    floor: 'Level 1',
  },
  {
    id: 'immigration-help',
    icon: 'badge',
    name: 'Immigration Help',
    description: 'Immigration guidance for international passengers.',
    category: 'passenger',
    iconColor: 'cyan',
    terminal: 'Terminal 3',
    nearestLocation: 'Immigration Hall, Level 2',
    walkingDistance: '6 min walk · ~380 m',
    availability: 'Open 00:00 – 24:00',
    availabilityVariant: 'green',
    floor: 'Level 2',
  },
]

const CHIPS = [
  { id: 'all',           label: 'All',           icon: 'apps' },
  { id: 'passenger',     label: 'Passenger',      icon: 'person' },
  { id: 'baggage',       label: 'Baggage',        icon: 'luggage' },
  { id: 'financial',     label: 'Financial',      icon: 'payments' },
  { id: 'health',        label: 'Health',         icon: 'local_hospital' },
  { id: 'travel',        label: 'Travel',         icon: 'flight_takeoff' },
  { id: 'accessibility', label: 'Accessibility',  icon: 'accessible' },
  { id: 'emergency',     label: 'Emergency',      icon: 'emergency' },
]

const SORT_OPTIONS = [
  { value: 'az',       label: 'A – Z' },
  { value: 'nearest',  label: 'Nearest' },
  { value: 'category', label: 'Category' },
]

/* ── Detail sheet ── */
function ServiceDetailSheet({
  service,
  onClose,
}: {
  service: Service
  onClose: () => void
}) {
  return (
    <div
      className="als-amenity-detail"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.name} details`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="als-amenity-detail-sheet">
        <div className="als-amenity-detail-handle-wrap">
          <div className="als-amenity-detail-handle" />
        </div>

        <div className="als-amenity-detail-header">
          <div className={`als-amenity-detail-icon als-amenity-icon-wrap--${service.iconColor}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{service.icon}</span>
          </div>
          <div className="als-amenity-detail-title-wrap">
            <h2 className="als-amenity-detail-title">{service.name}</h2>
            <p className="als-amenity-detail-category">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </p>
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
          <p className="als-amenity-detail-desc">{service.description}</p>

          <div className="als-amenity-detail-rows">
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Terminal</span>
              <span className="als-amenity-detail-row-value">{service.terminal}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Floor</span>
              <span className="als-amenity-detail-row-value">{service.floor}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Nearest Location</span>
              <span className="als-amenity-detail-row-value">{service.nearestLocation}</span>
            </div>
            <div className="als-amenity-detail-row">
              <span className="als-amenity-detail-row-label">Walking Distance</span>
              <span className="als-amenity-detail-row-value">{service.walkingDistance}</span>
            </div>
            <div className="als-amenity-detail-row" style={{ gridColumn: '1 / -1' }}>
              <span className="als-amenity-detail-row-label">Operating Hours</span>
              <span className={`als-amenity-detail-row-value als-amenity-detail-row-value--${service.availabilityVariant}`}>
                {service.availability}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="als-amenity-detail-directions"
            onClick={() => {}}
            aria-label={`Get directions to ${service.name}`}
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
export function AirportServices() {
  const [query, setQuery]           = useState('')
  const [activeChip, setActiveChip] = useState('all')
  const [sortValue, setSortValue]   = useState('az')
  const [selected, setSelected]     = useState<Service | null>(null)

  const filtered = useMemo(() => {
    let list = SERVICES

    if (activeChip !== 'all') {
      list = list.filter(s => s.category === activeChip)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      )
    }

    if (sortValue === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortValue === 'category') {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
    }

    return list
  }, [activeChip, query, sortValue])

  const resultsLabel = `${filtered.length} ${filtered.length === 1 ? 'Result' : 'Results'} Found`

  return (
    <>
      <AirportListScreen
        title="Airport Services"
        subtitle="Locate essential passenger services"
        searchPlaceholder="Search airport services"
        chips={CHIPS}
        sortOptions={SORT_OPTIONS}
        activeChip={activeChip}
        onChipChange={setActiveChip}
        query={query}
        onQueryChange={setQuery}
        sortValue={sortValue}
        onSortChange={setSortValue}
        resultsLabel={resultsLabel}
        infoText="Tap any airport service to view details, operating hours and receive step-by-step directions."
        activeNavId="findway"
      >
        <div className="als-amenity-header">
          <h2 className="als-amenity-header-title">Passenger Services</h2>
          <p className="als-amenity-header-sub">Select a service to view its location and receive directions.</p>
        </div>

        {filtered.length === 0 ? (
          <div className="als-empty">
            <span className="material-symbols-outlined">search_off</span>
            <p>No services match your search.</p>
          </div>
        ) : (
          <div className="als-amenity-grid">
            {filtered.map(service => (
              <button
                key={service.id}
                type="button"
                className="als-amenity-card"
                aria-label={`${service.name} — ${service.nearestLocation}`}
                onClick={() => setSelected(service)}
              >
                <div className="als-amenity-card-top">
                  <div className={`als-amenity-icon-wrap als-amenity-icon-wrap--${service.iconColor}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{service.icon}</span>
                  </div>
                  <button
                    type="button"
                    className="als-amenity-arrow-btn"
                    aria-label={`View ${service.name} details`}
                    tabIndex={-1}
                    onClick={e => { e.stopPropagation(); setSelected(service) }}
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>

                <div className="als-amenity-card-body">
                  <h3 className="als-amenity-name">{service.name}</h3>
                  <p className="als-amenity-desc">{service.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </AirportListScreen>

      {selected && (
        <ServiceDetailSheet
          service={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
