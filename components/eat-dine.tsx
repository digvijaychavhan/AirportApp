'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AirportListScreen, ChipItem, SortOption } from './airport-list-screen'
import { AirportItemCard } from './airport-item-card'

type CategoryId = 'all' | 'cafe' | 'fastfood' | 'indian' | 'asian' | 'bar'
type SortKey = 'popularity' | 'distance' | 'name'

interface Restaurant {
  id: string
  name: string
  category: CategoryId
  categoryLabel: string
  description: string
  isOpen: boolean
  hours: string
  terminal: string
  floor: string
  gate: string
  distanceM: number
  image: string
}

const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Third Wave Coffee',
    category: 'cafe',
    categoryLabel: 'Cafe',
    description: 'Specialty coffee, pastries, sandwiches & more',
    isOpen: true,
    hours: '6:00 AM – 11:00 PM',
    terminal: 'T3 Departure',
    floor: 'Level 2',
    gate: 'Near Gate 24',
    distanceM: 120,
    image: '/restaurants/third-wave-coffee.png',
  },
  {
    id: 'r2',
    name: "McDonald's",
    category: 'fastfood',
    categoryLabel: 'Fast Food',
    description: 'Burgers, fries, beverages and more',
    isOpen: true,
    hours: '24 Hours',
    terminal: 'T3 Departure',
    floor: 'Food Court',
    gate: '',
    distanceM: 150,
    image: '/restaurants/mcdonalds.png',
  },
  {
    id: 'r3',
    name: 'Bikanervala',
    category: 'indian',
    categoryLabel: 'Indian',
    description: 'North Indian snacks, meals & sweets',
    isOpen: true,
    hours: '6:00 AM – 11:00 PM',
    terminal: 'T3 Departure',
    floor: '',
    gate: 'Near Gate 19',
    distanceM: 180,
    image: '/restaurants/bikanervala.png',
  },
  {
    id: 'r4',
    name: 'Subway',
    category: 'fastfood',
    categoryLabel: 'Fast Food',
    description: 'Sandwiches, salads & wraps',
    isOpen: true,
    hours: '6:00 AM – 12:00 AM',
    terminal: 'T3 Departure',
    floor: 'Food Court',
    gate: '',
    distanceM: 210,
    image: '/restaurants/subway.png',
  },
  {
    id: 'r5',
    name: 'Sichuan House',
    category: 'asian',
    categoryLabel: 'Asian',
    description: 'Chinese cuisine, noodles & rice',
    isOpen: true,
    hours: '11:00 AM – 11:00 PM',
    terminal: 'T3 Departure',
    floor: '',
    gate: 'Near Gate 32',
    distanceM: 260,
    image: '/restaurants/sichuan-house.png',
  },
]

const CATEGORIES: ChipItem[] = [
  { id: 'all',      label: 'All',       icon: 'grid_view' },
  { id: 'cafe',     label: 'Cafe',      icon: 'local_cafe' },
  { id: 'fastfood', label: 'Fast Food', icon: 'lunch_dining' },
  { id: 'indian',   label: 'Indian',    icon: 'restaurant' },
  { id: 'asian',    label: 'Asian',     icon: 'ramen_dining' },
  { id: 'bar',      label: 'Bar',       icon: 'local_bar' },
]

const SORT_OPTIONS: SortOption[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'distance',   label: 'Distance' },
  { value: 'name',       label: 'Name (A–Z)' },
]

export function EatDine() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('popularity')

  const filtered = useMemo(() => {
    let list = RESTAURANTS
    if (activeCategory !== 'all') list = list.filter(r => r.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'distance') return a.distanceM - b.distanceM
      if (sortKey === 'name')     return a.name.localeCompare(b.name)
      return 0
    })
  }, [activeCategory, query, sortKey])

  const locationPrimary = (r: Restaurant) =>
    [r.terminal, r.floor].filter(Boolean).join(' · ')

  return (
    <AirportListScreen
      title="Eat & Dine"
      subtitle="Discover restaurants, cafés and fast food"
      searchPlaceholder="Search for restaurants, cuisines or keywords"
      chips={CATEGORIES}
      sortOptions={SORT_OPTIONS}
      activeChip={activeCategory}
      onChipChange={id => setActiveCategory(id as CategoryId)}
      query={query}
      onQueryChange={setQuery}
      sortValue={sortKey}
      onSortChange={v => setSortKey(v as SortKey)}
      resultsLabel={`${filtered.length} Results Found`}
      infoText="Tap on a restaurant to view details, operating hours and get directions."
      activeNavId="findway"
    >
      {filtered.length === 0 && (
        <div className="als-empty" role="status">
          <span className="material-symbols-outlined">search_off</span>
          <p>No restaurants found. Try a different search or category.</p>
        </div>
      )}

      {filtered.map(r => (
        <AirportItemCard
          key={r.id}
          id={r.id}
          name={r.name}
          image={r.image}
          imageAlt={`${r.name} storefront`}
          badge={{ label: r.categoryLabel }}
          description={r.description}
          isOpen={r.isOpen}
          hours={r.hours}
          locationPrimary={locationPrimary(r)}
          locationSecondary={r.gate || undefined}
          distanceM={r.distanceM}
          onClick={() => router.push(`/eat-dine/${r.id}`)}
        />
      ))}
    </AirportListScreen>
  )
}
