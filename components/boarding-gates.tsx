'use client'

import { useState, useMemo } from 'react'
import { AirportListScreen, ChipItem, SortOption } from './airport-list-screen'

type FilterId = 'all' | 'domestic' | 'international' | 't1' | 't2' | 't3' | 'departure' | 'arrival'

interface Gate {
  id: string
  label: string
  terminal: string
  level: string
  walkingMin: number
  distanceM: number
  status: 'boarding' | 'open' | 'closed' | 'soon'
  filter: FilterId[]
}

/* ── Level 4 — Departure Gates 20–37 ── */
const DEPARTURE_GATES: Gate[] = Array.from({ length: 18 }, (_, i) => {
  const num = i + 20
  return {
    id: `g${num}`,
    label: `${num}`,
    terminal: 'Terminal 3',
    level: 'Departure Level 4',
    walkingMin: Math.ceil((num - 19) * 0.6 + 3),
    distanceM: (num - 19) * 40 + 200,
    status: num === 24 ? 'boarding' : num % 5 === 0 ? 'soon' : 'open',
    filter: ['t3', 'international', 'departure'],
  }
})

/* ── Level 1 — Bus Boarding Gates B1–B6 ── */
const BUS_GATES: Gate[] = Array.from({ length: 6 }, (_, i) => ({
  id: `gB${i + 1}`,
  label: `B${i + 1}`,
  terminal: 'Terminal 3',
  level: 'Level 1 (Bus Boarding)',
  walkingMin: i + 5,
  distanceM: (i + 1) * 60 + 300,
  status: i === 0 ? 'boarding' : 'open' as Gate['status'],
  filter: ['t3', 'domestic', 'departure'],
}))

const ALL_GATES = [...DEPARTURE_GATES, ...BUS_GATES]

const STATUS_LABELS: Record<Gate['status'], string> = {
  boarding: 'Boarding Now',
  open:     'Gate Open',
  closed:   'Gate Closed',
  soon:     'Boarding Soon',
}

const FILTERS: ChipItem[] = [
  { id: 'all',           label: 'All',           icon: 'grid_view' },
  { id: 'domestic',      label: 'Domestic',      icon: 'flight_land' },
  { id: 'international', label: 'International', icon: 'flight_takeoff' },
  { id: 't1',            label: 'Terminal 1',    icon: 'business' },
  { id: 't2',            label: 'Terminal 2',    icon: 'business' },
  { id: 't3',            label: 'Terminal 3',    icon: 'business' },
  { id: 'departure',     label: 'Departure',     icon: 'upload' },
  { id: 'arrival',       label: 'Arrival',       icon: 'download' },
]

const SORT_OPTIONS: SortOption[] = [
  { value: 'number',     label: 'Gate Number' },
  { value: 'distance',   label: 'Nearest' },
  { value: 'walking',    label: 'Walking Time' },
]

