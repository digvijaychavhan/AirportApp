'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

type NavItem = { id: string; icon: string; label: string; route?: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'flights',    icon: 'flight',       label: 'Flight Info', route: '/flights'    },
  { id: 'wayfinding', icon: 'map',          label: 'Find Way',    route: '/wayfinding' },
  { id: 'support',    icon: 'headset_mic',  label: 'Talk to Us',  route: '/support'    },
  { id: 'feedback',   icon: 'rate_review',  label: 'Feedback',    route: '/feedback'   },
  { id: 'search',     icon: 'search',       label: 'Search'                            },
]

type Category = {
  id: string
  title: string
  description: string
  photo: string
  icon: string
  iconColor: string
  iconBg: string
  route: string
}

const CATEGORIES: Category[] = [
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Explore shops and\nretail stores',
    photo: '/findway-shopping.png',
    icon: 'shopping_bag',
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    route: '/wayfinding/shopping',
  },
  {
    id: 'dining',
    title: 'Eat & Dine',
    description: 'Restaurants, cafes\nand fast food',
    photo: '/findway-dining.png',
    icon: 'restaurant',
    iconColor: '#D97706',
    iconBg: '#FEF3C7',
    route: '/eat-dine',
  },
  {
    id: 'services',
    title: 'Services',
    description: 'Assistance, counters\nand other services',
    photo: '/findway-services.png',
    icon: 'support_agent',
    iconColor: '#7C3AED',
    iconBg: '#EDE9FE',
    route: '/wayfinding/services',
  },
  {
    id: 'gates',
    title: 'Boarding Gates',
    description: 'Find your boarding gates\nand directions',
    photo: '/findway-gates.png',
    icon: 'flight_takeoff',
    iconColor: '#059669',
    iconBg: '#D1FAE5',
    route: '/wayfinding/gates',
  },
  {
    id: 'lounges',
    title: 'Lounges',
    description: 'Airport lounges and\nrelaxation areas',
    photo: '/findway-lounge.png',
    icon: 'weekend',
    iconColor: '#DB2777',
    iconBg: '#FCE7F3',
    route: '/wayfinding/lounges',
  },
  {
    id: 'amenities',
    title: 'Airport Amenities',
    description: 'Facilities like restrooms,\nprayer rooms and more',
    photo: '/findway-amenities.png',
    icon: 'wc',
    iconColor: '#0891B2',
    iconBg: '#CFFAFE',
    route: '/wayfinding/amenities',
  },
]

export function FindWay() {
  const router = useRouter()

  return (
    <div className="fw-screen">

      {/* ── Top App Bar ── */}
      <header className="fw-bar">
        <button
          type="button"
          className="fw-bar-back"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          Back
        </button>

        <div className="fw-bar-center">
          <h1 className="fw-bar-title">Find Way</h1>
          <p className="fw-bar-subtitle">Where would you like to go?</p>
        </div>

        <button type="button" className="fw-bar-lang" aria-label="Change language">
          <span className="material-symbols-outlined" aria-hidden="true">language</span>
          EN
          <span className="material-symbols-outlined" aria-hidden="true">expand_more</span>
        </button>
      </header>

      {/* ── Card grid ── */}
      <main className="fw-body">
        <div className="fw-grid" role="list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="listitem"
              className="fw-card"
              aria-label={`${cat.title}: ${cat.description}`}
              onClick={() => router.push(cat.route)}
            >
              {/* Photo */}
              <div className="fw-card-photo">
                <Image
                  src={cat.photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, 280px"
                  style={{ objectFit: 'cover' }}
                  priority={cat.id === 'shopping' || cat.id === 'dining'}
                />
              </div>

              {/* Info strip */}
              <div className="fw-card-info">
                <span
                  className="fw-card-icon"
                  aria-hidden="true"
                  style={{ background: cat.iconBg, color: cat.iconColor }}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </span>

                <div className="fw-card-text">
                  <span className="fw-card-title">{cat.title}</span>
                  <span className="fw-card-desc">{cat.description}</span>
                </div>

                <span className="fw-card-chevron" aria-hidden="true">
                  <span className="material-symbols-outlined">chevron_right</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* ── Bottom navigation ── */}
      <nav className="fi-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fi-nav-item${item.id === 'wayfinding' ? ' fi-nav-item--active' : ''}`}
            aria-label={item.label}
            aria-current={item.id === 'wayfinding' ? 'page' : undefined}
            onClick={() => { if (item.route) router.push(item.route) }}
          >
            <span
              className={`material-symbols-outlined fi-nav-icon`}
              aria-hidden="true"
              style={item.id === 'wayfinding' ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
            <span className="fi-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
