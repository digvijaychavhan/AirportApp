'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AirportListScreen, ChipItem, SortOption } from './airport-list-screen'
import { AirportItemCard } from './airport-item-card'

type FilterId = 'all' | 't1' | 't2' | 't3' | 'domestic' | 'international' | '24hr' | 'premium' | 'business'
type SortKey = 'nearest' | 'popularity' | 'alpha'

interface Lounge {
  id: string
  name: string
  filter: FilterId[]
  badge: string
  badgeVariant: 'default' | 'green' | 'amber' | 'purple' | 'teal' | 'red'
  description: string
  access: string[]
  isOpen: boolean
  hours: string
  terminal: string
  gate: string
  distanceM: number
  image: string
}

const LOUNGES: Lounge[] = [
  {
    id: 'l1',
    name: 'Encalm Lounge',
    filter: ['t3', 'international', '24hr', 'premium'],
    badge: 'Premium',
    badgeVariant: 'purple',
    description: 'Premium lounge offering gourmet dining, Wi-Fi, shower facilities and business workstations.',
    access: ['Priority Pass', 'Credit Cards', 'Paid Entry'],
    isOpen: true,
    hours: '24 Hours',
    terminal: 'Terminal 3',
    gate: 'Near Gate 15',
    distanceM: 120,
    image: '/lounges/encalm-lounge.png',
  },
  {
    id: 'l2',
    name: 'Plaza Premium Lounge',
    filter: ['t3', 'international', '24hr', 'business'],
    badge: 'International',
    badgeVariant: 'teal',
    description: 'International lounge with buffet, shower rooms and dedicated business zone.',
    access: ['Priority Pass', 'DragonPass', 'Paid Entry'],
    isOpen: true,
    hours: '24 Hours',
    terminal: 'Terminal 3',
    gate: 'International Departures',
    distanceM: 180,
    image: '/lounges/plaza-premium.png',
  },
  {
    id: 'l3',
    name: 'Air India Maharaja Lounge',
    filter: ['t3', 'international', '24hr', 'business'],
    badge: 'Business Class',
    badgeVariant: 'amber',
    description: 'Exclusive lounge for Air India Business and First Class passengers.',
    access: ['Eligible Air India passengers only'],
    isOpen: true,
    hours: '24 Hours',
    terminal: 'Terminal 3',
    gate: 'Near Gate 22',
    distanceM: 210,
    image: '/lounges/maharaja-lounge.png',
  },
  {
    id: 'l4',
    name: 'Travel Club Lounge',
    filter: ['t2', 'domestic'],
    badge: 'Domestic',
    badgeVariant: 'green',
    description: 'Comfortable lounge with refreshments, Wi-Fi and charging stations.',
    access: ['Paid Entry', 'Selected Cards'],
    isOpen: true,
    hours: '05:00 AM – 11:00 PM',
    terminal: 'Terminal 2',
    gate: 'Near Security',
    distanceM: 260,
    image: '/lounges/travel-club.png',
  },
  {
    id: 'l5',
    name: 'Premium Lounge',
    filter: ['t1', 'premium', '24hr'],
    badge: 'VIP',
    badgeVariant: 'red',
    description: 'Quiet premium lounge offering complimentary meals and beverages.',
    access: ['Invitation', 'Membership'],
    isOpen: true,
    hours: '24 Hours',
    terminal: 'Terminal 1',
    gate: 'Near Gate 5',
    distanceM: 300,
    image: '/lounges/premium-lounge.png',
  },
]

const FILTERS: ChipItem[] = [
  { id: 'all',           label: 'All',           icon: 'grid_view' },
  { id: 't1',            label: 'Terminal 1',    icon: 'business' },
  { id: 't2',            label: 'Terminal 2',    icon: 'business' },
  { id: 't3',            label: 'Terminal 3',    icon: 'business' },
  { id: 'domestic',      label: 'Domestic',      icon: 'flight_land' },
  { id: 'international', label: 'International', icon: 'flight_takeoff' },
  { id: '24hr',          label: '24 Hours',      icon: 'schedule' },
  { id: 'premium',       label: 'Premium',       icon: 'stars' },
  { id: 'business',      label: 'Business',      icon: 'work' },
]

const SORT_OPTIONS: SortOption[] = [
  { value: 'nearest',    label: 'Nearest' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'alpha',      label: 'A – Z' },
]

export function Lounges() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('nearest')

  const filtered = useMemo(() => {
    let list = LOUNGES
    if (activeFilter !== 'all') list = list.filter(l => l.filter.includes(activeFilter))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.badge.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.terminal.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'nearest')    return a.distanceM - b.distanceM
      if (sortKey === 'alpha')      return a.name.localeCompare(b.name)
      return 0
    })
  }, [activeFilter, query, sortKey])

  return (
    <AirportListScreen
      title="Lounges"
      subtitle="Relax and refresh before your journey"
      searchPlaceholder="Search lounges"
      chips={FILTERS}
      sortOptions={SORT_OPTIONS}
      activeChip={activeFilter}
      onChipChange={id => setActiveFilter(id as FilterId)}
      query={query}
      onQueryChange={setQuery}
      sortValue={sortKey}
      onSortChange={v => setSortKey(v as SortKey)}
      resultsLabel={`${filtered.length} Lounges Available`}
      infoText="Select any lounge to view amenities, eligibility, operating hours and receive turn-by-turn directions."
      activeNavId="findway"
    >
      {filtered.length === 0 && (
        <div className="als-empty" role="status">
          <span className="material-symbols-outlined">search_off</span>
          <p>No lounges found. Try a different search or filter.</p>
        </div>
      )}

      {filtered.map(l => (
        <AirportItemCard
          key={l.id}
          id={l.id}
          name={l.name}
          image={l.image}
          imageAlt={`${l.name} interior`}
          badge={{ label: l.badge, variant: l.badgeVariant }}
          description={l.description}
          isOpen={l.isOpen}
          hours={l.hours}
          locationPrimary={l.terminal}
          locationSecondary={l.gate}
          distanceM={l.distanceM}
          extraContent={
            <div className="als-tags-row">
              {l.access.map((a, i) => (
                <span key={i} className="als-tag">{a}</span>
              ))}
            </div>
          }
          onClick={() => router.push(`/wayfinding/lounges/${l.id}`)}
        />
      ))}
    </AirportListScreen>
  )
}
