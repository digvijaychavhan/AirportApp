import { Suspense } from 'react'
import { EatDine } from '@/components/eat-dine'

export const metadata = {
  title: 'Eat & Dine — Airport Kiosk',
  description: 'Discover restaurants, cafés and fast food in the terminal.',
}

export default function EatDinePage() {
  return (
    <Suspense>
      <EatDine />
    </Suspense>
  )
}