export function BoardingGates() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState('number')
  const [selectedGate, setSelectedGate] = useState<Gate | null>(null)

  const filtered = useMemo(() => {
    let list = ALL_GATES
    if (activeFilter !== 'all') list = list.filter(g => g.filter.includes(activeFilter))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(g =>
        g.label.toLowerCase().includes(q) ||
        g.terminal.toLowerCase().includes(q) ||
        g.level.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'distance') return a.distanceM - b.distanceM
      if (sortKey === 'walking')  return a.walkingMin - b.walkingMin
      // default: gate number — numeric for numeric, alpha for B-gates
      const aNum = parseInt(a.label, 10)
      const bNum = parseInt(b.label, 10)
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum
      return a.label.localeCompare(b.label)
    })
  }, [activeFilter, query, sortKey])

  /* Separate into sections for display */
  const departureGates = filtered.filter(g => !g.label.startsWith('B'))
  const busGates       = filtered.filter(g => g.label.startsWith('B'))

  const statusClass = (s: Gate['status']) => {
    if (s === 'boarding') return 'als-gate-status--boarding'
    if (s === 'open')     return 'als-gate-status--open'
    return ''
  }

  return (
    <AirportListScreen
      title="Boarding Gates"
      subtitle="Select your departure gate for navigation"
      searchPlaceholder="Search gate number"
      chips={FILTERS}
      sortOptions={SORT_OPTIONS}
      activeChip={activeFilter}
      onChipChange={id => setActiveFilter(id as FilterId)}
      query={query}
      onQueryChange={setQuery}
      sortValue={sortKey}
      onSortChange={setSortKey}
      resultsLabel={`${filtered.length} Gates Found`}
      infoText="Choose a boarding gate to receive the fastest walking route through the airport."
      activeNavId="findway"
    >
      {/* Selected gate summary */}
      {selectedGate && (
        <div className="als-gate-summary">
          <div className="als-gate-summary-header">
            <span className="als-gate-summary-number">Gate {selectedGate.label}</span>
            <span className={`als-gate-status ${statusClass(selectedGate.status)}`}>
              {STATUS_LABELS[selectedGate.status]}
            </span>
          </div>
          <div className="als-gate-summary-rows">
            <div className="als-gate-info-row">
              <span className="als-gate-info-label">Terminal</span>
              <span className="als-gate-info-value">{selectedGate.terminal}</span>
            </div>
            <div className="als-gate-info-row">
              <span className="als-gate-info-label">Level</span>
              <span className="als-gate-info-value">{selectedGate.level}</span>
            </div>
            <div className="als-gate-info-row">
              <span className="als-gate-info-label">Walking Time</span>
              <span className="als-gate-info-value">{selectedGate.walkingMin} minutes</span>
            </div>
            <div className="als-gate-info-row">
              <span className="als-gate-info-label">Distance</span>
              <span className="als-gate-info-value">{selectedGate.distanceM} metres</span>
            </div>
          </div>
          <button
            type="button"
            className="als-gate-directions-btn"
            onClick={() => {}}
          >
            <span className="material-symbols-outlined">near_me</span>
            Get Directions
          </button>
        </div>
      )}

      {/* Section 1: Level 4 Departure Gates */}
      {departureGates.length > 0 && (
        <>
          <div className="als-section-heading">
            <h2 className="als-section-title">Level 4 — Departure Gates</h2>
            <p className="als-section-sub">Tap a gate to see walking time and directions</p>
          </div>
          <div className="als-gate-grid">
            {departureGates.map(gate => (
              <button
                key={gate.id}
                type="button"
                className={`als-gate-btn${selectedGate?.id === gate.id ? ' als-gate-btn--selected' : ''}`}
                aria-pressed={selectedGate?.id === gate.id}
                aria-label={`Gate ${gate.label}`}
                onClick={() => setSelectedGate(prev => prev?.id === gate.id ? null : gate)}
              >
                {gate.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Section 2: Level 1 Bus Boarding Gates */}
      {busGates.length > 0 && (
        <>
          <div className="als-section-heading" style={{ marginTop: '12px' }}>
            <h2 className="als-section-title">Level 1 — Bus Boarding Gates</h2>
            <p className="als-section-sub">Bus transfer to remote stands</p>
          </div>
          <div className="als-gate-grid">
            {busGates.map(gate => (
              <button
                key={gate.id}
                type="button"
                className={`als-gate-btn${selectedGate?.id === gate.id ? ' als-gate-btn--selected' : ''}`}
                aria-pressed={selectedGate?.id === gate.id}
                aria-label={`Gate ${gate.label}`}
                onClick={() => setSelectedGate(prev => prev?.id === gate.id ? null : gate)}
              >
                {gate.label}
              </button>
            ))}
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="als-empty" role="status">
          <span className="material-symbols-outlined">search_off</span>
          <p>No gates found. Try a different search or filter.</p>
        </div>
      )}
    </AirportListScreen>
  )
}
