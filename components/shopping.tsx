'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { AirportListScreen, ChipItem, SortOption } from './airport-list-screen'
import { AirportItemCard } from './airport-item-card'

type CategoryId = 'all' | 'dutyfree' | 'electronics' | 'fashion' | 'luxury' | 'travel' | 'books' | 'jewellery' | 'beauty' | 'accessories' | 'convenience'
type SortKey = 'popularity' | 'distance' | 'name'

interface Store {
  id: string
  name: string
  category: CategoryId
  categoryLabel: string
  description: string
  isOpen: boolean
  hours: string
  terminal: string
  gate: string
  distanceM: number
  image: string
}

const STORES: Store[] = [
  {
    id: 's1',
    name: 'Duty Free',
    category: 'dutyfree',
    categoryLabel: 'Duty Free',
    description: 'Luxury perfumes, cosmetics, chocolates, liquor and travel exclusives.',
    isOpen: true,
    hours: '24 Hours',
    terminal: 'Terminal 3',
    gate: 'Near Gate 18',
    distanceM: 110,
    image: '/shopping/duty-free.png',
  },
  {
    id: 's2',
    name: 'Imagine Store',
    category: 'electronics',
    categoryLabel: 'Electronics',
    description: 'Apple products, accessories and premium electronics.',
    isOpen: true,
    hours: '06:00 AM – 11:00 PM',
    terminal: '',
    gate: 'Near Gate 22',
    distanceM: 150,
    image: '/shopping/imagine-store.png',
  },
  {
    id: 's3',
    name: 'Hidesign',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: 'Leather bags, wallets, backpacks and travel accessories.',
    isOpen: true,
    hours: '08:00 AM – 10:00 PM',
    terminal: 'Terminal 3',
    gate: 'Near Gate 30',
    distanceM: 190,
    image: '/shopping/hidesign.png',
  },
  {
    id: 's4',
    name: 'Relay Books',
    category: 'books',
    categoryLabel: 'Books & Gifts',
    description: 'Books, magazines, snacks and travel accessories.',
    isOpen: true,
    hours: '05:00 AM – 11:00 PM',
    terminal: '',
    gate: 'Near Gate 11',
    distanceM: 220,
    image: '/shopping/relay-books.png',
  },
  {
    id: 's5',
    name: 'Travel Essentials',
    category: 'convenience',
    categoryLabel: 'Convenience',
    description: 'Everything you need for your journey.',
    isOpen: true,
    hours: '24 Hours',
    terminal: '',
    gate: 'Near Security Exit',
    distanceM: 250,
    image: '/shopping/travel-essentials.png',
  },
]

const CATEGORIES: ChipItem[] = [
  { id: 'all',         label: 'All',          icon: 'grid_view' },
  { id: 'dutyfree',    label: 'Duty Free',    icon: 'local_airport' },
  { id: 'electronics', label: 'Electronics',  icon: 'devices' },
  { id: 'fashion',     label: 'Fashion',      icon: 'checkroom' },
  { id: 'luxury',      label: 'Luxury',       icon: 'diamond' },
  { id: 'books',       label: 'Books',        icon: 'menu_book' },
  { id: 'beauty',      label: 'Beauty',       icon: 'spa' },
  { id: 'convenience', label: 'Convenience',  icon: 'storefront' },
]

const SORT_OPTIONS: SortOption[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'distance',   label: 'Nearest' },
  { value: 'name',       label: 'Alphabetical' },
]

export function Shopping() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('popularity')

  const filtered = useMemo(() => {
    let list = STORES
    if (activeCategory !== 'all') list = list.filter(s => s.category === activeCategory)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q),
      )
    }
    return [...list].sort((a, b) => {
      if (sortKey === 'distance') return a.distanceM - b.distanceM
      if (sortKey === 'name')     return a.name.localeCompare(b.name)
      return 0
    })
  }, [activeCategory, query, sortKey])

  return (
    <AirportListScreen
      title="Shopping"
      subtitle="Discover retail stores across the airport"
      searchPlaceholder="Search stores or brands"
      chips={CATEGORIES}
      sortOptions={SORT_OPTIONS}
      activeChip={activeCategory}
      onChipChange={id => setActiveCategory(id as CategoryId)}
      query={query}
      onQueryChange={setQuery}
      sortValue={sortKey}
      onSortChange={v => setSortKey(v as SortKey)}
      resultsLabel={`${filtered.length} Stores Found`}
      infoText="Tap on any store to view operating hours, location and get step-by-step directions."
      activeNavId="findway"
    >
      {filtered.length === 0 && (
        <div className="als-empty" role="status">
          <span className="material-symbols-outlined">search_off</span>
          <p>No stores found. Try a different search or category.</p>
        </div>
      )}

      {filtered.map(s => (
        <AirportItemCard
          key={s.id}
          id={s.id}
          name={s.name}
          image={s.image}
          imageAlt={`${s.name} storefront`}
          badge={{ label: s.categoryLabel }}
          description={s.description}
          isOpen={s.isOpen}
          hours={s.hours}
          locationPrimary={[s.terminal, s.gate].filter(Boolean).join(' · ')}
          distanceM={s.distanceM}
          onClick={() => router.push(`/wayfinding/shopping/${s.id}`)}
        />
      ))}
    </AirportListScreen>
  )
}
